# Phase 1 Plan Review — Quick Wins

**Reviewer:** Jarvis 🧠
**Date:** 2026-05-21
**Status:** ✅ **APPROVED**

---

## 1.1 — Favicon addition

| Check | Result |
|-------|--------|
| `public/images/favicon-32.png` exists | ✅ Yes (2,317 bytes) |
| `public/images/favicon-180.png` exists | ✅ Yes (42,220 bytes) |
| `%BASE_URL%` prefix consistent with existing OG tag | ✅ Yes — OG tag uses `%BASE_URL%images/og-image.jpg` (line 11), plan uses same pattern |
| Placement (after OG meta, before preconnect) | ✅ Correct — between line 12 (`robots`) and line 13 (`preconnect`) |
| No existing favicon link to conflict with | ✅ No existing favicon links in `<head>` |

**Verdict:** ✅ All claims verified. No conflicts.

---

## 1.2 — Dead `.trust-bar` CSS

| Check | Result |
|-------|--------|
| Block confirmed in `src/App.css` | ✅ Lines 572–653 |
| Plan's claimed range (571–658) | ~Close~ (off by 1 line at top, 5 lines at bottom — minor, doesn't affect correctness) |
| Any component uses bare `.trust-bar` class? | ❌ **No.** `grep -rn 'trust-bar' src/` only matches `.hero-trust-bar` (in Hero.jsx + App.css lines 2347+), which is a separate, live rule set |
| Is `.hero-trust-bar` safe from removal? | ✅ Yes — lines 2347–2651, far from the dead block |

**Blocks to remove (confirmed):**
- `.trust-bar` (base styles + `::after` scroll-fade)
- `.trust-bar-track` (+ `::-webkit-scrollbar`)
- `.trust-item`, `.trust-item-icon`, `.trust-item:hover`
- `@media` variants (768px, 767px)

**Verdict:** ✅ Truly dead code — TrustBar.jsx was removed earlier, CSS was overlooked. Safe to delete.

---

## 1.3 — Dead `.dark-grid-pattern` CSS

| Check | Result |
|-------|--------|
| Block confirmed in `src/App.css` | ✅ Lines 93–106 |
| Plan's claimed range (92–105) | ~Close~ (off by 1 line — minor) |
| Any component references `.dark-grid-pattern`? | ❌ **No.** Only self-references in App.css (lines 93, 97) |

**Verdict:** ✅ Never used in JSX. Safe to delete.

---

## 1.4 — TODO comments

| File | Line | Content | Type | Renders in DOM? |
|------|------|---------|------|-----------------|
| `Machines.jsx` | 7 | `// TODO: All machine images…` | JS comment (`//`) | ❌ No |
| `Machines.jsx` | 25 | `{/* TODO: Replace putzmeister-p2.jpg… */}` | JSX comment | ✅ **Yes** |
| `MachineDetail.jsx` | 7 | `// TODO: All machine images…` | JS comment (`//`) | ❌ No |
| `Services.jsx` | 57 | `{/* TODO: Replace service-workshop.jpg… */}` | JSX comment | ✅ **Yes** |
| `About.jsx` | 36 | `{/* TODO: Replace about-img-1.jpg… */}` | JSX comment | ✅ **Yes** |
| `About.jsx` | 43 | `{/* TODO: Replace about-img-2.jpg… */}` | JSX comment | ✅ **Yes** |

**Notes:**
- All 6 comments confirmed at specified lines.
- The 2 JS `//` comments are invisible in DOM but clutter source.
- The 4 `{/* … */}` JSX comments **do render as HTML comments** (`<!-- … -->`) in production — visible via "View Page Source". These are the priority cleanup.
- Plan correctly identifies all 6 and proposes deletion. The audit also suggested "at minimum convert to JS comments" — deletion is even cleaner.

**Verdict:** ✅ Safe to delete all 6. No functionality affected.

---

## 1.5 — Orphan images

