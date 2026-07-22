import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { impact } from "@/data/portfolio";

export function Impact() {
  return (
    <section className="section impact-section">
      <div className="container"><Reveal><SectionHeading eyebrow="05 / Selected impact" title="Evidence over buzzwords." /></Reveal><div className="impact-grid">{impact.map((item, index) => <Reveal className="impact-card" delay={index * 0.05} key={item.title}><strong>{item.value}</strong><h3>{item.title}</h3><p>{item.description}</p></Reveal>)}</div></div>
    </section>
  );
}
