"use client";

import { scaleLinear } from "d3";
import { useId, useState } from "react";
import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import { EvidenceDetail } from "@/components/evidence/EvidenceDetail";
import { SourceAttribution } from "@/components/evidence/SourceAttribution";
import { formatValue } from "@/lib/format";
import type { EvidencePoint } from "@/lib/types";

interface BarListProps {
  /** The question this chart answers, used as its title. */
  title: string;
  /** Verified points only (see resolveVisualization). */
  points: EvidencePoint[];
  /** Short row labels keyed by evidence id. Labels name categories; values always come from evidence. */
  labels: Record<string, string>;
  /** Shown under the title when every row shares one respondent base. */
  sharedBase?: string | null;
  /** Reading note for likely misinterpretations (e.g. multi-select items). */
  note?: string;
  /** Number of points withheld pending verification, disclosed under the chart. */
  withheldCount?: number;
}

// One fixed 0–100% domain for every percentage bar on the site, so lengths are
// comparable and nothing is exaggerated by a truncated axis. The top of the
// range stops short of the edge to leave room for the value label at the tip.
const x = scaleLinear().domain([0, 100]).range([0, 86]);
const BAR = 14;

export function BarList({ title, points, labels, sharedBase = null, note, withheldCount = 0 }: BarListProps) {
  const uid = useId();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = points.find((p) => p.id === selectedId) ?? null;
  const mixedBases = new Set(points.map((p) => p.base)).size > 1;

  return (
    <figure aria-labelledby={`${uid}-title`} className="space-y-5">
      <figcaption className="space-y-1">
        <p id={`${uid}-title`} className="font-sans text-ui font-semibold text-ink">
          {title}
        </p>
        {sharedBase ? (
          <p className="font-sans text-note text-graphite">
            Base: {sharedBase}
            {points[0]?.baseN ? ` (n=${points[0].baseN.toLocaleString("en-US")})` : null}
          </p>
        ) : null}
      </figcaption>

      <ul className="space-y-1">
        {points.map((p) => {
          const value = formatValue(p) ?? "";
          const pct = p.value ?? 0;
          const isSelected = p.id === selectedId;
          return (
            <li key={p.id} className="group relative">
              <button
                type="button"
                aria-pressed={isSelected}
                aria-label={`${labels[p.id] ?? p.claim}: ${value}${mixedBases ? `, ${p.base}` : ""}. Show details.`}
                onClick={() => setSelectedId(isSelected ? null : p.id)}
                className={`grid w-full cursor-pointer grid-cols-1 items-center gap-x-6 gap-y-1 rounded-sm px-2 py-2.5 text-left transition-colors sm:grid-cols-[minmax(0,15rem)_1fr] ${
                  isSelected ? "bg-paper-raised" : "hover:bg-paper-raised"
                }`}
              >
                <span className="font-sans text-ui leading-snug text-ink">
                  {labels[p.id] ?? p.claim}
                </span>
                <span className="block h-[22px]">
                  <svg width="100%" height="22" aria-hidden="true" className="overflow-visible">
                    <g>
                      <rect x="0" y="0" width="100%" height="22" fill="transparent" />
                      <rect
                        x="0"
                        y={(22 - BAR) / 2}
                        width={`${x(pct)}%`}
                        height={BAR}
                        rx="4"
                        className={isSelected ? "fill-ballpoint" : "fill-ink"}
                      />
                      {/* square the baseline end so only the data end is rounded */}
                      <rect
                        x="0"
                        y={(22 - BAR) / 2}
                        width={Math.min(4, pct)}
                        height={BAR}
                        className={isSelected ? "fill-ballpoint" : "fill-ink"}
                      />
                      <text
                        x={`${x(pct)}%`}
                        dx="8"
                        y="11"
                        dominantBaseline="central"
                        className="fill-ink font-sans text-[0.9375rem] font-semibold"
                      >
                        {value}
                      </text>
                    </g>
                  </svg>
                </span>
              </button>
              {/* Per-mark hover/focus tooltip with the full claim and its base. */}
              <span
                role="tooltip"
                className="pointer-events-none invisible absolute right-2 bottom-full z-10 mb-1 max-w-sm rounded-sm border border-rule bg-paper-raised px-3 py-2 font-sans text-note text-ink shadow-sm group-hover:visible group-focus-within:visible"
              >
                <strong className="font-semibold">{value}</strong> {p.claim}
                <span className="mt-1 block text-graphite">Base: {p.base}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {selected ? (
          <div className="space-y-3 border-l-2 border-ballpoint pl-5">
            <p className="text-body text-pretty">
              <strong className="font-semibold">{formatValue(selected)}</strong> {selected.claim}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <EvidenceChip strength={selected.evidenceStrength} />
              {selected.sourceOrganization && selected.source && selected.sourceUrl ? (
                <SourceAttribution
                  organization={selected.sourceOrganization}
                  title={selected.source}
                  publicationDate={selected.publicationDate}
                  url={selected.sourceUrl}
                />
              ) : null}
            </div>
            <EvidenceDetail key={selected.id} evidence={selected} />
          </div>
        ) : (
          <p className="font-sans text-note text-graphite">Select a bar to see the exact question, who answered and the source.</p>
        )}
      </div>

      {note ? <p className="font-sans text-note text-graphite">{note}</p> : null}
      {withheldCount > 0 ? (
        <p className="font-sans text-note text-graphite">
          {withheldCount === 1 ? "One related figure is" : `${withheldCount} related figures are`} withheld pending
          verification.
        </p>
      ) : null}

      <details className="font-sans text-note">
        <summary className="cursor-pointer text-ballpoint">Show as a table</summary>
        <table className="mt-3 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-rule text-graphite">
              <th scope="col" className="py-2 pr-4 font-semibold">Measure</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Value</th>
              <th scope="col" className="py-2 font-semibold">Base</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.id} className="border-b border-rule align-top">
                <th scope="row" className="py-2 pr-4 font-normal">{labels[p.id] ?? p.claim}</th>
                <td className="py-2 pr-4 tabular-nums">{formatValue(p)}</td>
                <td className="py-2 text-graphite">
                  {p.base}
                  {p.baseN ? ` (n=${p.baseN.toLocaleString("en-US")})` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
