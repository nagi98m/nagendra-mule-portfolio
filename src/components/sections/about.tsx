import { Bot, Braces, Cloud, Network, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

const pillars = [
  { icon: Braces, title: "Backend foundations", text: "Async Python APIs, service boundaries, data modeling, and testing." },
  { icon: Bot, title: "Applied AI", text: "Grounded LLM applications, RAG patterns, and agentic workflows." },
  { icon: Cloud, title: "Cloud delivery", text: "Serverless AWS systems and containerized GCP services." },
  { icon: ShieldCheck, title: "Enterprise readiness", text: "SSO, OAuth2/JWT, RBAC, secrets, monitoring, and analytics." },
];

export function About() {
  return (
    <section id="about" className="section section-soft">
      <div className="container about-grid">
        <Reveal><SectionHeading eyebrow="01 / About" title="Engineering AI beyond the prototype." /><p className="about-copy">{portfolio.about}</p><div className="about-statement"><Workflow /><p>My focus is the connective tissue: turning model capability into secure, observable software that teams can operate with confidence.</p></div></Reveal>
        <div className="pillar-grid">{pillars.map(({ icon: Icon, title, text }, index) => <Reveal className="pillar" delay={index * 0.06} key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p>{index === 0 ? <Network className="pillar-watermark" /> : null}</Reveal>)}</div>
      </div>
    </section>
  );
}
