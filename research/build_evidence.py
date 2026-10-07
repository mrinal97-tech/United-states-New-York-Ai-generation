"""Validate hand-entered evidence and build data/evidence.json.

Usage: python research/build_evidence.py
Exits non-zero if any validation error is found.
"""
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "data" / "source-registry.json"
EVIDENCE_IN = ROOT / "research" / "evidence.jsonl"
EVIDENCE_OUT = ROOT / "data" / "evidence.json"
REPORT_OUT = ROOT / "research" / "audit-report.txt"

STRENGTHS = {"direct", "representative", "contextual", "limited", "evidence-gap"}
VERIFICATION = {"verified-primary", "needs-check", "secondary-only", "audit-finding"}
UNITS = {"percent", "percent-relative", "count", "text"}
REQUIRED = ["id", "rq", "claim", "value", "unit", "base", "evidenceStrength", "verification", "caveats"]
SOURCE_REQUIRED = ["id", "title", "organization", "publicationDate", "population", "geography",
                   "evidenceType", "limitations", "sourceUrl"]
RQS = [f"RQ{i}" for i in range(1, 11)]


def load_evidence(path):
    rows = []
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if line.strip():
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as e:
                raise SystemExit(f"evidence.jsonl line {n}: invalid JSON ({e})")
    return rows


def validate(sources, rows):
    errors, warnings = [], []
    src_ids = [s.get("id") for s in sources]
    for sid, c in Counter(src_ids).items():
        if c > 1:
            errors.append(f"duplicate source id: {sid}")
    for s in sources:
        for f in SOURCE_REQUIRED:
            if s.get(f) in (None, "", []):
                errors.append(f"source {s.get('id')}: missing {f}")
        if s.get("sampleSize") is None and s.get("evidenceType") != "contextual":
            warnings.append(f"source {s['id']}: sampleSize is null")
    by_id = {s["id"]: s for s in sources}

    for eid, c in Counter(r.get("id") for r in rows).items():
        if c > 1:
            errors.append(f"duplicate evidence id: {eid}")
    for r in rows:
        rid = r.get("id", "<no id>")
        for f in REQUIRED:
            if f not in r:
                errors.append(f"{rid}: missing field {f}")
        if r.get("evidenceStrength") not in STRENGTHS:
            errors.append(f"{rid}: bad evidenceStrength {r.get('evidenceStrength')}")
        if r.get("verification") not in VERIFICATION:
            errors.append(f"{rid}: bad verification {r.get('verification')}")
        if r.get("unit") not in UNITS:
            errors.append(f"{rid}: bad unit {r.get('unit')}")
        for q in r.get("rq", []):
            if q not in RQS:
                errors.append(f"{rid}: unknown research question {q}")
        sid = r.get("sourceId")
        if sid is None:
            if r.get("evidenceStrength") != "evidence-gap":
                errors.append(f"{rid}: no sourceId but not marked evidence-gap (claim without citation)")
        elif sid not in by_id:
            errors.append(f"{rid}: sourceId {sid} not in registry")
        v = r.get("value")
        if r.get("unit") in ("percent", "percent-relative"):
            if not isinstance(v, (int, float)) or not 0 <= v <= 100:
                errors.append(f"{rid}: percent value out of range or missing: {v}")
        if r.get("unit") == "count" and (not isinstance(v, int) or v < 0):
            errors.append(f"{rid}: count must be a non-negative integer")
        if r.get("unit") == "text" and v is not None:
            errors.append(f"{rid}: text evidence must have value null")
        if r.get("evidenceStrength") != "evidence-gap" and not r.get("question"):
            errors.append(f"{rid}: no question/measurement recorded (claim without methodology)")
        if r.get("baseN") is not None and sid in by_id:
            n = by_id[sid].get("sampleSize")
            if isinstance(n, int) and r["baseN"] > n:
                errors.append(f"{rid}: baseN {r['baseN']} exceeds source sample size {n}")
        if r.get("verification") in ("needs-check", "secondary-only"):
            warnings.append(f"{rid}: {r['verification']} - do not display until confirmed")
        if r.get("compareWith") and r["compareWith"] not in {x.get("id") for x in rows}:
            errors.append(f"{rid}: compareWith points to unknown id {r['compareWith']}")

    used = {r.get("sourceId") for r in rows}
    for sid in by_id:
        if sid not in used:
            warnings.append(f"source {sid}: registered but no evidence points use it yet")
    return errors, warnings


def build(sources, rows):
    by_id = {s["id"]: s for s in sources}
    out = []
    for r in rows:
        s = by_id.get(r.get("sourceId"))
        item = dict(r)
        item.update({
            "source": s["title"] if s else None,
            "sourceOrganization": s["organization"] if s else None,
            "publicationDate": s["publicationDate"] if s else None,
            "population": s["population"] if s else None,
            "ageRange": s.get("ageRange") if s else None,
            "sampleSize": s.get("sampleSize") if s else None,
            "geography": s["geography"] if s else None,
            "methodology": s.get("samplingMethod") if s else None,
            "sourceUrl": s["sourceUrl"] if s else None,
            "displayable": r["verification"] in ("verified-primary", "audit-finding"),
        })
        out.append(item)
    return out


def coverage(rows):
    cov = defaultdict(Counter)
    for r in rows:
        for q in r["rq"]:
            cov[q][r["evidenceStrength"]] += 1
    lines = []
    for q in RQS:
        c = cov.get(q, Counter())
        lines.append(f"{q:5} " + ", ".join(f"{k}={v}" for k, v in sorted(c.items())) if c else f"{q:5} (no evidence points)")
    return lines


def main():
    registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    sources = registry["sources"]
    rows = load_evidence(EVIDENCE_IN)
    errors, warnings = validate(sources, rows)

    report = [f"Sources: {len(sources)}", f"Evidence points: {len(rows)}",
              f"Displayable: {sum(r['verification'] in ('verified-primary', 'audit-finding') for r in rows)}",
              "", "Coverage by research question:"] + coverage(rows) + \
             ["", f"Errors ({len(errors)}):"] + [f"  - {e}" for e in errors] + \
             ["", f"Warnings ({len(warnings)}):"] + [f"  - {w}" for w in warnings]
    REPORT_OUT.write_text("\n".join(report) + "\n", encoding="utf-8")
    print("\n".join(report))

    if errors:
        sys.exit(1)
    EVIDENCE_OUT.write_text(json.dumps({"generatedFrom": "research/evidence.jsonl",
                                        "evidence": build(sources, rows)}, indent=2) + "\n",
                            encoding="utf-8")
    print(f"\nWrote {EVIDENCE_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
