"use client";

import { Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function AskAIButton({ className = "button button-secondary", label = "Ask my AI resume" }: { className?: string; label?: string }) {
  function openAssistant() {
    trackEvent("ask_ai_open", { source: "cta" });
    window.dispatchEvent(new CustomEvent("portfolio:open-ai-resume"));
  }

  return <button className={className} type="button" onClick={openAssistant}><Sparkles size={16} aria-hidden="true" />{label}</button>;
}
