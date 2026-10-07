import type { EvidenceStrength } from "./types";

/**
 * Reader-facing names for each evidence class. These are categories, not an
 * ordered scale: nothing in the UI may encode them as length, size or score.
 * Full definitions arrive with the classification work in Commit 09.
 */
export const EVIDENCE_LABELS: Record<EvidenceStrength, string> = {
  direct: "Direct evidence",
  representative: "Representative",
  contextual: "Contextual",
  limited: "Limited",
  "evidence-gap": "Evidence gap",
};
