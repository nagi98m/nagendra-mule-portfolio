import { Award, BriefcaseBusiness, Gauge, Mic2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

const impact = [
  {
    icon: Gauge,
    value: "60%",
    label: "Manual QA effort reduction",
    context: "Verified outcome from TAG requirement analysis, test generation, and automation workflows.",
  },
  {
    icon: Mic2,
    value: "3",
    label: "Voice AI industry verticals",
    context: "Reusable IVACS workflows supported healthcare, real-estate, and golf operations.",
  },
  {
    icon: Award,
    value: "4",
    label: "AWS certifications listed",
    context: "Certification names are public; verification links remain hidden until supplied.",
  },
  {
    icon: BriefcaseBusiness,
    value: portfolio.experience,
    label: "Professional engineering experience",
    context: "Calculated from the verified November 2021 professional start date.",
  },
];

export function EngineeringImpact() {
  return (
    <section className="section impact-section" aria-labelledby="impact-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="01 / Engineering impact"
            title="Evidence with operating context."
            description="Only supplied outcomes are shown. Unverified latency, traffic, cost, and scale figures remain intentionally absent."
          />
        </Reveal>
        <div className="impact-grid">
          {impact.map(({ icon: Icon, value, label, context }, index) => (
            <Reveal className="impact-card" delay={index * 0.05} key={label}>
              <Icon aria-hidden="true" />
              <strong>{value}</strong>
              <h3>{label}</h3>
              <p>{context}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
