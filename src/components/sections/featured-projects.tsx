import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal><SectionHeading eyebrow="04 / Selected systems" title="Case studies in applied AI and backend architecture." description="Architecture-level views of enterprise work. Proprietary code, client data, and confidential implementation details remain private." /></Reveal>
        <div className="projects-list">{projects.map((project, index) => <Reveal key={project.slug}><ProjectCard project={project} index={index} /></Reveal>)}</div>
      </div>
    </section>
  );
}
