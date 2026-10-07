"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import { EVIDENCE_CLASSES } from "@/lib/evidence-classes";
import { formatFieldDates } from "@/lib/format";
import type { EvidenceStrength, ResearchSource } from "@/lib/types";

export type Geography = "us" | "nyc" | "non-us";
export type Topic = "AI use" | "Learning" | "Cognition" | "Policy";

export interface ExplorerSource extends ResearchSource {
  geo: Geography;
  topics: Topic[];
  evidenceCount: number;
}

const GEO_LABELS: Record<Geography | "all", string> = {
  all: "All places",
  us: "United States",
  nyc: "New York City",
  "non-us": "Outside the U.S.",
};
const TOPICS: Topic[] = ["AI use", "Learning", "Cognition", "Policy"];

function Field({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-ink">{term}</dt>
      <dd className="text-graphite">{children}</dd>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return items.length ? <>{items.join("; ")}</> : <>None</>;
}

export function SourceExplorer({ sources }: { sources: ExplorerSource[] }) {
  const [geo, setGeo] = useState<Geography | "all">("all");
  const [cls, setCls] = useState<EvidenceStrength | "all">("all");
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [representativeOnly, setRepresentativeOnly] = useState(false);

  const shown = useMemo(
    () =>
      sources.filter(
        (s) =>
          (geo === "all" || s.geo === geo) &&
          (cls === "all" || s.evidenceType === cls) &&
          (topic === "all" || s.topics.includes(topic)) &&
          (!representativeOnly || s.representative === true),
      ),
    [sources, geo, cls, topic, representativeOnly],
  );

  const selectClass =
    "rounded-sm border border-rule bg-paper-raised px-3 py-2 font-sans text-ui text-ink focus-visible:outline-2";

  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filter sources" className="flex flex-wrap items-end gap-x-5 gap-y-4 font-sans">
        <label className="flex flex-col gap-1 text-note text-graphite">
          Place
          <select className={selectClass} value={geo} onChange={(e) => setGeo(e.target.value as Geography | "all")}>
            {(Object.keys(GEO_LABELS) as (Geography | "all")[]).map((g) => (
              <option key={g} value={g}>
                {GEO_LABELS[g]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-note text-graphite">
          Evidence class
          <select className={selectClass} value={cls} onChange={(e) => setCls(e.target.value as EvidenceStrength | "all")}>
            <option value="all">All classes</option>
            {EVIDENCE_CLASSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-note text-graphite">
          Topic
          <select className={selectClass} value={topic} onChange={(e) => setTopic(e.target.value as Topic | "all")}>
            <option value="all">All topics</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 pb-2 text-ui text-ink">
          <input
            type="checkbox"
            checked={representativeOnly}
            onChange={(e) => setRepresentativeOnly(e.target.checked)}
            className="size-4 accent-[var(--ballpoint)]"
          />
          Representative samples only
        </label>
      </div>

      <p aria-live="polite" className="font-sans text-note text-graphite">
        Showing {shown.length} of {sources.length} sources
      </p>

      {shown.length ? (
        <ul className="divide-y divide-rule border-y border-rule">
          {shown.map((s) => (
            <li key={s.id} className="py-6">
              <details className="group">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <span className="max-w-[var(--spacing-measure)]">
                      <span className="block font-sans text-note text-graphite">
                        {s.organization.split(" (")[0]}, {s.publicationDate.slice(0, 4)}
                      </span>
                      <span className="mt-1 block text-h3 leading-snug font-medium text-pretty group-open:text-ballpoint">
                        {s.title}
                      </span>
                      <span className="mt-2 block font-sans text-note text-graphite">
                        {s.geography}
                        {s.sampleSize ? `. n=${s.sampleSize.toLocaleString("en-US")}` : ""}
                        {`. ${s.evidenceCount} evidence point${s.evidenceCount === 1 ? "" : "s"} on this site.`}
                      </span>
                    </span>
                    <EvidenceChip strength={s.evidenceType} />
                  </span>
                </summary>
                <dl className="mt-5 grid gap-x-10 gap-y-4 font-sans text-note sm:grid-cols-2">
                  <Field term="Population">{s.population}</Field>
                  <Field term="Age range">{s.ageRange}</Field>
                  {s.fieldDates ? <Field term="Fieldwork">{formatFieldDates(s.fieldDates)}</Field> : null}
                  <Field term="Sample size">
                    {s.sampleSize ? s.sampleSize.toLocaleString("en-US") : s.sampleSizeNote ?? "Not applicable"}
                  </Field>
                  <Field term="Method">{s.samplingMethod ?? "Not applicable"}</Field>
                  {s.marginOfError ? <Field term="Margin of error">{s.marginOfError}</Field> : null}
                  <Field term="Representative">
                    {s.representative === null ? "Not applicable" : s.representative ? "Yes" : "No"}
                    {s.representativeNote ? `. ${s.representativeNote}` : ""}
                  </Field>
                  <Field term="Respondent-level data public">
                    {s.publicMicrodataAvailable === true ? "Yes" : s.publicMicrodataAvailable === false ? "No" : "Unknown"}
                    {s.microdataNote ? `. ${s.microdataNote}` : ""}
                  </Field>
                  <Field term="AI-use variables">
                    <List items={s.aiUseVariables} />
                  </Field>
                  <Field term="Learning variables">
                    <List items={s.learningVariables} />
                  </Field>
                  <Field term="Cognition variables">
                    <List items={s.cognitionVariables} />
                  </Field>
                  <Field term="Research questions it informs">
                    <List items={s.answerableResearchQuestions} />
                  </Field>
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-ink">Limitations</dt>
                    <dd>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-graphite">
                        {s.limitations.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <a
                      href={s.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ui font-semibold"
                    >
                      Open the original source
                      <ExternalLink aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </dl>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-sm border border-dashed border-graphite px-5 py-4 font-sans text-ui text-ink">
          No sources match these filters. Clear a filter to see more.
        </p>
      )}
    </div>
  );
}
