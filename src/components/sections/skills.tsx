import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="section section-soft">
      <div className="container">
        <Reveal><SectionHeading eyebrow="03 / Technical depth" title="Backend depth. Applied AI delivery." description="A clear hierarchy of primary expertise, production experience, and supporting familiarity—without arbitrary percentages." /></Reveal>
        <div className="skills-grid">{skillGroups.map((group, index) => <Reveal className="skill-group" delay={(index % 3) * 0.05} key={group.category}><div className="skill-index">{String(index + 1).padStart(2, "0")}</div><h3>{group.category}</h3><div className="tag-row">{group.skills.map((skill) => <span className={`tag ${skill.primary ? "tag-primary" : ""}`} key={skill.name}>{skill.name}{skill.qualifier ? <small>{skill.qualifier}</small> : null}</span>)}</div></Reveal>)}</div>
      </div>
    </section>
  );
}
