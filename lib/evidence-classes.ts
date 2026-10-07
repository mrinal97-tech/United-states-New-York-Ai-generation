import type { EvidenceStrength, VerificationStatus } from "./types";

export interface EvidenceClass {
  id: EvidenceStrength;
  label: string;
  /** What qualifies a claim for this class. */
  definition: string;
  /** What a reader can and cannot conclude from it. */
  reading: string;
}

/**
 * The five evidence classes. They are categories, not a ranking: the list
 * order is for reading only, and nothing in the UI maps a class to length,
 * size, position on a scale or a number.
 */
export const EVIDENCE_CLASSES: EvidenceClass[] = [
  {
    id: "direct",
    label: "Direct evidence",
    definition: "The people the claim is about answered the question themselves.",
    reading: "Describes what they report. Self-reports can differ from what people actually do.",
  },
  {
    id: "representative",
    label: "Representative",
    definition: "From a study whose sampling design supports estimates for its stated population.",
    reading: "Generalizes to that population only, within the study's margin of error.",
  },
  {
    id: "contextual",
    label: "Contextual",
    definition: "Relevant, but measures a different population, setting or outcome.",
    reading: "Useful for framing questions. It does not answer them for U.S. teens.",
  },
  {
    id: "limited",
    label: "Limited",
    definition: "Self-selected, small, non-representative or indirectly measured.",
    reading: "Shows what some respondents said. It cannot be generalized to a population.",
  },
  {
    id: "evidence-gap",
    label: "Evidence gap",
    definition: "No available evidence answers the question.",
    reading: "An open question, shown deliberately. Absence of evidence is not evidence of absence.",
  },
];

export const EVIDENCE_LABELS: Record<EvidenceStrength, string> = Object.fromEntries(
  EVIDENCE_CLASSES.map((c) => [c.id, c.label]),
) as Record<EvidenceStrength, string>;

export function getEvidenceClass(id: EvidenceStrength): EvidenceClass {
  const c = EVIDENCE_CLASSES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown evidence class: ${id}`);
  return c;
}

export const VERIFICATION_LABELS: Record<VerificationStatus, string> = {
  "verified-primary": "Checked against the original report or topline",
  "audit-finding": "Conclusion of this project's source audit",
  "needs-check": "Awaiting verification against the primary source",
  "secondary-only": "Reported by news coverage; verification pending",
};
