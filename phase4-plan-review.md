# Phase 4 Plan Review — Brand/Assets/Content

**Reviewer:** Subagent  
**Date:** 2026-05-21  
**Status:** ✅ **APPROVED WITH REQUIRED AMENDMENTS**

---

## 4.1 Icons — ✅ Verified (with note)

| Check | Result | Evidence |
|---|---|---|
| `lucide-react` NOT installed? | ✅ Confirmed | `grep lucide package.json` → NOT FOUND |
| `IconHandshake` available? | ✅ Present | Icons.jsx line ~100 |
| `IconPackage` available? | ✅ Present | Icons.jsx line ~118 |
| `IconWrench` available? | ✅ Present | Icons.jsx line ~39 |
| `IconBuilding` (alternative) available? | ✅ Present | Icons.jsx line ~160 |
| `IconClock` needs creation | ⚠️ Does not exist | Not in Icons.jsx — must be added |

**Verdict:** Plan is accurate. All three target icons exist. `IconClock` needs to be created. The plan offers a reasonable alternative (`IconBuilding`). Recommend preferring `IconBuilding` to avoid creating a new SVG component unless the clock is explicitly desired — `IconBuilding` is cleaner, simpler, and already exists.

**Required amendment:** Add a concrete SVG path for `IconClock` (or recommend `IconBuilding` as primary, clock as optional).

---

## 4.2 Brand Logos — ✅ Verified

| Check | Result | Evidence |
|---|---|---|
| `putzmeister-p2.jpg` is a machine photo? | ✅ Yes | JPEG 400×284 px, 72 KB — same dimensions as machine photos `p4.jpg`, `p5.jpg`, `p6.jpg`. Not a logo. |
| Used elsewhere besides Machines.jsx? | ✅ Only in Machines.jsx | `grep -rn "putzmeister-p2" .` → exactly 1 source match (Machines.jsx:30) + 1 in dist build |
| Text-only approach consistent? | ✅ Yes | Putzmeister currently has a fake semi-logo; SANY has none. Removing the `<img>` makes both text-only — consistent and honest. |

**Verdict:** Plan's Option C (text-only for both brands, delete the file) is the right call. No dead code concerns.

---

## 4.3 LinkedIn URL — ✅ Verified (with honesty flag)

| Check | Result | Evidence |
|---|---|---|
| Currently hardcoded in Footer.jsx? | ✅ Yes | Footer.jsx line 75: `href="https://www.linkedin.com/company/hydromotor"` |
| NOT in content.js? | ✅ Confirmed | `CONTACT` object (content.js line 86–95) has `facebook` but no `linkedin` |
| Move to content.js → good refactoring? | ✅ Yes | Consistent with how Facebook is handled |
| Manual verification needed? | ✅ Honest about it | Plan documents HTTP 999 from curl — cannot auto-verify |

**Verdict:** Refactoring LinkedIn URL from hardcoded Footer.jsx → `CONTACT.linkedin` in content.js is clean and correct. Plan is transparent about manual verification requirement.

---

## 4.4 PDF Rename — ✅ Verified (with note about dist)

| Check | Result | Evidence |
|---|---|---|
| Cyrillic PDF exists? | ✅ Yes | `public/pdfs/МАЙ-МАШИНИ.pdf` (2,350,319 bytes) |
| Reference in Downloads.jsx? | ✅ Yes | Line 17: URL-encoded `/pdfs/%D0%9C%D0%90%D0%99-%D0%9C%D0%90%D0%A8%D0%98%D0%9D%D0%98.pdf` |
| Will renaming break existing bookmarks? | ⚠️ Expected | Any URL change breaks user bookmarks — unavoidable; new filename is clear |
| New filename clear? | ✅ Yes | `maj-mashini-2020.pdf` — ASCII-safe, descriptive, year-labeled |
| dist/pdfs/ has the same file? | ✅ Yes | `dist/pdfs/МАЙ-МАШИНИ.pdf` exists and must be renamed too |

**Verdict:** Clean rename. Plan mentions `dist/pdfs/` — confirmed it exists and should be updated. No issues.

---

## 4.5 M 38-5 Specs — ✅ Verified

| Check | Result | Evidence |
|---|---|---|
| M 38-5 has only 4 specs? | ✅ Confirmed | machines.js lines 18–23: vertical reach, arms, fold, pipeline |
| No source data available? | ✅ Confirmed | Plan searched codebase — no additional data files found |
| "Do not invent" guidance? | ✅ Correct | Plan explicitly says do not invent specs |
| Deferred approach? | ✅ Correct | Two honest paths: human provides specs, or PDF extraction |

**Verdict:** Plan correctly identifies the gap and refuses to invent data. Deferring is the only responsible choice.

---

## Safety Checks

| Check | Result |
|---|---|
| No content invented | ✅ Plan explicitly prohibits inventing specs |
| No fake specs | ✅ Section 4.5 defers to real source data |
| No broken links | ✅ LinkedIn URL verified as plausible; manual check flagged |
| No dead code | ✅ `putzmeister-p2.jpg` removal is clean — only 1 source reference |
| Existing downloads unaffected | ⚠️ PDF rename will break existing URLs but is unavoidable |

---

## Summary

| Section | Verdict |
|---|---|
| 4.1 Icons | ✅ APPROVED — provide concrete IconClock SVG or prefer IconBuilding |
| 4.2 Brand logos | ✅ APPROVED — text-only approach is correct |
| 4.3 LinkedIn URL | ✅ APPROVED — move to content.js, manual verification noted |
| 4.4 PDF rename | ✅ APPROVED — rename both `public/pdfs/` and `dist/pdfs/` |
| 4.5 M 38-5 specs | ✅ APPROVED — do not invent, defer |

## Final Verdict

### ✅ **APPROVED WITH REQUIRED AMENDMENTS**

**Required before execution:**
1. **4.1 Icons** — Add a concrete SVG path for `IconClock` in the plan, or explicitly switch the recommendation to use `IconBuilding` (already exists) as primary and relegate `IconClock` to optional. Currently the plan says "create IconClock" but provides no SVG — the implementer needs this to proceed.
2. **4.4 PDF rename** — Explicitly add `dist/pdfs/МАЙ-МАШИНИ.pdf` to the rename action items (plan mentions it in prose but the action items list only `public/pdfs/`).

These amendments are minor but necessary for unambiguous execution.

**All other sections are clean and safe to proceed as-is.**
