"use client";

import { Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ResumeLink({ href, compact = false }: { href: string | null; compact?: boolean }) {
  if (!href) {
    return (
      <span className={`button button-muted ${compact ? "button-compact" : ""}`} aria-label="Resume download is coming soon" title="Add the resume file and configure its URL">
        <Download size={16} aria-hidden="true" /> Resume coming soon
      </span>
    );
  }

  return (
    <a className={`button button-secondary ${compact ? "button-compact" : ""}`} href={href} download aria-label="Download Nagendra Mule's resume" onClick={() => trackEvent("resume_download")}>
      <Download size={16} aria-hidden="true" /> Download resume
    </a>
  );
}
