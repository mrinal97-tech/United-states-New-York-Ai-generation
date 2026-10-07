import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import { SourceAttribution } from "@/components/evidence/SourceAttribution";
import { getEvidence } from "@/lib/evidence";
import { canDisplay, formatFieldDates, formatValue } from "@/lib/format";
import { getSource } from "@/lib/sources";

interface SeparateMeasuresProps {
  items: { evidenceId: string; measure: string }[];
  note: string;
}

/**
 * Figures from different instruments shown side by side as separate
 * measurements: no shared axis, no connecting line, no time ordering.
 */
export function SeparateMeasures({ items, note }: SeparateMeasuresProps) {
  const points = items.map((it) => ({ ...it, point: getEvidence(it.evidenceId) })).filter((it) => canDisplay(it.point));

  return (
    <figure className="space-y-5">
      <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
        {points.map(({ evidenceId, measure, point }) => {
          const source = point.sourceId ? getSource(point.sourceId) : null;
          return (
            <li key={evidenceId} className="flex flex-col gap-3 bg-paper p-5">
              <p className="font-sans text-ui text-ink">{measure}</p>
              <p className="text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-medium tracking-[-0.02em]">
                {formatValue(point)}
              </p>
              <p className="font-sans text-note text-graphite">
                {point.base}
                {point.baseN ? `, n=${point.baseN.toLocaleString("en-US")}` : ""}
                {source?.fieldDates ? `. Surveyed ${formatFieldDates(source.fieldDates)}.` : ""}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2">
                <EvidenceChip strength={point.evidenceStrength} />
                {point.sourceOrganization && point.source && point.sourceUrl ? (
                  <SourceAttribution
                    organization={point.sourceOrganization.split(" (")[0]}
                    title={point.source}
                    publicationDate={point.publicationDate}
                    url={point.sourceUrl}
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <figcaption className="font-sans text-note text-ink">{note}</figcaption>
    </figure>
  );
}