All 11 files confirmed **unreferenced in `src/`**:

| File | Confirmed unreferenced? |
|------|------------------------|
| `public/images/about-yellow-bus.jpg` | ✅ |
| `public/images/autobetonpompi.jpg` | ✅ |
| `public/images/betonovozi.jpg` | ✅ |
| `public/images/cropped-logo_Hordomotor-192.png` | ✅ |
| `public/images/gdpr-logo.png` | ✅ |
| `public/images/hero-slide-1.jpg` | ✅ |
| `public/images/hero-slide-2.jpg` | ✅ |
| `public/images/hero-slide-bg.jpg` | ✅ |
| `public/images/news-sample.jpg` | ✅ |
| `public/images/putzmeister-p3.jpg` | ✅ |
| `public/images/putzmeister-p7.jpg` | ✅ |

**Verification method:** `grep -rl <filename> src/` — zero matches for all 11.
**Note:** Deleting `public/` files won't break the build — Vite copies `public/` as-is at build time and only referenced files matter.

**Verdict:** ✅ All 11 truly orphaned. Safe to delete.

---

## 1.6 — Canonical link

| Check | Result |
|-------|--------|
| Any existing canonical link? | ❌ No — no conflict |
| Placement "after title tag" | ✅ Valid. (Note: `<title>` is line 16, `</head>` is line 17 — the link goes between them on line 17) |
| URL `https://hydromotor.bg` appropriate? | ✅ Consistent with existing `og:url` meta tag |
| SEO conflict with existing tags? | ❌ No. `og:url` and canonical are complementary |

**Verdict:** ✅ No conflicts. Placement is valid.

---

## 7. Safety Analysis

| Item | Risk | Assessment |
|------|------|------------|
| 1.1 Favicon | None | Only adds `<link>` tags — no removal |
| 1.2 `.trust-bar` deletion | None | Dead CSS confirmed — zero JSX references to bare `.trust-bar` |
| 1.3 `.dark-grid-pattern` deletion | None | Dead CSS confirmed — zero JSX references |
| 1.4 TODO deletion | None | Comments only — no code logic affected |
| 1.5 Orphan deletion | None | Files unreferenced in `src/` — Vite won't bundle them anyway |
| 1.6 Canonical link | None | Only adds `<link>` tag — no conflict |

**Build risk:** ✅ Zero. No imports changed, no logic modified.
**Visual regression risk:** ✅ Zero. Dead CSS by definition has no visual impact.
**Live code removal risk:** ✅ Zero. All removals confirmed unused.

---

## 8. Scope Check

| Boundary | Status |
|----------|--------|
| Only Phase 1 Quick Wins | ✅ |
| No ContactForm changes except TODOs | ✅ — ContactForm untouched |
| No structural/architectural changes | ✅ — Only CSS/HTML/image/comment cleanup |
| All items independent (as claimed) | ✅ — No execution ordering dependency |

**Verdict:** ✅ Strictly within Phase 1 scope.

---

## Minor Observations (Not Blocking)

1. **Line number inaccuracies in plan description** (cosmetic — won't affect execution):
   - `.trust-bar` block: Plan says 571–658, actual is 572–653 (off by ~1–5 lines)
   - `.dark-grid-pattern` block: Plan says 92–105, actual is 93–106 (off by 1 line)
   - Title tag: Plan says "line 17", actual is line 16 (`</head>` is line 17)

2. **`%BASE_URL%` resolves to `/hydromotor.bg/`** (Vite config `base`). The favicon path `%BASE_URL%images/favicon-32.png` → `/hydromotor.bg/images/favicon-32.png` — correct, confirmed via `vite.config.js` and `src/data/assets.js`.

---

## Final Verdict

**✅ APPROVED**

The plan accurately describes 6 independent quick-win tasks. All factual claims about source files have been verified. All items are safe to execute with zero risk of build breakage or visual regression. The plan stays within Phase 1 scope.

Proceed with execution in the suggested order.
