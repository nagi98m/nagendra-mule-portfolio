import { ArrowDown, ArrowRight, BriefcaseBusiness, CodeXml } from "lucide-react";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { AskAIButton } from "@/components/ai/ask-ai-button";
import { Reveal } from "@/components/ui/reveal";
import { ResumeLink } from "@/components/ui/resume-link";
import { portfolio } from "@/data/portfolio";

const heroFlow = [
  { label: "API Input", detail: "Users · systems" },
  { label: "FastAPI", detail: "Async services" },
  { label: "LangGraph", detail: "Agent workflows" },
  { label: "LLM + RAG", detail: "Grounded intelligence" },
  { label: "Data Layer", detail: "Vectors · PostgreSQL" },
  { label: "AWS", detail: "Cloud delivery" },
];

export function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="hero-grid container">
        <Reveal className="hero-copy">
          <div className="status"><span /> {portfolio.role}</div>
          <p className="hero-kicker">Nagendra Mule</p>
          <h1>Python backend meets <span>production AI.</span></h1>
          <p className="hero-description"><strong>4.9 years building production AI and backend systems</strong> with FastAPI, LangGraph, RAG, and AWS.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View featured work <ArrowRight size={17} aria-hidden="true" /></a>
            <ResumeLink href={portfolio.resumeUrl} />
          </div>
          <div className="social-row">
            {portfolio.socials.github ? <TrackedLink href={portfolio.socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "hero" }}><CodeXml size={17} /> GitHub</TrackedLink> : null}
            {portfolio.socials.linkedin ? <TrackedLink href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "hero" }}><BriefcaseBusiness size={17} /> LinkedIn</TrackedLink> : null}
            <AskAIButton className="social-action" label="Ask my AI resume" />
            <a href="#contact">Discuss an opportunity <ArrowDown size={16} /></a>
          </div>
        </Reveal>
        <Reveal className="hero-system" delay={0.12}>
          <div className="system-header"><span className="system-dot" /><span>production-ai.system</span><span>LIVE</span></div>
          <div className="system-title"><small>REFERENCE ARCHITECTURE</small><strong>From request to reliable AI outcome</strong></div>
          <ArchitectureDiagram steps={heroFlow} title="Production AI system" />
          <div className="system-footer"><span>observable</span><span>secure</span><span>cloud-native</span></div>
        </Reveal>
      </div>
      <div className="container credibility" aria-label="Professional highlights">
        <div><strong>4.9+</strong><span>Years engineering</span></div>
        <div><strong>Production</strong><span>AI systems</span></div>
        <div><strong>04</strong><span>AWS certifications</span></div>
        <div><strong>Python · GenAI</strong><span>Cloud architecture</span></div>
      </div>
    </section>
  );
}
