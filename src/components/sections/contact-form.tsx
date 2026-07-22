"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type FormState = { status: "idle" | "loading" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function submit(formData: FormData) {
    trackEvent("contact_submit");
    setState({ status: "loading", message: "" });
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your message.");
      setState({ status: "success", message: result.message || "Message sent." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unable to send your message." });
    }
  }

  return (
    <form className="contact-form" action={submit} aria-describedby="form-status">
      <div className="form-row"><label>Name<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label></div>
      <label>Message<textarea name="message" required minLength={20} maxLength={2000} rows={5} placeholder="Tell me about the role, system, or engineering challenge." /></label>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-primary" type="submit" disabled={state.status === "loading"}>{state.status === "loading" ? <LoaderCircle className="spinner" /> : <ArrowRight />} {state.status === "loading" ? "Sending…" : "Send message"}</button>
      <p id="form-status" className={`form-status ${state.status}`} aria-live="polite">{state.message}</p>
    </form>
  );
}
