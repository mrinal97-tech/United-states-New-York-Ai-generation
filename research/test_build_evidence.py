"""Tests for the evidence validator. Run: python -m pytest research/ (or python research/test_build_evidence.py)."""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("be", Path(__file__).with_name("build_evidence.py"))
be = importlib.util.module_from_spec(spec)
spec.loader.exec_module(be)

SOURCE = {"id": "s1", "title": "t", "organization": "o", "publicationDate": "2026", "population": "p",
          "geography": "US", "evidenceType": "representative", "limitations": ["x"], "sourceUrl": "u",
          "sampleSize": 100}


def row(**kw):
    r = {"id": "e1", "sourceId": "s1", "rq": ["RQ1"], "claim": "c", "value": 50, "unit": "percent",
         "base": "b", "baseN": 100, "question": "q", "evidenceStrength": "representative",
         "verification": "verified-primary", "caveats": []}
    r.update(kw)
    return r


def errs(rows):
    return be.validate([SOURCE], rows)[0]


def test_valid_row_passes():
    assert errs([row()]) == []


def test_percent_out_of_range():
    assert any("out of range" in e for e in errs([row(value=104)]))


def test_duplicate_ids():
    assert any("duplicate evidence id" in e for e in errs([row(), row()]))


def test_uncited_claim_rejected():
    assert any("without citation" in e for e in errs([row(sourceId=None)]))


def test_gap_without_source_allowed():
    assert errs([row(sourceId=None, evidenceStrength="evidence-gap", value=None, unit="text")]) == []


def test_missing_methodology_rejected():
    assert any("without methodology" in e for e in errs([row(question="")]))


def test_baseN_cannot_exceed_sample():
    assert any("exceeds" in e for e in errs([row(baseN=500)]))


def test_unknown_source_rejected():
    assert any("not in registry" in e for e in errs([row(sourceId="nope")]))


def test_real_data_has_no_errors():
    import json
    reg = json.loads(be.REGISTRY.read_text())["sources"]
    assert be.validate(reg, be.load_evidence(be.EVIDENCE_IN))[0] == []


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn()
            print("ok", name)
