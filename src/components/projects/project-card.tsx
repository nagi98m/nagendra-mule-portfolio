import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import type { Project } from "@/types/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFlagship = project.slug === "tag-ai-platform";
  return (
    <article className={`project-card accent-${project.accent} ${isFlagship ? "project-flagship" : ""}`}>
      <div className="project-topline"><span>0{index + 1} {isFlagship ? "· FLAGSHIP" : ""}</span><span><LockKeyhole size={14} aria-hidden="true" /> Enterprise project · Source code private</span></div>
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.summary}</p>
      </div>
      {isFlagship ? <div className="project-impact"><strong>~60%</strong><span>reduction in manual QA effort through orchestrated requirement and test automation workflows</span></div> : null}
      <ArchitectureDiagram steps={project.architecture} title={project.title} />
      <div className="project-footer">
        <div className="tag-row">{project.technologies.slice(0, 7).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        <Link className="text-link" href={`/projects/${project.slug}`}>View case study <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
