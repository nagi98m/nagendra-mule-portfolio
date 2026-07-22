import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const browserPath = process.env.BROWSER_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.E2E_BASE_URL || "http://127.0.0.1:3000";
const outputDir = "test-results";

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ executablePath: browserPath, headless: true });

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await desktop.newPage();
  const errors = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.stack || error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await assertVisible(page.getByRole("heading", { name: /Python backend meets production AI/i }));
  assert.equal(await page.locator('a[href="https://github.com/nagi98m"]').count() > 0, true, "Verified GitHub link is missing");
  const linkedinLinks = page.locator('a[href*="linkedin.com"]');
  if (await linkedinLinks.count()) assert.match(await linkedinLinks.first().getAttribute("href"), /^https:\/\/[^\s]+$/, "Configured LinkedIn URL is invalid");
  const resumeLinks = page.locator('a[download][href$="Nagendra-Mule-Python-GenAI-Engineer-Resume.pdf"]');
  if (await resumeLinks.count()) {
    await assertVisible(resumeLinks.first());
  } else {
    assert.equal(await page.getByText("Resume coming soon").count() > 0, true, "Missing-resume state is not visible");
  }
  await assertVisible(page.getByRole("heading", { name: "The profile in 20 seconds." }));
  await assertVisible(page.getByRole("link", { name: /Flagship project/i }));
  const directEmail = page.locator('a[href^="mailto:"]');
  assert.equal(await page.locator('.quick-actions a[href="#contact"]').count() > 0, (await directEmail.count()) > 0, "Quick contact action does not match public-email configuration");

  await page.getByRole("button", { name: "Open Ask My AI Resume" }).click();
  await assertVisible(page.getByRole("dialog", { name: "Ask My AI Resume" }));
  const chatResponse = page.waitForResponse((response) => response.url().endsWith("/api/chat") && response.request().method() === "POST");
  await page.getByRole("button", { name: "Explain his LangGraph experience." }).click();
  assert.equal((await chatResponse).status(), 200, "AI chat API did not return HTTP 200");
  try {
    await page.waitForFunction(() => document.querySelectorAll(".chat-message.assistant").length >= 2, undefined, { timeout: 15_000 });
  } catch (error) {
    console.error("Chat debug", { url: page.url(), errors, body: (await page.locator("body").innerText()).slice(-1800) });
    throw error;
  }
  const assistantText = await page.locator(".chat-message.assistant").last().innerText();
  assert.match(assistantText, /LangGraph/i, "AI answer did not contain the retrieved LangGraph fact");
  assert.equal(await page.locator(".source-list a").count() > 0, true, `AI answer rendered without citation links: ${assistantText}`);
  assert.equal(await page.locator('.source-list a[href="/projects/tag-ai-platform"]').count() > 0, true, "TAG citation is missing");
  await page.screenshot({ path: `${outputDir}/desktop-ai-chat.png` });

  await page.getByRole("button", { name: "Clear conversation" }).click();
  await assertVisible(page.getByRole("button", { name: "Summarize Nagendra in 30 seconds." }));
  const composer = page.getByLabel("Ask a question about Nagendra's experience");
  await composer.fill("Line one");
  await composer.press("Shift+Enter");
  await composer.type("Line two");
  assert.match(await composer.inputValue(), /Line one\nLine two/, "Shift+Enter did not create a newline");
  await composer.fill("What is Nagendra's favorite restaurant cuisine?");
  const unsupportedResponse = page.waitForResponse((response) => response.url().endsWith("/api/chat") && response.request().method() === "POST");
  await composer.press("Enter");
  assert.equal(await page.getByRole("button", { name: "Send question" }).isDisabled(), true, "Duplicate submission guard is not active while loading");
  assert.equal((await unsupportedResponse).status(), 200);
  await page.waitForFunction(() => document.querySelectorAll(".chat-message.assistant").length >= 2);
  assert.match(await page.locator(".chat-message.assistant").last().innerText(), /not available/i, "Unsupported question was not handled honestly");
  assert.equal(await page.locator(".chat-message.assistant").last().locator(".source-list").count(), 0, "Unsupported answer must not show unrelated sources");

  await page.getByRole("button", { name: "Clear conversation" }).click();
  await page.route("**/api/chat", (route) => route.abort(), { times: 1 });
  await composer.fill("Explain Nagendra's FastAPI experience.");
  await composer.press("Enter");
  await assertVisible(page.getByRole("button", { name: "Retry" }));
  errors.splice(0, errors.length);
  await page.getByRole("button", { name: "Close AI resume assistant" }).click();

  for (const [slug, heading] of [
    ["tag-ai-platform", "Test Automation Generator (TAG)"],
    ["ivacs", "IVACS"],
    ["ecommerce-cloud-platform", "E-Commerce Automation & Cloud Migration Platform"],
  ]) {
    const response = await page.goto(`${baseUrl}/projects/${slug}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200, `${slug} did not return HTTP 200`);
    await assertVisible(page.getByRole("heading", { name: heading, exact: true }));
  }

  assert.deepEqual(errors, [], `Browser console errors before the expected contact fallback: ${errors.join(" | ")}`);
  await page.goto(`${baseUrl}/#contact`, { waitUntil: "networkidle" });
  assert.equal(await page.locator(".contact-form").evaluate((form) => form.checkValidity()), false, "Empty contact form should be invalid");
  await page.getByLabel("Name", { exact: true }).fill("Local Recruiter Test");
  await page.getByLabel("Email", { exact: true }).fill("recruiter@example.com");
  await page.getByLabel("Message", { exact: true }).fill("This is a local end-to-end test of the portfolio contact workflow.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.locator("#form-status").filter({ hasText: "Email delivery is not configured" }).waitFor({ timeout: 10_000 });
  await page.screenshot({ path: `${outputDir}/desktop-contact.png` });

  const unexpectedErrors = errors.filter((message) => !message.includes("503 (Service Unavailable)"));
  assert.deepEqual(unexpectedErrors, [], `Unexpected browser console errors: ${unexpectedErrors.join(" | ")}`);
  await desktop.close();

  for (const width of [320, 375, 390, 768]) {
    const mobile = await browser.newContext({ viewport: { width, height: width === 768 ? 1024 : 812 }, hasTouch: true });
    const mobilePage = await mobile.newPage();
    const mobileErrors = [];
    mobilePage.on("pageerror", (error) => mobileErrors.push(error.message));
    await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
    const menuButton = mobilePage.getByRole("button", { name: "Open navigation" });
    const menuBox = await menuButton.boundingBox();
    assert.ok(menuBox && menuBox.width >= 44 && menuBox.height >= 44, `${width}px mobile menu touch target is too small`);
    await menuButton.click();
    await assertVisible(mobilePage.getByRole("navigation", { name: "Mobile navigation" }));
    await assertNoPageOverflow(mobilePage, width);

    if (width === 375) {
      await mobilePage.getByRole("button", { name: "Close navigation" }).click();
      await mobilePage.getByRole("button", { name: "Open Ask My AI Resume" }).click();
      const dialogBox = await mobilePage.getByRole("dialog", { name: "Ask My AI Resume" }).boundingBox();
      assert.ok(dialogBox && dialogBox.width <= width && dialogBox.height <= 812, "Mobile AI dialog exceeds the viewport");
      await mobilePage.getByRole("button", { name: "Close AI resume assistant" }).click();
      await mobilePage.goto(`${baseUrl}/projects/tag-ai-platform`, { waitUntil: "networkidle" });
      await assertNoPageOverflow(mobilePage, width);
      await mobilePage.goto(baseUrl, { waitUntil: "networkidle" });
      await mobilePage.getByRole("button", { name: "Open navigation" }).click();
      await mobilePage.screenshot({ path: `${outputDir}/mobile-home.png` });
    }
    assert.deepEqual(mobileErrors, [], `${width}px browser errors: ${mobileErrors.join(" | ")}`);
    await mobile.close();
  }

  console.log("E2E PASS: home, responsive navigation, recruiter view, chat, citations, case studies, contact fallback, verified/hidden profile links");
} finally {
  await browser.close();
}

async function assertVisible(locator) {
  await locator.waitFor({ state: "visible", timeout: 10_000 });
}

async function assertNoPageOverflow(page, width) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const offenders = overflow > 1
    ? await page.evaluate(() => [...document.querySelectorAll("body *")]
      .map((element) => ({
        element: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${element.classList.length ? `.${[...element.classList].join(".")}` : ""}`,
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
        width: Math.round(element.getBoundingClientRect().width),
      }))
      .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1)
      .slice(0, 8))
    : [];
  assert.ok(overflow <= 1, `${width}px layout overflows horizontally by ${overflow}px: ${JSON.stringify(offenders)}`);
}
