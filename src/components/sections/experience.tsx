import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal><SectionHeading eyebrow="06 / Experience" title="Production work, supported by implementation detail." description="Professional experience since November 2021 across AI platforms, backend services, automation, and cloud delivery." /></Reveal>
        <div className="timeline">{experience.map((job, index) => <Reveal className="timeline-item" delay={index * 0.08} key={job.company}><div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div><div className="timeline-card"><div className="timeline-head"><div><h3>{job.role}</h3><p>{job.company}</p></div><time>{job.period}</time></div><p className="timeline-summary">{job.summary}</p><ul>{job.achievements.map((achievement) => <li key={achievement}><Check size={16} aria-hidden="true" /><span>{achievement}</span></li>)}</ul><div className="timeline-projects" aria-label={`${job.company} related case studies`}>{job.projects.map((project) => <Link key={project.href} href={project.href}>{project.label}</Link>)}</div></div></Reveal>)}</div>
      </div>
    </section>
  );
}
