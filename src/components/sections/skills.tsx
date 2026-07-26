import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/portfolio";

const productionFlow = [
  { label: "API Input", detail: "Users · systems" },
  { label: "FastAPI", detail: "Async services" },
  { label: "LangGraph", detail: "Agent workflows" },
  { label: "LLM + RAG", detail: "Grounded intelligence" },
  { label: "Data Layer", detail: "Vectors · PostgreSQL" },
  { label: "AWS", detail: "Cloud delivery" },
];

export function Skills() {
  return (
    <section id="skills" className="section section-soft">
      <div className="container">
        <Reveal><SectionHeading eyebrow="03 / Technical depth" title="Backend depth. Applied AI delivery." description="A clear hierarchy of primary expertise, production experience, and supporting familiarity—without arbitrary percentages." /></Reveal>
        <div className="skills-grid">{skillGroups.map((group, index) => <Reveal className="skill-group" delay={(index % 3) * 0.05} key={group.category}><div className="skill-index">{String(index + 1).padStart(2, "0")}</div><h3>{group.category}</h3><div className="tag-row">{group.skills.map((skill) => <span className={`tag ${skill.primary ? "tag-primary" : ""}`} key={skill.name}>{skill.name}{skill.qualifier ? <small>{skill.qualifier}</small> : null}</span>)}</div></Reveal>)}</div>
        <Reveal className="production-system">
          <div className="production-system-copy"><p className="eyebrow">Production pattern</p><h3>From request to reliable AI outcome</h3><p>A concise view of how backend, agentic AI, retrieval, data, and cloud delivery connect in production.</p></div>
          <ArchitectureDiagram steps={productionFlow} title="Production AI system" />
        </Reveal>
      </div>
    </section>
  );
}
