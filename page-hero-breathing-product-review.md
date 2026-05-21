# Product Review — Mobile page-hero Breathing Room

**Date:** 2026-05-21  
**Reviewer:** Product Reviewer  
**Status:** ✅ **PASS**

---

## Fix Summary

**Change:** Added 1rem (16px) extra breathing room between the fixed header and the page title on mobile inner pages.

**Commit:** `987d620` — `src/App.css:2039`

```css
/* Before */
padding: 3.5rem 0 2rem;

/* After */
padding: calc(70px + 1rem + var(--safe-top)) 0 2rem;
```

The old `3.5rem` (56px) was 14px short of the 70px fixed header, causing page titles to be hidden behind the nav bar on mobile. The fix clears the header by exactly 70px, adds 1rem intentional breathing room for a polished look, and accounts for safe-area insets.

---

## Verification Results

### ✅ 1. Page titles now have visible breathing room below the nav bar

The mobile rule now computes to **86px + safe-area inset** of clear space from the viewport top. The 70px clears the `.header-inner` (fixed height), and the extra 16px creates comfortable visual separation. The content (`h1` title + subtitle) is fully visible below the nav.

### ✅ 2. Desktop unaffected

The desktop rule (`@media` min-width 768px) at line 2007 remains untouched:

```css
.page-hero {
  padding: 5rem 0 3rem;
}
```

No desktop regression. Only the `@media (max-width: 767px)` block was modified.

### ✅ 3. Extra space looks intentional — gradient background handles it well

The `.page-hero` uses a full-width decorative gradient:

```css
background: linear-gradient(135deg, var(--color-bg-dark), var(--color-bg-dark-alt));
```

The padding area shows the gradient rather than whitespace, so the extra 1rem reads as a deliberate design choice rather than awkward spacing. A subtle gold accent line at the bottom (`::after` pseudo-element with `--color-primary`) reinforces the visual polish.

### ✅ 4. Black/gold identity intact

- No color values changed
- Gradient still uses `--color-bg-dark` / `--color-bg-dark-alt` (black/dark tones)
- Gold accent line (`--color-primary`) untouched
- Title/subtitle styling unchanged

### ✅ 5. Build passes cleanly

```
npm run build
✓ 60 modules transformed.
✓ built in 818ms
dist/index.html                   1.56 kB
dist/assets/index-CEAe-vLK.css   44.03 kB
dist/assets/index-BsiON8n3.js   211.37 kB
```

Zero errors, zero warnings.

---

## Additional Observations

| Aspect | Detail |
|--------|--------|
| `--safe-top` fallback | `env(safe-area-inset-top, 0px)` — falls back to `0px` on non-notch devices |
| Pages affected | All 6 inner pages using `.page-hero` (About, Services, Machines, MachineDetail, Contact, Downloads) |
| Scope of change | Single CSS value change in `src/App.css` — no JSX modifications |
| Consistency with homepage | Mirrors the `.hero` mobile approach, but adds 1rem for extra breathing room |

## Minor Note

The execution plan (`page-hero-padding-plan.md`) and technical review (`page-hero-padding-tech-review.md`) reference `calc(70px + var(--safe-top))` without the 1rem breathing room. The actually committed code includes the 1rem. This documentation drift is minor — the committed value is the better one for visual polish — but the docs could be updated to reflect the actual value.

**Recommendation:** Update `page-hero-padding-plan.md` and `page-hero-padding-tech-review.md` to match the committed value `calc(70px + 1rem + var(--safe-top))`.

---

## Verdict

| Criterion | Result |
|-----------|--------|
| Mobile breathing room visible | ✅ |
| Desktop unaffected | ✅ |
| Space looks intentional | ✅ |
| Black/gold identity intact | ✅ |
| Build passes | ✅ |

**Overall: ✅ PASS**

The fix is correct, self-contained, and produces a clean build. The 1rem breathing room is a nice touch that makes the mobile layout feel intentional rather than just barely clearing the header.
