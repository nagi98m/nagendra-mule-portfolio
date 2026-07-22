export type AnalyticsEvent = "resume_download" | "github_click" | "linkedin_click" | "project_view" | "ask_ai_open" | "contact_submit";

export function trackEvent(name: AnalyticsEvent, metadata?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("portfolio:analytics", { detail: { name, metadata } }));
  // Connect a privacy-conscious provider here. Never attach chat content.
}
