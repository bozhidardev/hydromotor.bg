# Plan Review — Mobile Optimization

**Reviewer:** Plan Reviewer (Phase 3)  
**Date:** 2026-05-21  
**Status:** APPROVED WITH REQUIRED AMENDMENTS ✅

---

## Criteria-by-Criteria Assessment

### 1. iPhone Safari Top Gap ✅
Fully addressed in **Fix 1** (Showstopper).
- Root cause identified: semi-transparent `rgba(15,15,15,0.8)` header bleeding light body background through notch area.
- Fix: `html { background-color: #0f0f0f }` + fully opaque `#0f0f0f` header.
- Keeps `backdrop-filter: blur(10px)` for content blur without transparency bleed.
- No half-measures. Acceptable.

### 2. Hero Cut Off ✅
Fully addressed in **Fix 2** (Showstopper).
- Root cause correctly identified: `padding-top: 70px` vs actual header height ~114px (70px + safe area).
- Fix: `padding-top: calc(70px + var(--safe-top))`.
- Uses `100dvh` with `100vh` fallback — covers both modern and legacy iOS Safari.
- Also fixes `hero-inner` mobile `60dvh`. Thorough.

### 3. Mobile Navigation Menu ✅
Addressed in **Fix 5** (P2) with 6 sub-fixes:
- Close button (essential — missing in current code)
- Full-width on smaller screens (`width: min(100vw, 380px)`)
- Staggered link entrance animation
- iOS body scroll lock fix (position:fixed pattern)
- Prominent phone CTA pushed to bottom
- Menu top offset correction (`top: 0` + proper padding)
This is a meaningful improvement, not a token gesture.

### 4. Desktop Preservation ✅
The plan is explicit about desktop-first architecture (**D5**):
- All mobile changes wrapped in `@media (max-width: 767px)`.
- Mobile-only components hidden with `display: none` on desktop.
- No desktop CSS variables, layout classes, or behavior touched.
- Desktop in regression tests section.
No risk.

### 5. Routing/Build Preservation ✅
- Zero changes to routing, Vite config, package.json, or `main.jsx`.
- Only components and CSS affected.
- Build verification is the final step in the plan.
Low-risk, easily reversible.

### 6. Avoid Overengineering ✅
Good restraint:
- CSS-only fixes where possible (P0, P7, P8).
- Uses existing `IconArrowUp` — nothing unnecessary created.
- Text "✕" instead of a new icon component for close button.
- IntersectionObserver for CTA — appropriate, not overkill.
- Staggered animations are CSS-only (no JS animation lib).
Fix 6 (scroll shadow) and Fix 7 (overlay tuning) are borderline nice-to-haves but low-effort, so acceptable.

### 7. Mobile Testing ✅
Comprehensive testing section:
- Device matrix (iPhone 14/15 Pro, SE, X, Android Chrome).
- Desktop regression (Chrome + Firefox).
- Per-priority test cases covering every fix.
- Console and build checks.
Thorough enough for a maintenance plan.

### 8. Safe-Area/Viewport Unit Handling ✅
Covered throughout:
- Fix 1: `html` background as dark backdrop for notch.
- Fix 2: `100dvh`/`100vh` pattern + `var(--safe-top)` for hero padding.
- Fix 3: `env(safe-area-inset-bottom)` on mobile CTA bar.
- Fix 4: Back-to-top bottom offset accounts for CTA bar + safe area.
- Fix 5: Menu `padding-top` accounts for header + safe area.
No gaps.

### 9. Back-to-Top and CTA Behavior ✅
Both P1 features:
- **Mobile CTA bar** (Fix 3): Appears on scroll past hero via IntersectionObserver, always visible on non-hero pages, respects safe area, slides in with animation.
- **Back-to-top** (Fix 4): Scroll threshold, smooth scroll, 44×44px tappable target, safe-area-aware positioning, uses existing icon.
CTA visibility edge case (no hero on inner pages) explicitly identified and fixed.

### 10. Avoid Unnecessary Dependencies ✅
**Zero new npm packages.**
- No React Spring, Framer Motion, or animation libs.
- No new CSS preprocessor or PostCSS plugins.
- No utility libraries.
- Everything uses browser APIs (IntersectionObserver, scroll events, CSS transitions/animations).
Gold star here.

---

## Overall Verdict

**APPROVED WITH REQUIRED AMENDMENTS**

The plan is structurally sound, correctly prioritizes the two showstopper bugs (top gap, hero cutoff), and adds meaningful mobile improvements without overengineering or risking desktop.

---

## Required Amendments (must be addressed before implementation)

### A1. Fix 6 — Logo sizing contradiction
The heading says "logo sizing" with the stated goal being "may be too small for legibility" — but the fix reduces logo from 46px to **38px**. This directly contradicts the stated intent.

**Required:** Clarify intent. Either:
- Keep logo at 46px on mobile (no change needed), or
- Rationalize why smaller is actually better (e.g., "prevents overflow on narrow screens"), and update the description to match.

If no overflow issue exists, just remove this reduction — the logo at 46px is fine.

### A2. Explicit touch target minimums
The plan adds the BackToTop button at 44×44px (meets WCAG minimum), but doesn't call out touch targets for:
- Mobile CTA bar buttons (should be ≥44px tall)
- Mobile menu nav links (should have ≥44px tap area)
- Close button (needs ≥44×44px hit area)

**Required:** Add a brief note in Fix 3, Fix 5, or the testing section that all interactive mobile elements must meet 44×44px minimum touch target. This is a one-liner, not a rewrite.

### A3. Testing: Add tablet/Safari
The testing matrix covers phones and desktop but omits iPad Safari (which also has safe areas, viewport units, and can show the same notch issues on newer iPads).

**Required:** Add iPad Safari to the device matrix. Doesn't need iPad-specific test cases — the existing iPhone ones cover the same rendering concerns.

---

## Minor Observations (not required, nice-to-fix)

### M1. CSS sibling selector note in Fix 4
The plan correctly identifies that `.mobile-cta-bar.visible ~ .back-to-top` won't work due to DOM structure, and provides a simpler calc-based alternative. This self-correction is good. Consider adding a CSS custom property approach for future-proofing (e.g., `--cta-bar-height: 0px` updated via JS), but the calc approach is fine for now.

### M2. Performance consideration
The plan doesn't mention that scroll listeners (Fix 4, Fix 6) use `{ passive: true }` — it actually does show this in the code. Already correct. No action needed.

### M3. Hero responsive image (Fix 7)
Marked as P3 and conditional ("requires creating mobile-optimized image"). Fine as a stretch goal. No change needed.

---

## Summary

| Criterion | Status |
|---|---|
| 1. iPhone Safari top gap | ✅ Fixed (Fix 1) |
| 2. Hero cutoff | ✅ Fixed (Fix 2) |
| 3. Mobile nav improvement | ✅ Fixed (Fix 5) |
| 4. Desktop preservation | ✅ Desktop-first approach |
| 5. Routing/build | ✅ No changes |
| 6. Avoid overengineering | ✅ Minimal, focused |
| 7. Mobile testing | ✅ Comprehensive |
| 8. Safe-area/viewport | ✅ Covered everywhere |
| 9. Back-to-top + CTA | ✅ Both P1 |
| 10. Avoid dependencies | ✅ Zero new packages |

**3 required amendments.** Each is small — no restructuring needed. Once applied, the plan is ready for implementation.
