import { ArrowRight } from "lucide-react";
import type { ArchitectureStep } from "@/types/portfolio";

export function ArchitectureDiagram({ steps, title }: { steps: ArchitectureStep[]; title: string }) {
  return (
    <div className="architecture" role="img" aria-label={`${title} architecture: ${steps.map((step) => step.label).join(" to ")}`}>
      <div className="architecture-track">
        {steps.map((step, index) => (
          <div className="architecture-item" key={`${step.label}-${index}`}>
            <div className="architecture-node"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong>{step.detail ? <small>{step.detail}</small> : null}</div>
            {index < steps.length - 1 ? <ArrowRight className="architecture-arrow" size={17} aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
