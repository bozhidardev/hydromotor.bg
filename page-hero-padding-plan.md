# Page Hero Mobile Padding Fix — Execution Plan

**Date:** 2026-05-21  
**Status:** ✅ COMPLETED

---

## Problem

On mobile (≤ 767px), inner page titles in `.page-hero` were hidden behind the 70px fixed navigation header because the top-padding was only `3.5rem` (≈56px), which is 14px short of the header.

## Fix Applied

**File:** `src/App.css` (line 2039)

```css
/* BEFORE */
@media (max-width: 767px) {
  .page-hero {
    padding: 3.5rem 0 2rem;
  }
}

/* AFTER */
@media (max-width: 767px) {
  .page-hero {
    padding: calc(70px + var(--safe-top)) 0 2rem;
  }
}
```

## Verification

| Check | Result |
|-------|--------|
| Desktop `.page-hero` | ✅ `padding: 5rem 0 3rem` — untouched |
| Mobile `.page-hero` | ✅ `padding: calc(70px + var(--safe-top)) 0 2rem` |
| `--safe-top` fallback | ✅ `env(safe-area-inset-top, 0px)` at `:root` level |
| `npm run build` | ✅ Passed — 0 errors, 60 modules |

## Scope

All 6 inner pages using `.page-hero` are fixed by this single CSS change:
- About (`src/pages/About.jsx`)
- Services (`src/pages/Services.jsx`)
- Machines (`src/pages/Machines.jsx`)
- MachineDetail (`src/pages/MachineDetail.jsx`)
- Contact (`src/pages/Contact.jsx`)
- Downloads (`src/pages/Downloads.jsx`)

## Rationale

Mirrors the homepage `.hero` approach exactly: `calc(70px + var(--safe-top))` pushes content below the fixed header while accounting for iPhone notch / safe-area insets. No JSX changes needed.
