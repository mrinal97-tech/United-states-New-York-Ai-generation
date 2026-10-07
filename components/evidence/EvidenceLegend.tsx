import { EVIDENCE_CLASSES } from "@/lib/evidence-classes";
import { EvidenceChip } from "./EvidenceChip";

/** Definitions of the five evidence classes. Rendered as a description list, not a scale. */
export function EvidenceLegend() {
  return (
    <dl className="divide-y divide-rule border-y border-rule">
      {EVIDENCE_CLASSES.map((c) => (
        <div key={c.id} className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[11rem_1fr]">
          <dt>
            <EvidenceChip strength={c.id} />
          </dt>
          <dd className="space-y-1">
            <p className="text-body">{c.definition}</p>
            <p className="font-sans text-note text-graphite">{c.reading}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
