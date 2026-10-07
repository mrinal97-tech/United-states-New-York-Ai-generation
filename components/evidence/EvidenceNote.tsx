import { canDisplay, formatValue } from "@/lib/format";
import type { EvidencePoint } from "@/lib/types";
import { EvidenceChip } from "./EvidenceChip";
import { EvidenceDetail } from "./EvidenceDetail";
import { SourceAttribution } from "./SourceAttribution";

interface EvidenceNoteProps {
  evidence: EvidencePoint;
  /** Label used for unverified items that may still be mentioned (policy reports). */
  pendingLabel?: string;
}

/** A finding shown inline (value, if any, plus claim) with its class, source and measurement details. */
export function EvidenceNote({ evidence, pendingLabel }: EvidenceNoteProps) {
  const verified = canDisplay(evidence);
  // Only verified values are ever printed; unverified notes show their text claim alone.
  const value = verified ? formatValue(evidence) : null;
  if (!verified && !pendingLabel) return null;

  return (
    <div className={`space-y-3 border-l-2 pl-5 ${verified ? "border-ink" : "border-dashed border-graphite"}`}>
      <p className="text-body text-pretty">
        {value ? <strong className="font-semibold">{value} </strong> : null}
        {evidence.claim}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {verified ? (
          <EvidenceChip strength={evidence.evidenceStrength} />
        ) : (
          <span className="inline-flex items-center rounded-full border border-dashed border-graphite px-3 py-1 font-sans text-note font-semibold leading-none text-ink">
            {pendingLabel}
          </span>
        )}
        {evidence.sourceOrganization && evidence.source && evidence.sourceUrl ? (
          <SourceAttribution
            organization={evidence.sourceOrganization.split(" (")[0]}
            title={evidence.source}
            publicationDate={evidence.publicationDate}
            url={evidence.sourceUrl}
          />
        ) : null}
      </div>
      <EvidenceDetail evidence={evidence} label={verified ? "How this was measured" : "About this report"} />
    </div>
  );
}
