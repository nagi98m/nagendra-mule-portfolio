"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Eye, FileText, LoaderCircle, ShieldCheck, Upload } from "lucide-react";
import { aiApiUrl } from "@/config/profile";

type ResumeStatus = {
  available: boolean;
  pdf_url: string | null;
  docx_url: string | null;
  updated_at: string | null;
  knowledge_chunks: number;
};

export function ResumeAdmin() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [docx, setDocx] = useState<File | null>(null);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ResumeStatus | null>(null);
  const previewUrl = useMemo(() => pdf ? URL.createObjectURL(pdf) : null, [pdf]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  useEffect(() => {
    fetch(`${aiApiUrl}/api/resume`).then((response) => response.ok ? response.json() : null).then(setStatus).catch(() => undefined);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!pdf && !docx) return setMessage("Select a PDF, a DOCX, or both.");
    if (!token.trim()) return setMessage("Enter the private resume administration token.");
    const form = new FormData();
    if (pdf) form.append("pdf", pdf);
    if (docx) form.append("docx", docx);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${aiApiUrl}/api/admin/resume`, { method: "POST", headers: { "X-Resume-Admin-Token": token }, body: form });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "Resume upload failed.");
      setStatus(payload);
      setMessage("Resume stored successfully. The live RAG index has been refreshed.");
      setToken("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Resume upload failed.");
    } finally {
      setBusy(false);
    }
  }

  const storedPdf = status?.pdf_url ? new URL(status.pdf_url, `${aiApiUrl}/`).toString() : null;
  return (
    <main className="resume-admin-page">
      <section className="container resume-admin-shell">
        <div className="resume-admin-intro"><p className="eyebrow">Private portfolio tool</p><h1>Resume manager</h1><p>Upload the approved PDF and DOCX. The files are validated, stored under fixed safe names, and the extracted text is added to Ask My AI Resume immediately.</p><div className="admin-security"><ShieldCheck /><span>The token stays in this form only and is never saved in browser storage.</span></div></div>
        <form className="resume-upload-card" onSubmit={submit}>
          <div className="upload-field"><label htmlFor="resume-pdf"><FileText />Resume PDF</label><input id="resume-pdf" type="file" accept="application/pdf,.pdf" onChange={(event) => setPdf(event.target.files?.[0] ?? null)} /><small>{pdf ? `${pdf.name} · ${(pdf.size / 1024).toFixed(0)} KB` : "Select a text-based PDF, maximum 5 MB."}</small></div>
          <div className="upload-field"><label htmlFor="resume-docx"><FileText />Resume DOCX</label><input id="resume-docx" type="file" accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx" onChange={(event) => setDocx(event.target.files?.[0] ?? null)} /><small>{docx ? `${docx.name} · ${(docx.size / 1024).toFixed(0)} KB` : "Optional editable DOCX copy, maximum 5 MB."}</small></div>
          <label className="token-field" htmlFor="resume-token">Private administration token<input id="resume-token" type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" /></label>
          <button className="button button-primary" type="submit" disabled={busy}>{busy ? <LoaderCircle className="spinner" /> : <Upload />}{busy ? "Uploading…" : "Store and index resume"}</button>
          <p className={`admin-message ${message.includes("successfully") ? "success" : ""}`} aria-live="polite">{message}</p>
          {status?.available ? <div className="stored-status"><CheckCircle2 /><div><strong>Stored resume is active</strong><span>{status.knowledge_chunks} resume knowledge chunks indexed</span></div>{storedPdf ? <a href={storedPdf} target="_blank" rel="noreferrer"><Eye />View current PDF</a> : null}</div> : null}
        </form>
        {previewUrl ? <section className="resume-preview"><div><p className="eyebrow">Preview before upload</p><h2>{pdf?.name}</h2></div><iframe src={previewUrl} title="Selected resume PDF preview" /></section> : null}
      </section>
    </main>
  );
}
