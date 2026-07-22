import { BriefcaseBusiness, CodeXml, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { ResumeLink } from "@/components/ui/resume-link";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  const { socials } = portfolio;
  return (
    <section id="contact" className="section contact-section"><div className="container contact-grid"><Reveal><p className="eyebrow">08 / Start a conversation</p><h2>Let&apos;s build intelligent systems.</h2><p>I&apos;m open to opportunities in Python Backend Engineering, Generative AI, Agentic AI, and AI Platform Engineering.</p><div className="contact-links">{socials.email ? <a href={`mailto:${socials.email}`}><Mail />{socials.email}</a> : <span><Mail />Email available after configuration</span>}{socials.linkedin ? <TrackedLink href={socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "contact" }}><BriefcaseBusiness />LinkedIn</TrackedLink> : null}{socials.github ? <TrackedLink href={socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "contact" }}><CodeXml />GitHub</TrackedLink> : null}</div><ResumeLink href={portfolio.resumeUrl} /></Reveal><Reveal delay={0.08}><ContactForm /></Reveal></div></section>
  );
}
