"use client";

import dynamic from "next/dynamic";

const AIResumeAssistant = dynamic(
  () => import("@/components/ai/ai-resume-assistant").then((module) => module.AIResumeAssistant),
  { ssr: false },
);

export function AIResumeLoader() {
  return <AIResumeAssistant />;
}
