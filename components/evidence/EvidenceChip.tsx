import { EVIDENCE_LABELS } from "@/lib/evidence-classes";
import type { EvidenceStrength } from "@/lib/types";

/**
 * Each class gets a distinct shape so the categories never depend on color
 * alone, and no shape is larger or longer than another (classes are not scores).
 * Solid marks = measured; the dashed ring = not measured.
 */
export function EvidenceMark({ strength }: { strength: EvidenceStrength }) {
  const common = { cx: 6, cy: 6, r: 4.5 };
  switch (strength) {
    case "direct":
      return <rect x="1.5" y="1.5" width="9" height="9" fill="currentColor" />;
    case "representative":
      return <circle {...common} fill="currentColor" />;
    case "contextual":
      return <circle {...common} fill="none" stroke="currentColor" strokeWidth="1.5" />;
    case "limited":
      return (
        <>
          <circle {...common} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1.5 A4.5 4.5 0 0 0 6 10.5 Z" fill="currentColor" />
        </>
      );
    case "evidence-gap":
      return (
        <circle
          {...common}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 1.6"
        />
      );
  }
}

interface EvidenceChipProps {
  strength: EvidenceStrength;
  /** Optional source or context shown after the class name. */
  detail?: string;
}

export function EvidenceChip({ strength, detail }: EvidenceChipProps) {
  const label = EVIDENCE_LABELS[strength];
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 font-sans text-note leading-none ${
        strength === "evidence-gap" ? "border-dashed border-graphite" : "border-rule"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
        <EvidenceMark strength={strength} />
      </svg>
      <span className="font-semibold text-ink">{label}</span>
      {detail ? <span className="text-graphite">{detail}</span> : null}
    </span>
  );
}
