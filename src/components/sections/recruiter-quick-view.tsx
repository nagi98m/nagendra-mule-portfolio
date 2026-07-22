import { ArrowRight, BriefcaseBusiness, Cloud, CodeXml, Cpu, FileCode2, Sparkles } from "lucide-react";
import Link from "next/link";
import { AskAIButton } from "@/components/ai/ask-ai-button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { ResumeLink } from "@/components/ui/resume-link";
import { portfolio } from "@/data/portfolio";

const highlights = [
  { icon: BriefcaseBusiness, value: "4.9+ Years", label: "Production engineering" },
  { icon: FileCode2, value: "Python Backend", label: "FastAPI · APIs · services" },
  { icon: Cpu, value: "Generative AI", label: "Agentic AI · LangGraph · RAG" },
  { icon: Cloud, value: "AWS + GCP", label: "4 AWS certifications" },
];

export function RecruiterQuickView() {
  return <section className="quick-view"><div className="container"><Reveal className="quick-view-card"><div className="quick-view-heading"><div><p className="eyebrow">Recruiter quick view</p><h2>The profile in 20 seconds.</h2></div><Sparkles aria-hidden="true" /></div><div className="quick-stats">{highlights.map(({ icon: Icon, value, label }) => <div key={value}><Icon /><strong>{value}</strong><span>{label}</span></div>)}</div><div className="quick-actions">{portfolio.resumeUrl ? <ResumeLink href={portfolio.resumeUrl} compact /> : null}<Link className="button button-secondary button-compact" href="/projects/tag-ai-platform">Flagship project <ArrowRight /></Link><AskAIButton className="button button-primary button-compact" label="Ask AI" /><TrackedLink className="button button-secondary button-compact" href={portfolio.socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "quick_view" }}><CodeXml />GitHub</TrackedLink>{portfolio.socials.linkedin ? <TrackedLink className="button button-secondary button-compact" href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "quick_view" }}><BriefcaseBusiness />LinkedIn</TrackedLink> : null}{portfolio.socials.email ? <a className="button button-secondary button-compact" href="#contact">Contact</a> : null}</div></Reveal></div></section>;
}
