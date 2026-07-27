import { ArrowDown, ArrowRight, BriefcaseBusiness, CodeXml, Terminal } from "lucide-react";
import Image from "next/image";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { AskAIButton } from "@/components/ai/ask-ai-button";
import { Reveal } from "@/components/ui/reveal";
import { ResumeLink } from "@/components/ui/resume-link";
import { portfolio } from "@/data/portfolio";

const profileStack = ["Python", "FastAPI", "LangGraph", "Hybrid RAG", "PostgreSQL", "AWS"];

export function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="hero-grid container">
        <Reveal className="hero-copy">
          <div className="status"><span /> Available for remote engineering roles</div>
          <p className="hero-kicker">{portfolio.name} / Hyderabad, India</p>
          <h1>Python Backend &amp; <span>Generative AI Engineer</span></h1>
          <p className="hero-positioning">{portfolio.summary}</p>
          <p className="hero-description">I connect dependable Python services, retrieval, agent orchestration, enterprise security, and cloud delivery into systems teams can operate.</p>
          <div className="whoami" aria-label="Engineer identity summary">
            <Terminal aria-hidden="true" />
            <div><span>$ whoami</span><strong>Nagendra Mule</strong><small>Python Backend · Agentic AI · RAG · Cloud Platforms</small></div>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View featured work <ArrowRight size={17} aria-hidden="true" /></a>
            <ResumeLink href={portfolio.resumeUrl} />
          </div>
          <div className="social-row">
            <TrackedLink href={portfolio.socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "hero" }}><CodeXml size={17} /> GitHub</TrackedLink>
            {portfolio.socials.linkedin ? <TrackedLink href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "hero" }}><BriefcaseBusiness size={17} /> LinkedIn</TrackedLink> : null}
            <AskAIButton className="social-action" label="Ask my AI resume" />
            <a href="#contact">Discuss an opportunity <ArrowDown size={16} /></a>
          </div>
          <dl className="live-status" aria-label="Current professional status">
            <div><dt>Current role</dt><dd>Python &amp; GenAI Engineer</dd></div>
            <div><dt>Experience</dt><dd>{portfolio.experience}</dd></div>
            <div><dt>Location</dt><dd>{portfolio.location}</dd></div>
            <div><dt>Availability</dt><dd>{portfolio.availability}</dd></div>
          </dl>
        </Reveal>

        <Reveal className="hero-profile" delay={0.12}>
          <div className="hero-profile-visual">
            <Image
              src="/images/ai-backend-career-visual.png"
              alt="Abstract AI backend architecture with retrieval, security, and cloud delivery"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 42vw"
            />
            <span className="profile-availability"><i /> Open to Remote</span>
          </div>
          <div className="hero-profile-body">
            <p>Engineer profile</p>
            <h2>{portfolio.name}</h2>
            <strong>{portfolio.role}</strong>
            <div className="profile-metrics">
              <span><b>{portfolio.experience}</b> since Nov 2021</span>
              <span><b>4</b> case studies</span>
              <span><b>4</b> AWS certifications</span>
            </div>
            <div className="profile-stack" aria-label="Primary technology stack">
              {profileStack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
