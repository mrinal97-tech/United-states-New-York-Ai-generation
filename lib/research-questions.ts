import data from "@/data/research-questions.json";
import type { EvidenceStrength, QuestionStatus, ResearchQuestion, ResearchQuestionId } from "./types";

const IDS: ResearchQuestionId[] = ["RQ1", "RQ2", "RQ3", "RQ4", "RQ5", "RQ6", "RQ7", "RQ8", "RQ9", "RQ10"];
const STATUSES: QuestionStatus[] = ["answerable", "partially-answerable", "perception-only", "insufficient-evidence"];
const STRENGTHS: EvidenceStrength[] = ["direct", "representative", "contextual", "limited", "evidence-gap"];

/** Validates at build time so a malformed file fails the build instead of rendering. */
function load(): ResearchQuestion[] {
  const questions = data.questions as ResearchQuestion[];
  const seen = new Set<string>();
  for (const q of questions) {
    if (!IDS.includes(q.id)) throw new Error(`Unknown research question id: ${q.id}`);
    if (seen.has(q.id)) throw new Error(`Duplicate research question: ${q.id}`);
    if (!STATUSES.includes(q.status)) throw new Error(`${q.id}: unknown status ${q.status}`);
    if (!STRENGTHS.includes(q.strongestEvidence)) throw new Error(`${q.id}: unknown evidence class`);
    if (!q.question || !q.verdict) throw new Error(`${q.id}: question and verdict are required`);
    seen.add(q.id);
  }
  return questions;
}

export const researchQuestions: ResearchQuestion[] = load();

export function getResearchQuestion(id: ResearchQuestionId): ResearchQuestion {
  const q = researchQuestions.find((x) => x.id === id);
  if (!q) throw new Error(`Research question not found: ${id}`);
  return q;
}

/** Reader-facing wording for each status. */
export const STATUS_LABELS: Record<QuestionStatus, string> = {
  answerable: "Answerable",
  "partially-answerable": "Partly answerable",
  "perception-only": "Perceptions only",
  "insufficient-evidence": "Insufficient evidence",
};
