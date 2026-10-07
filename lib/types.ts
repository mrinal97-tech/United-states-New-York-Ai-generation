/**
 * Shared research types.
 *
 * These mirror the Phase 1 schema in `data/source-registry.json` and the
 * evidence model built by `research/build_evidence.py`. Field names must stay
 * in sync with those files; components import types from here only.
 */

/** Evidence classification. A category, never a score. */
export type EvidenceStrength =
  | "direct"
  | "representative"
  | "contextual"
  | "limited"
  | "evidence-gap";

/**
 * How a value was checked during the source audit.
 * Only "verified-primary" and "audit-finding" may be shown to readers.
 */
export type VerificationStatus =
  | "verified-primary"
  | "needs-check"
  | "secondary-only"
  | "audit-finding";

/**
 * "percent" is a share of the stated base.
 * "percent-relative" is a relative change (e.g. 17% lower), not a share of people.
 */
export type EvidenceUnit = "percent" | "percent-relative" | "count" | "text";

export type ResearchQuestionId =
  | "RQ1"
  | "RQ2"
  | "RQ3"
  | "RQ4"
  | "RQ5"
  | "RQ6"
  | "RQ7"
  | "RQ8"
  | "RQ9"
  | "RQ10";

/**
 * A caveat is one plain-language sentence stored with the evidence it
 * qualifies. Kept as a string so the evidence files remain the single
 * source of truth for wording.
 */
export type Caveat = string;

export interface EvidencePoint {
  id: string;
  /** null only for evidence-gap entries. */
  sourceId: string | null;
  rq: ResearchQuestionId[];
  /** Sentence fragment that follows the value, written with its base preserved. */
  claim: string;
  value: number | null;
  unit: EvidenceUnit;
  /** Who answered. Must be shown with the value whenever it is not all teens. */
  base: string;
  baseN: number | null;
  /** Exact question wording or measurement. */
  question: string;
  evidenceStrength: EvidenceStrength;
  verification: VerificationStatus;
  caveats: Caveat[];
  /** Another evidence point measured on the same base, for within-study comparison only. */
  compareWith?: string;

  // Joined from the source registry by the build pipeline.
  source: string | null;
  sourceOrganization: string | null;
  publicationDate: string | null;
  population: string | null;
  ageRange: string | null;
  sampleSize: number | null;
  geography: string | null;
  methodology: string | null;
  sourceUrl: string | null;
  /** True only when verification allows display. Components must respect it. */
  displayable: boolean;
}

export interface ResearchSource {
  id: string;
  title: string;
  organization: string;
  publicationDate: string;
  fieldDates?: string;
  population: string;
  ageRange: string;
  sampleSize: number | null;
  sampleSizeNote?: string;
  subgroupSampleSizes?: Record<string, number>;
  geography: string;
  samplingMethod: string | null;
  marginOfError?: string;
  representative: boolean | null;
  representativeNote?: string;
  aiUseVariables: string[];
  learningVariables: string[];
  cognitionVariables: string[];
  decisionMakingVariables: string[];
  aiLiteracyVariables?: string[];
  demographicBreakdowns?: string[];
  respondentLevelData: boolean | "unknown";
  publicMicrodataAvailable: boolean | "unknown";
  microdataNote?: string;
  evidenceType: EvidenceStrength;
  answerableResearchQuestions: ResearchQuestionId[];
  limitations: Caveat[];
  sourceUrl: string;
  reportUrl?: string;
  toplineUrl?: string;
  additionalUrls?: string[];
  doi?: string;
  license?: string;
}

/** How far the available evidence can answer a research question. */
export type QuestionStatus =
  | "answerable"
  | "partially-answerable"
  | "perception-only"
  | "insufficient-evidence";

export interface ResearchQuestion {
  id: ResearchQuestionId;
  question: string;
  status: QuestionStatus;
  /** Plain-language summary of what the evidence can and cannot support. */
  verdict: string;
  /** The most relevant evidence class available for this question (a category, not a score). */
  strongestEvidence: EvidenceStrength;
}

/**
 * Input for a visualization. Charts receive evidence by id and resolve
 * values from the evidence file, so no number can enter a chart without a
 * traceable source.
 */
export interface VisualizationData {
  id: string;
  /** The question the chart answers. */
  question: string;
  evidenceIds: string[];
  /** All evidence in one chart must share a base unless comparison is explicitly allowed. */
  sharedBase: string | null;
  /** Shown beside the chart when measures differ or a misreading is likely. */
  readingNote?: string;
}
