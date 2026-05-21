# Page Hero Breathing Room — Summary

## Change Made

**File:** `src/App.css`

**Location:** `.page-hero` mobile media query (`@media (max-width: 767px)`)

**Before:**
```css
padding: calc(70px + var(--safe-top)) 0 2rem;
```

**After:**
```css
padding: calc(70px + 1rem + var(--safe-top)) 0 2rem;
```

Added `1rem` (16px) extra breathing room between the fixed header bottom and the page title text on mobile viewports.

## Verification

- **Desktop `.page-hero`** (`padding: 5rem 0 3rem`) — untouched ✅
- **`npm run build`** — passed with 0 errors ✅
- **Build output:** `dist/` produced (44 KB CSS, 211 KB JS)

## Status

**PASS**
