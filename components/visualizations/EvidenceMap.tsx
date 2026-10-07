import { EvidenceChip } from "@/components/evidence/EvidenceChip";
import { STATUS_LABELS, researchQuestions } from "@/lib/research-questions";
import type { QuestionStatus } from "@/lib/types";

/** Shape per status, matching the solid-to-dashed motif. Categories, not scores. */
function StatusMark({ status }: { status: QuestionStatus }) {
  const common = { cx: 7, cy: 7, r: 5.5 };
  switch (status) {
    case "answerable":
      return <circle {...common} fill="currentColor" />;
    case "partially-answerable":
      return (
        <>
          <circle {...common} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 1.5 A5.5 5.5 0 0 0 7 12.5 Z" fill="currentColor" />
        </>
      );
    case "perception-only":
      return <circle {...common} fill="none" stroke="currentColor" strokeWidth="1.5" />;
    case "insufficient-evidence":
      return <circle {...common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.2 1.8" />;
  }
}

/** Every research question with what the evidence can support, from known to unknown. */
export function EvidenceMap() {
  return (
    <div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Research questions, how far the available evidence can answer each, and the most relevant evidence class
        </caption>
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-ink font-sans text-note text-graphite">
            <th scope="col" className="py-3 pr-6 font-semibold">Question</th>
            <th scope="col" className="py-3 pr-6 font-semibold">Can the evidence answer it?</th>
            <th scope="col" className="py-3 font-semibold">Best available evidence</th>
          </tr>
        </thead>
        <tbody>
          {researchQuestions.map((q) => (
            <tr
              key={q.id}
              className="grid gap-y-2 border-b border-rule py-5 md:table-row md:py-0"
            >
              <th scope="row" className="font-normal md:py-5 md:pr-6 md:align-top">
                <span className="block text-body text-pretty">{q.question}</span>
                <span className="mt-1 block font-sans text-note text-graphite text-pretty">{q.verdict}</span>
              </th>
              <td className="md:py-5 md:pr-6 md:align-top">
                <span className="inline-flex items-center gap-2 font-sans text-ui font-semibold whitespace-nowrap text-ink">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <StatusMark status={q.status} />
                  </svg>
                  {STATUS_LABELS[q.status]}
                </span>
              </td>
              <td className="md:py-5 md:align-top">
                <EvidenceChip strength={q.strongestEvidence} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
