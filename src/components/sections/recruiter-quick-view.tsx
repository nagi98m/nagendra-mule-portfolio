import { ArrowRight, BadgeCheck, BriefcaseBusiness, Cloud, CodeXml, GitBranch, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { AskAIButton } from "@/components/ai/ask-ai-button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { ResumeLink } from "@/components/ui/resume-link";
import { portfolio } from "@/data/portfolio";

const highlights = [
  { icon: BriefcaseBusiness, value: "4.9+ Years", label: "Production engineering" },
  { icon: Layers3, value: "4 Case Studies", label: "Enterprise AI · voice · cloud" },
  { icon: Cloud, value: "AWS + GCP", label: "4 AWS certifications" },
];

const engineeringProof = [
  { icon: BadgeCheck, label: "100% hit@4 · 15-case RAG eval" },
  { icon: ShieldCheck, label: "121-test enterprise AI evidence" },
  { icon: GitBranch, label: "Docker + CI quality gates" },
];

export function RecruiterQuickView() {
  return (
    <section className="quick-view" aria-labelledby="career-snapshot-title">
      <div className="container">
        <Reveal className="quick-view-card">
          <div className="quick-view-heading">
            <div><p className="eyebrow">Recruiter quick view</p><h2 id="career-snapshot-title">Engineering proof in 20 seconds.</h2></div>
            <Sparkles aria-hidden="true" />
          </div>
          <div className="quick-stats">
            {highlights.map(({ icon: Icon, value, label }) => <div key={value}><Icon /><strong>{value}</strong><span>{label}</span></div>)}
          </div>
          <div className="quick-actions">
            <ResumeLink href={portfolio.resumeUrl} compact />
            <Link className="button button-secondary button-compact" href="/projects/nexusai-enterprise-copilot">Flagship project <ArrowRight /></Link>
            <AskAIButton className="button button-primary button-compact" label="Ask AI" />
            <TrackedLink className="button button-secondary button-compact" href={portfolio.socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "quick_view" }}><CodeXml />GitHub</TrackedLink>
            {portfolio.socials.linkedin ? <TrackedLink className="button button-secondary button-compact" href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "quick_view" }}><BriefcaseBusiness />LinkedIn</TrackedLink> : null}
            {portfolio.socials.email ? <a className="button button-secondary button-compact" href="#contact">Contact</a> : null}
          </div>
          <div className="engineering-proof" aria-label="Engineering quality evidence">
            {engineeringProof.map(({ icon: Icon, label }) => <span key={label}><Icon aria-hidden="true" />{label}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
