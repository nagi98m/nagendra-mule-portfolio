import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { industryExperience } from "@/data/industry";

export function IndustryExperience() {
  return (
    <section className="section" aria-labelledby="industry-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="04 / Industry experience"
            title="Technical capability connected to operating domains."
            description="Each domain links to the case study that explains the architecture, role, controls, and verified outcome."
          />
        </Reveal>
        <div className="industry-grid">
          {industryExperience.map((industry, index) => (
            <Reveal className="industry-card" delay={(index % 3) * 0.05} key={industry.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry.title}</h3>
              <ul>{industry.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
              <Link href={industry.href}>{industry.project} case study <ArrowUpRight aria-hidden="true" /></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
