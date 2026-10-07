import { DataPending } from "@/components/ui/DataPending";
import { canDisplay, formatValue } from "@/lib/format";
import type { EvidencePoint } from "@/lib/types";
import { EvidenceChip } from "./EvidenceChip";
import { EvidenceDetail } from "./EvidenceDetail";
import { SourceAttribution } from "./SourceAttribution";

interface StatisticProps {
  /** A statistic can only be rendered from an evidence point, never from a bare number. */
  evidence: EvidencePoint;
}

/**
 * A single verified figure with its respondent base and source kept attached.
 * Unverified evidence renders as pending instead of as a number.
 */
export function Statistic({ evidence }: StatisticProps) {
  const value = formatValue(evidence);

  if (!canDisplay(evidence) || value === null) {
    return (
      <DataPending title="Awaiting verification">
        This figure is withheld until it is confirmed against its primary source.
      </DataPending>
    );
  }

  return (
    <figure className="max-w-[var(--spacing-measure)]">
      <p className="text-display font-medium tracking-[-0.03em] tabular-nums">
        <span className="bg-[linear-gradient(transparent_56%,var(--highlighter)_56%,var(--highlighter)_80%,transparent_80%)] text-ink">
          {value}
        </span>
      </p>
      <figcaption className="mt-4 space-y-3">
        <p className="text-lede text-pretty">{evidence.claim}</p>
        <p className="font-sans text-note text-graphite">
          Base: {evidence.base}
          {evidence.baseN !== null ? ` (n=${evidence.baseN.toLocaleString("en-US")})` : null}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <EvidenceChip strength={evidence.evidenceStrength} />
          {evidence.sourceOrganization && evidence.source && evidence.sourceUrl ? (
            <SourceAttribution
              organization={evidence.sourceOrganization}
              title={evidence.source}
              publicationDate={evidence.publicationDate}
              url={evidence.sourceUrl}
            />
          ) : null}
        </div>
        <EvidenceDetail evidence={evidence} />
      </figcaption>
    </figure>
  );
}
