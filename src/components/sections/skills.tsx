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
    <section id="expertise" className="section section-soft">
      <span id="skills" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Technical expertise"
            title="Backend depth. Applied AI delivery."
            description="Capabilities are separated into production experience, working experience, and familiarity. Expand any group to see where the tools were applied."
          />
        </Reveal>
        <div className="skill-legend" aria-label="Experience level legend">
          <span data-level="Production">Production</span>
          <span data-level="Working">Working</span>
          <span data-level="Familiar">Familiar</span>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal className="skill-group" delay={(index % 3) * 0.05} key={group.category}>
              <div className="skill-index">{String(index + 1).padStart(2, "0")}</div>
              <h3>{group.category}</h3>
              <p>{group.summary}</p>
              <div className="tag-row">
                {group.skills.map((skill) => (
                  <span className="tag" data-level={skill.level} key={skill.name}>
                    {skill.name}<small>{skill.level}</small>
                  </span>
                ))}
              </div>
              <details className="skill-context">
                <summary>Practical context</summary>
                <p>{group.context}</p>
                <small>Related: {group.relatedProjects.join(" · ")}</small>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal className="production-system">
          <div className="production-system-copy">
            <p className="eyebrow">Production pattern</p>
            <h3>From request to reliable AI outcome</h3>
            <p>A concise view of how backend, agentic AI, retrieval, data, and cloud delivery connect in production.</p>
          </div>
          <ArchitectureDiagram steps={productionFlow} title="Production AI system" />
        </Reveal>
      </div>
    </section>
  );
}
