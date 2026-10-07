import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import type { EvidenceStrength } from "@/lib/types";

export interface ChainStep {
  step: string;
  evidence: EvidenceStrength;
  /** What is actually available at this step. */
  basis: string;
}

/**
 * The inference chain from "teens use AI" to "AI changes how teens think".
 * Each step shows the class of evidence available. The connector is solid
 * between measured steps and dashed into steps that are evidence gaps.
 * Classes are categorical labels; nothing here encodes them as length or score.
 */
export function EvidenceChain({ steps }: { steps: ChainStep[] }) {
  return (
    <ol className="relative">
      {steps.map((s, i) => {
        const next = steps[i + 1];
        const gapAhead = next?.evidence === "evidence-gap";
        const isGap = s.evidence === "evidence-gap";
        return (
          <li key={s.step} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-8 last:pb-0">
            <span aria-hidden="true" className="relative flex justify-center">
              <span
                className={`relative z-10 mt-1.5 size-3.5 rounded-full border-2 ${
                  isGap ? "border-dashed border-graphite bg-paper" : "border-ink bg-ink"
                }`}
              />
              {next ? (
                <span
                  className={`absolute top-5 bottom-[-0.375rem] left-1/2 -translate-x-1/2 border-l-2 ${
                    gapAhead ? "border-dashed border-graphite" : "border-ink"
                  }`}
                />
              ) : null}
            </span>
            <div className="space-y-2">
              <p className="text-h3 font-medium tracking-[-0.01em]">{s.step}</p>
              <EvidenceChip strength={s.evidence} />
              <p className="font-sans text-note text-graphite text-pretty">{s.basis}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
