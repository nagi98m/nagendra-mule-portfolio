import { BriefcaseBusiness, CodeXml, Mail } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

export function Contact() {
  const { socials } = portfolio;
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-content">
        <Reveal>
          <p className="eyebrow">06 / Contact</p>
          <h2>Open to the right engineering opportunity.</h2>
          <p>Python backend, Generative AI, Agentic AI, and AI platform roles where production reliability matters.</p>
          <div className="contact-actions">
            {socials.email ? <a className="button button-primary" href={`mailto:${socials.email}`}><Mail />Email Nagendra</a> : null}
            {socials.linkedin ? <TrackedLink className="button button-secondary" href={socials.linkedin} target="_blank" rel="noreferrer" eventName="linkedin_click" metadata={{ source: "contact" }}><BriefcaseBusiness />LinkedIn</TrackedLink> : null}
            <TrackedLink className="button button-secondary" href={socials.github} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ source: "contact" }}><CodeXml />GitHub profile</TrackedLink>
          </div>
          {!socials.email && !socials.linkedin ? <p className="contact-note">For role discussions, please use the contact channel through which this portfolio was shared.</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
