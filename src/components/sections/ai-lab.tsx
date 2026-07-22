import { CodeXml, ExternalLink, FlaskConical } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { labProjects } from "@/data/portfolio";

export function AILab() {
  return (
    <section id="ai-lab" className="section">
      <div className="container">
        <Reveal><SectionHeading eyebrow="07 / AI Engineering Lab" title="Public engineering roadmap." description="Typed showcase cards ready for real repositories and demos. Every item remains clearly marked Planned until public code exists." /></Reveal>
        <div className="lab-grid">
          {labProjects.map((project, index) => (
            <Reveal className="lab-card" delay={index * 0.05} key={project.repositoryName}>
              <div className="lab-top"><FlaskConical /><span>{project.status}</span></div>
              <h3>{project.repositoryName}</h3>
              <p>{project.description}</p>
              <div className="tag-row">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
              <div className="lab-links">
                {project.githubUrl ? <TrackedLink href={project.githubUrl} target="_blank" rel="noreferrer" eventName="github_click" metadata={{ repository: project.repositoryName }}><CodeXml />Repository</TrackedLink> : <span><CodeXml />Repository planned</span>}
                {project.liveDemoUrl ? <a href={project.liveDemoUrl} target="_blank" rel="noreferrer"><ExternalLink />Live demo</a> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
