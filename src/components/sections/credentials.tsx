import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications } from "@/data/portfolio";

export function Credentials() {
  return (
    <section id="certifications" className="section section-soft">
      <div className="container"><Reveal><SectionHeading eyebrow="05 / Credentials" title="Cloud depth, formally validated." /></Reveal><div className="credential-layout"><div className="cert-grid">{certifications.map((cert, index) => <Reveal className="cert-card" delay={index * 0.05} key={cert.name}><div className="cert-icon"><Award /></div><div><small>{cert.issuer}</small><h3>{cert.name}</h3>{cert.credentialUrl ? <a className="credential-link" href={cert.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ExternalLink /></a> : null}</div></Reveal>)}</div><Reveal className="education-card"><GraduationCap /><p className="eyebrow">Education</p><h3>Master of Business Administration (MBA)</h3><p>Jawaharlal Nehru Technological University (JNTU), Kakinada</p></Reveal></div></div>
    </section>
  );
}
