# Visual Fix Plan — Review

**Reviewer:** Jarvis (subagent)  
**Plan:** `visual-fix-plan.md`  
**Audit Review:** `visual-audit-review.md`  
**Date:** 2026-05-21

---

## 1. 🔴 Critical Issues — Coverage

The audit review confirms **3 critical (🔴) issues**:

| # | Critical Issue | Plan Item | Status |
|---|---------------|-----------|--------|
| 1 | Missing `og-image.jpg` — social preview broken | **#1** (P0) | ✅ Fixed |
| 2 | Contact form dead `alert()` — site looks broken | **#5** (P1) | ✅ Fixed |
| 3 | "Правна информация" footer link → 404 (`/pravna-informacia` no route) | **—** | ❌ **MISSING** |

**The plan misses 1 of 3 critical issues.** The broken "Правна информация" footer link is confirmed by the audit review as 🔴 — it navigates to `/pravna-informacia` which has no matching route in `App.jsx`. This is a 404 that users will actually hit. The plan must address this.

---

## 2. 🟡 Notable Issues — Coverage

The plan addresses approximately **12-14 🟡 issues** including:
- Hero CTA undersized on mobile (#2)
- Missing phone CTA in mobile nav (#3)
- Trust bar font size below readability (#4)
- Dead `TrustBar.jsx` component (#6)
- Dead `--color-overlay` CSS token (#7)
- Duplicate page-hero CSS (#8)
- Duplicate contact forms (#9)
- Body font-weight 450 not in loaded fonts (#10)
- h2 clamp duplication between index.css and App.css (#11)
- No `:active` state on buttons (#12)
- No `prefers-reduced-motion` (#13)
- No `loading="lazy"` on images (#14)

This is a reasonable scope. Not every 🟡 issue needs fixing — the plan prioritizes usability, code quality, and polish hits appropriately. Items like "CTAs compete for attention", "spacing class inconsistency", or "two similar light backgrounds" are subjective/subtle and correctly deprioritized.

**Verdict:** ✅ Adequate coverage of 🟡 issues for a focused fix plan.

---

## 3. Overengineering Check

Every plan item is proportionate:

| Item | Assessment |
|------|-----------|
| #1 OG image | Simple file creation. Appropriate. |
| #2 Hero CTA font | One CSS value change. ✓ |
| #3 Phone in mobile nav | HTML addition, reuses existing CSS. ✓ |
| #4 Trust bar font | Two CSS value changes. ✓ |
| #5 Contact form alert | Uses React state for inline message. Minimal, standard. ✓ |
| #6 Dead code removal | Delete a file. ✓ |
| #7 Dead token removal | Remove one CSS line. ✓ |
| #8 Duplicate CSS removal | Delete CSS blocks. ✓ |
| #9 Contact form consolidation | Extract shared component from 2 duplicates. Standard React practice, not overengineering. ✓ |
| #10 Font-weight 450→500 | One CSS value change. ✓ |
| #11 h2 clamp dedup | One CSS rule removal. ✓ |
| #12 :active state | Two-line CSS addition. ✓ |
| #13 prefers-reduced-motion | One CSS media query block. ✓ |
| #14 lazy loading | Add HTML attribute to 4 files. ✓ |

No new npm dependencies. No new libraries. No architectural bloat.

**Verdict:** ✅ No overengineering.

---

## 4. Brand Identity (Black/Gold)

- #1 OG image: Specifies `#0f0f0f` dark + `#f9c500` gold accent — matches brand identity exactly. ✓
- #3 Mobile nav phone: Gold/emergency-red accent bar — consistent. ✓
- All other items preserve existing color and styling. ✓

**Verdict:** ✅ Black/gold identity preserved.

---

## 5. Desktop Preservation

- #2: Changes only `@media (min-width: 360px)`. Desktop `0.82rem` unchanged. ✓
- #3: Adds to mobile navbar only. Desktop header already has `.header-phone-desktop`. ✓
- #4: Changes only `@media (max-width: 480px)`. ✓
- #5–14: CSS cleanup, dead code removal, lazy loading — no desktop layout impact. ✓

**Verdict:** ✅ Desktop layout preserved.

---

## 6. Content Invention

Plan introduces no fabricated or speculative content:
- #1 OG image: uses actual brand name ("Хидромотор") and real tagline ("Официален представител на Putzmeister"). ✓
- #3: Uses real phone number from the site. ✓
- #5: Uses the existing message text but in a friendlier format. ✓
- All other items are code/CSS changes with zero content. ✓

**Verdict:** ✅ No content invented.

---

## 7. Unnecessary Dependencies

Zero new dependencies. All fixes use:
- HTML attributes (`loading="lazy"`)
- CSS standard features (`@media`, `:active`, `scale()`)
- React built-in (`useState`)
- No npm packages, no CDN scripts, no build tools.

**Verdict:** ✅ No unnecessary dependencies.

---

## 8. Implementation Order

Recommended order in plan:
1. **P0:** OG image (highest impact, unblocks social sharing)
2. **P1:** Usability fixes (contact form, CTA sizes, trust bar, mobile phone)
3. **P2:** Code cleanup (dead code, CSS consolidation, forms)
4. **P3:** Polish (active states, reduced motion, lazy loading)

Each step is independent and can be parallelized. Sensible priority ordering — critical fixes first, cleanup later.

**Verdict:** ✅ Order is logical and well-prioritized.

---

## Overall Assessment

| Criterion | Verdict |
|-----------|---------|
| Fixes all 🔴 critical issues? | **❌ No — misses "Правна информация" broken route** |
| Fixes notable 🟡 issues? | ✅ Good coverage for a focused plan |
| Avoids overengineering? | ✅ Clean, proportionate fixes |
| Keeps black/gold identity? | ✅ |
| Preserves desktop? | ✅ |
| Avoids inventing content? | ✅ |
| No unnecessary dependencies? | ✅ |
| Sensible implementation order? | ✅ |

---

## Required Amendment

Add a plan item to fix the **broken "Правна информация" footer link** (🔴 critical):

> **Problem:** `Footer.jsx` has `<a href="/pravna-informacia">Правна информация</a>` but no matching route exists in `App.jsx`. Navigation produces a 404.
>
> **Fix (choose one):**
> - **Option A:** Create a basic legal-info page component + route in `App.jsx` (if content exists), OR
> - **Option B:** Remove or comment out the link (if no legal page is planned), OR
> - **Option C:** Make the link point to an external PDF or file if one exists.
>
> **Files affected:** `src/App.jsx` (add route) and/or `src/components/Footer.jsx` (fix/remove link).
> **Risks:** Low.

---

## ═══════════════════════════════════════════
## FINAL VERDICT: APPROVED WITH REQUIRED AMENDMENTS
## ═══════════════════════════════════════════

The plan is well-structured, avoids overengineering, respects brand identity, and addresses most issues proportionately. **However, it must be amended to fix the 🔴 "Правна информация" broken footer link before execution begins.**

Once amended, the plan is ready for execution.
