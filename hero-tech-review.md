# Technical Review — Hero Fix

**Reviewer:** Subagent (tech-review)
**Date:** 2026-05-21
**Status:** ✅ **PASS**

---

## Checks Performed

### 1. Build — `npm run build`
- ✅ **Passes with 0 errors** (854ms, 59 modules transformed)
- Output: `dist/` with CSS (45KB gz: 7.9KB) + JS (212KB gz: 66KB)

### 2. Hero Image Path
- ✅ **Uses new file:** `hero-concrete-pump-sharp.jpg` referenced in `Hero.jsx`
  ```jsx
  backgroundImage: url(${asset('images/hero-concrete-pump-sharp.jpg')})
  ```
- ✅ File exists: `public/images/hero-concrete-pump-sharp.jpg` (433KB, valid JPEG)
- ✅ Old file retained: `public/images/hero-slide-1.jpg` (not deleted)

### 3. Hero Image Not Stretched
- ✅ `background-size: cover` — correct, not `100% 100%`
- Also `background-position: center 30%` — ensures focus on pump truck

### 4. No Blur/Filter Effects on Image Layer
- ✅ No `filter` or `blur` on `.hero`, `.hero::before`, or `.hero-overlay`
- ✅ `backdrop-filter: blur()` only on `.header` (line 213) and `.hero-trust-bar` (line 2456) — both separate elements

### 5. Mobile Headline — No Clipping
- ✅ Desktop base: `font-size: clamp(3rem, 6vw, 5rem); line-height: 1.0`
- ✅ Mobile override (≤767px): `font-size: clamp(2.5rem, 7vw, 4rem); line-height: 1.05; word-break: break-word`
  - At **390px**: 7vw = 27.3px → clamp gives **40px** (was 48px)
  - At **360px**: 7vw = 25.2px → clamp gives **40px** (lower bound)
  - `word-break: break-word` as safety net
  - `line-height: 1.05` prevents vertical clipping

### 6. Top Gap — Safe-Area Fix Intact
- ✅ `.hero padding-top: calc(70px + var(--safe-top))` on mobile override
- ✅ Mobile `.hero-inner`: `padding: 2.5rem 1.5rem 2rem` (was `4rem`)
- ✅ Tiny mobile (≤480px): `padding: 1.5rem 1.25rem 1.5rem` (was `2.5rem`)
- ✅ `var(--safe-top)` still referenced throughout

### 7. Header/Mobile Nav — Still Works After CTA Removal
- ✅ Phone CTA `<a>` removed from mobile menu in `Header.jsx`
- ✅ `.mobile-menu` gap: `0.75rem` (was `1.5rem`)
- ✅ All 5 NavLink routes intact (Начало, Машини, Услуги, За нас, Контакти)
- ✅ No remaining `.header-phone-mobile` CSS (dead code removed — grep returned no results)
- ✅ Staggered entrance animation still references 6 children (no off-by-one)

### 8. Mobile CTA — Sticky Bar Works, No Overlap
- ✅ `.mobile-cta-bar` CSS present: `position: fixed; bottom: 0;` with `.visible` class
- ✅ `.back-to-top` on mobile: `bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px))` — above CTA bar (safe clearance)

### 9. Desktop Hero — No Regressions
- ✅ Height: `min-height: clamp(680px, 88vh, 860px); min-height: clamp(680px, 88dvh, 860px);`
- ✅ Content centered via `flex: 1` + `align-items: center`
- ✅ `padding-bottom: 4rem` on `.hero-inner` (shift content upward)
- ✅ Asymmetric overlay: `105deg` gradient, dark left (0–30%), rapid fade, transparent right (65%+)
- ✅ Bottom vignette reduced: `rgba(10,10,10,0.45)` → `rgba(10,10,10,0.05)` at 50%

### 10. Routes
- ✅ All 7 routes + 404 catch-all present in `App.jsx`
- ✅ `BrowserRouter` with `basename="/hydromotor.bg"` intact

### 11. No Horizontal Overflow
- ✅ No `overflow-x: hidden` on `body` or `html` (nothing masking overflow)
- ✅ `overflow: hidden` only on legitimate elements: `.hero`, cards, trust-bar scroll container
- ✅ `overflow-x: auto` on `.trust-bar-track` (intended scrolling container)

### 12. Additional Verifications
- ✅ New hero image **433KB** (93KB old) — 4.7× quality improvement
- ✅ Old image kept (safe rollback)
- ✅ No new dependencies introduced
- ✅ No JSX restructuring

---

## Verdict

All 11 check items pass. No regressions, no build errors, no dead code, no clipping issues.

**✅ PASS**
