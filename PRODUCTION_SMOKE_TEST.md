# Production Smoke Test

Run this only after both services are deployed. Do not mark any item passed from local results.

Record the exact URLs:

```text
FRONTEND_HTTPS_ORIGIN=
BACKEND_HTTPS_ORIGIN=
```

## Automated HTTP checks

Replace the example values before running:

```powershell
$portfolioSiteUrl = "https://your-frontend.example"
$portfolioApiUrl = "https://your-backend.example"

Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/projects/tag-ai-platform"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/projects/ivacs"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/projects/ecommerce-cloud-platform"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/sitemap.xml"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/robots.txt"
Invoke-WebRequest -UseBasicParsing "$portfolioSiteUrl/opengraph-image"
Invoke-RestMethod "$portfolioApiUrl/health"

Invoke-WebRequest -UseBasicParsing -Method Options "$portfolioApiUrl/api/chat" -Headers @{
  Origin = $portfolioSiteUrl
  "Access-Control-Request-Method" = "POST"
}
```

Every request must use HTTPS and return the expected success status. The CORS response must allow only the exact frontend origin.

Stop immediately if the frontend is HTTPS but any API request targets HTTP; that is an invalid mixed-content deployment.

## Browser checks

- [ ] Homepage loads with correct canonical URL and no console errors
- [ ] Mobile navigation works at 320px, 375px, 390px, and 768px
- [ ] Resume opens/downloads with the correct filename, if configured
- [ ] GitHub opens `https://github.com/nagi98m`
- [ ] LinkedIn opens the verified profile, if configured
- [ ] Every configured credential verification URL opens the expected AWS credential page
- [ ] TAG, IVACS, and E-Commerce case-study routes load directly and through navigation
- [ ] Recruiter Quick View opens and every visible action works
- [ ] AI Resume dialog opens and suggested questions populate the composer
- [ ] A supported question returns a grounded answer and working citations
- [ ] An unsupported question returns the honest unavailable response with no citations
- [ ] AI remains usable in local-extractive mode when LLM credentials are absent
- [ ] Contact shows the public direct-email option if configured
- [ ] Contact form does not claim delivery while no provider is implemented
- [ ] Sitemap, robots, and Open Graph image use the production origin
- [ ] No browser request is blocked as HTTP mixed content
- [ ] No unexpected CORS, JavaScript, hydration, or horizontal-overflow errors appear

## Backend checks

- [ ] `/health` reports `status: ok`, a non-zero knowledge-document count, and the expected LLM mode
- [ ] `/api/suggestions` returns the approved recruiter questions
- [ ] `/api/chat` returns citations without filesystem paths or secrets
- [ ] Provider failure returns a safe temporary-unavailable error
- [ ] An unapproved frontend origin is rejected by CORS
- [ ] Runtime logs contain no API keys, secrets, chat content, or local filesystem paths

## Repository and security checks

- [ ] `git status --short` contains no accidental build output, test screenshots, environments, virtual environments, or dependency directories
- [ ] `.env`, `.env.local`, `backend/.env`, `.venv`, `node_modules`, `.next`, and `test-results` remain ignored
- [ ] Secret scan reports no real API keys, passwords, AWS keys, or private keys
- [ ] No production URL is a placeholder, empty link, `localhost`, `127.0.0.1`, or plain HTTP origin
- [ ] `git diff --check` passes
- [ ] Dependency risk in `DEPENDENCY_SECURITY.md` has been resolved or explicitly accepted for this release

Suggested local pre-release commands:

```powershell
git status --short
git diff --check
rg -l -i "sk-|API_KEY=|SECRET=|PASSWORD=|AWS_ACCESS_KEY|PRIVATE_KEY" . -g "!node_modules/**" -g "!.next/**" -g "!backend/.venv/**"
npm audit --omit=dev
```

Inspect matches without printing real secret values into logs. Empty variables in committed `.env.example` files are expected.
