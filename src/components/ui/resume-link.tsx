"use client";

import { useEffect, useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { aiApiUrl } from "@/config/profile";
import { trackEvent } from "@/lib/analytics";

type ResumeStatus = {
  available: boolean;
  pdf_url: string | null;
  docx_url: string | null;
};

function absoluteApiUrl(path: string | null) {
  return path ? new URL(path, `${aiApiUrl}/`).toString() : null;
}

export function ResumeLink({ href, compact = false }: { href: string | null; compact?: boolean }) {
  const [status, setStatus] = useState<ResumeStatus | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${aiApiUrl}/api/resume`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<ResumeStatus> : Promise.reject())
      .then(setStatus)
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const pdfUrl = absoluteApiUrl(status?.pdf_url ?? href);
  const docxUrl = absoluteApiUrl(status?.docx_url ?? null);
  if (!pdfUrl && !docxUrl) {
    return null;
  }

  return (
    <div className={`resume-actions ${compact ? "resume-actions-compact" : ""}`} aria-label="Resume actions">
      {pdfUrl ? <a className={`button button-primary ${compact ? "button-compact" : ""}`} href={pdfUrl} target="_blank" rel="noreferrer" aria-label="View Nagendra Mule's resume PDF" onClick={() => trackEvent("resume_download", { action: "view_pdf" })}><Eye size={16} />{compact ? "View" : "View resume"}</a> : null}
      {pdfUrl ? <a className={`button button-secondary ${compact ? "button-compact" : ""}`} href={pdfUrl} download aria-label="Download Nagendra Mule's resume PDF" onClick={() => trackEvent("resume_download", { action: "download_pdf" })}><Download size={16} />PDF</a> : null}
      {docxUrl ? <a className={`button button-secondary ${compact ? "button-compact" : ""}`} href={docxUrl} download aria-label="Download Nagendra Mule's resume DOCX" onClick={() => trackEvent("resume_download", { action: "download_docx" })}><FileText size={16} />DOCX</a> : null}
    </div>
  );
}
