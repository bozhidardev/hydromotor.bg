# Product Review — Mobile Hero Fix

**Reviewer:** Product-reviewer (subagent)
**Date:** 2026-05-21
**Status:** ✅ **PASS**

---

## Changes Reviewed

1. **Removed `dvh` from mobile hero** — No more laggy resizing when Safari address bar hides
2. **Removed forced `min-height` on mobile hero-inner** — Content determines height
3. **Tighter padding and font sizes on mobile** — CTAs should be fully visible

---

## Criteria Checks

### 1. Mobile hero feels clean and intentional (no laggy scaling on scroll)
**✅ PASS**

- `.hero` on mobile uses `min-height: auto` (no `vh`/`dvh` unit at all on mobile)
- Desktop retains `min-height: clamp(680px, 88vh, 860px)` — `vh` (not `dvh`), which is appropriate since desktop doesn't have the mobile address-bar-resize issue
- The only remaining `dvh` usage in the entire CSS is in `.mobile-menu` (`height: 100dvh`), which is **correct** — the slide-out menu needs to cover the full visible viewport including the area behind the Safari address bar
- Result: Scrolling on iPhone Safari no longer triggers a hero resize. The hero simply stays at its content height. No jank, no flash.

**Evidence:**
```
.hero { min-height: clamp(680px, 88vh, 860px); }         ← desktop, correct
@media (max-width: 767px) { .hero { min-height: auto; } }  ← mobile, correct
```

### 2. "24/7 СЕРВИЗ" button is fully visible (not cut off)
**✅ PASS**

- The button is inside `.hero-content > .hero-actions`, which is inside `.hero-inner`, which is inside `.hero` section
- Since `.hero` on mobile has `min-height: auto`, the entire section's height is determined by content — there's no fixed or min height that could clip the buttons
- On ≤480px, buttons stack vertically with `gap: 0.6rem`, each at full width — plenty of room
- Padding inside `.hero-inner` at mobile: `2rem 1.5rem 1.5rem` (≤767px) → `1.25rem 1rem 1.25rem` (≤480px) — the bottom padding ensures space below the buttons
- The hero-trust-bar sits below the CTAs in the DOM flow, pushing the section taller

### 3. "ХИДРОМОТОР" headline fits on screen
**✅ PASS**

- Font-size at ≤480px: `clamp(2rem, 8vw, 3rem)` — at 360px that's ~2.88rem (46px), at 320px it's 2rem (32px)
- At ≤767px but >480px: `clamp(2.5rem, 7vw, 4rem)` — proportional scaling
- `line-height: 1.05` prevents vertical clipping
- `word-break: break-word` is set as a safety net (base rule)
- 9 uppercase Cyrillic characters at 2rem (32px) fits comfortably even on 320px-wide screens

### 4. Trust bar is visible below hero content
**✅ PASS**

- `.hero-trust-bar` is a direct child of `.hero`, in the normal DOM flow after `.hero-inner`
- Because `.hero` has `min-height: auto` on mobile, the section wraps all its content including the trust bar
- On mobile ≤767px: trust bar shows 3 items in a 3-column grid
- On ≤480px: trust bar shows 2 items in a 2-column grid
- Items 4-5 hidden on ≤767px, item 3 also hidden on ≤480px — keeps it readable at small sizes
- Trust bar has its own `background: rgba(12, 12, 12, 0.95)` and gold bottom accent stripe — looks intentional

### 5. Black/gold identity preserved
**✅ PASS**

- Badge: gold border + transparent gold background ✓
- "строителството" highlight in `.hero-highlight`: `color: var(--color-primary)` ✓
- Primary CTA: gold background (`.btn-primary` uses `#f9c500`) ✓
- Trust bar: gold icons, gold bottom stripe ✓
- Dark background: `#0f0f0f` with grid overlay ✓
- Scroll indicator: gold-ish (inherits primary) ✓
- No changes to the color palette

### 6. Desktop not regressed
**✅ PASS**

- Desktop (≥768px) `.hero` uses `min-height: clamp(680px, 88vh, 860px)` — unchanged from previous commit
- Desktop `.hero-inner` has `padding-bottom: 4rem` — content vertically centered via `flex: 1`
- Trust bar on desktop: 5-column grid with no hidden items ✓
- Hero overlay with 105° gradient (dark left → transparent right) — unchanged ✓
- Scroll indicator visible on desktop — unchanged ✓
- All desktop hero animations/staggers — preserved ✓
- Build passes with 0 errors ✓
- No CSS rules targeting ≥768px were modified in this change

---

## Potential Concerns / Detailed Verifications

### No empty hero on mobile
The hero now has zero forced height. Its total height is: `padding-top (70px + safe-area)` + `hero-inner content` + `hero-trust-bar`. This produces a natural, content-driven hero that looks complete and intentional at all mobile sizes.

### No Safari address bar jank
By removing `dvh` from the hero, we avoid the resize-triggered recalc that Safari performs when the address bar hides/shows. The hero simply doesn't grow/shrink anymore — it stays at its content height. This is the right trade-off: a slightly shorter hero that scrolls smoothly vs. a full-viewport hero that jitters.

### The `dvh` in `.mobile-menu` is correct
The mobile slide-out menu uses `height: 100dvh` to cover the full visible area including the space behind the Safari toolbar. This is the **correct** use case for `dvh` — overlays/menus should cover the visual viewport. The hero, which is in-flow content, should not.

---

## Verdict

**✅ PASS**

All six criteria pass cleanly:

| Criteria | Result |
|----------|--------|
| No laggy mobile resize (dvh removed from hero) | ✅ |
| "24/7 СЕРВИЗ" fully visible | ✅ |
| "ХИДРОМОТОР" headline fits | ✅ |
| Trust bar visible below hero | ✅ |
| Black/gold identity preserved | ✅ |
| Desktop not regressed | ✅ |

Build: ✅ passes (0 errors, 59 modules, 822ms)

The mobile hero fix is minimal, targeted, and effective. Three CSS changes accomplish exactly what they set out to do:
1. `min-height: auto` on mobile hero — removes the janky dvh resize
2. `min-height: auto` on mobile hero-inner — lets content determine height
3. Tighter padding/font clamp values on mobile — keeps everything visible and intentional

No regressions on desktop, no broken interactions, no visible issues. Ship it.
