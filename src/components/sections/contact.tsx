"use client";

import { FormEvent, useState } from "react";
import { BriefcaseBusiness, CodeXml, Mail, MapPin, Send } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

type FormStatus = { type: "idle" | "error" | "ready"; message: string };

export function Contact() {
  const { socials } = portfolio;
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") || "").trim()) {
      setStatus({ type: "ready", message: "Thank you. Your message is ready." });
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const consent = data.get("consent") === "on";

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 3 || message.length < 20 || !consent) {
      setStatus({ type: "error", message: "Complete every field, use a valid email, and provide at least 20 characters in the message." });
      return;
    }

    if (!socials.email) {
      setStatus({ type: "error", message: "Direct email is not configured. Please use LinkedIn or GitHub." });
      return;
    }

    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    setStatus({ type: "ready", message: "Opening your email application. Review the message there before sending." });
    window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <Reveal className="contact-content">
          <p className="eyebrow">08 / Contact</p>
          <h2>Build reliable AI systems together.</h2>
          <p>Open to Senior Python Backend, Generative AI, Applied AI, Agentic AI, and AI Platform engineering roles.</p>
          <dl className="contact-details">
            <div><dt><MapPin aria-hidden="true" />Location</dt><dd>{portfolio.location}</dd></div>
            <div><dt><BriefcaseBusiness aria-hidden="true" />Availability</dt><dd>{portfolio.availability}</dd></div>
            {socials.email ? <div><dt><Mail aria-hidden="true" />Email</dt><dd><a href={`mailto:${socials.email}`}>{socials.email}</a></dd></div> : null}
          </dl>
          <div className="contact-actions">
            {socials.linkedin ? <TrackedLink className="button button-secondary" href={socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "contact" }}><BriefcaseBusiness />LinkedIn</TrackedLink> : null}
            <TrackedLink className="button button-secondary" href={socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "contact" }}><CodeXml />GitHub profile</TrackedLink>
          </div>
        </Reveal>

        {socials.email ? (
          <Reveal>
            <form className="contact-form" onSubmit={submitContact} noValidate>
              <div className="form-grid">
                <label>Name<input name="name" autoComplete="name" minLength={2} required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              </div>
              <label>Subject<input name="subject" minLength={3} required /></label>
              <label>Message<textarea name="message" rows={6} minLength={20} required /></label>
              <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <label className="consent"><input name="consent" type="checkbox" required /><span>I confirm this is a genuine professional enquiry and consent to opening it in my email application.</span></label>
              <button className="button button-primary" type="submit"><Send aria-hidden="true" />Prepare email</button>
              <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>
              <small>This form does not transmit or store data on the website. It prepares a message in your email application.</small>
            </form>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
