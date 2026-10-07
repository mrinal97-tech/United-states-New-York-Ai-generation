import registry from "@/data/source-registry.json";
import type { EvidenceStrength, ResearchSource } from "./types";

const STRENGTHS: EvidenceStrength[] = ["direct", "representative", "contextual", "limited", "evidence-gap"];
const REQUIRED: (keyof ResearchSource)[] = [
  "id",
  "title",
  "organization",
  "publicationDate",
  "population",
  "geography",
  "sourceUrl",
];

/** Validates the registry at build time; a broken registry fails the build. */
function load(): ResearchSource[] {
  const sources = registry.sources as ResearchSource[];
  const seen = new Set<string>();
  for (const s of sources) {
    for (const field of REQUIRED) {
      if (!s[field]) throw new Error(`Source ${s.id ?? "?"}: missing ${field}`);
    }
    if (seen.has(s.id)) throw new Error(`Duplicate source id: ${s.id}`);
    if (!STRENGTHS.includes(s.evidenceType)) throw new Error(`Source ${s.id}: unknown evidence class`);
    if (!s.limitations?.length) throw new Error(`Source ${s.id}: limitations must be recorded`);
    seen.add(s.id);
  }
  return sources;
}

export const sources: ResearchSource[] = load();

/** Date of the source audit, shown with every list of sources. */
export const auditDate: string = registry.auditDate;

export function getSource(id: string): ResearchSource {
  const source = sources.find((s) => s.id === id);
  if (!source) throw new Error(`Source not found: ${id}`);
  return source;
}
