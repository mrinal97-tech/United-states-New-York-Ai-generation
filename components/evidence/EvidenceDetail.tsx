import { VERIFICATION_LABELS, getEvidenceClass } from "@/lib/evidence-classes";
import type { EvidencePoint } from "@/lib/types";

interface EvidenceDetailProps {
  evidence: EvidencePoint;
  /** Summary text of the disclosure. */
  label?: string;
}

/**
 * Native disclosure with everything needed to check a figure: exact
 * question, respondent base, population, method, caveats and verification.
 */
export function EvidenceDetail({ evidence, label = "How this was measured" }: EvidenceDetailProps) {
  const cls = getEvidenceClass(evidence.evidenceStrength);
  const rows: [string, string | null][] = [
    ["Question or measure", evidence.question !== "n/a" ? evidence.question : null],
    [
      "Who answered",
      evidence.base !== "n/a"
        ? `${evidence.base}${evidence.baseN !== null ? ` (n=${evidence.baseN.toLocaleString("en-US")})` : ""}`
        : null,
    ],
    ["Study population", evidence.population],
    ["Method", evidence.methodology],
    ["Evidence class", `${cls.label}. ${cls.reading}`],
    ["Verification", VERIFICATION_LABELS[evidence.verification]],
  ];

  return (
    <details className="group font-sans text-note">
      <summary className="cursor-pointer list-none text-ballpoint underline decoration-1 underline-offset-[0.18em] hover:decoration-2 [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="mr-1 inline-block transition-transform group-open:rotate-90">
          ›
        </span>
        {label}
      </summary>
      <dl className="mt-3 space-y-3 border-l border-rule pl-4">
        {rows
          .filter((row): row is [string, string] => Boolean(row[1]))
          .map(([term, value]) => (
            <div key={term}>
              <dt className="font-semibold text-ink">{term}</dt>
              <dd className="text-graphite">{value}</dd>
            </div>
          ))}
        {evidence.caveats.length ? (
          <div>
            <dt className="font-semibold text-ink">Caveats</dt>
            <dd>
              <ul className="list-disc space-y-1 pl-4 text-graphite">
                {evidence.caveats.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </details>
  );
}
