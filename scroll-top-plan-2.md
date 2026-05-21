# Scroll-to-Top on Mobile — Fix Plan (Attempt 2)

**Date:** 2026-05-21
**Based on:** `research-scroll-top-2.md`

## Root Causes & Fixes Applied

### Fix 1 — `window.history.scrollRestoration` 🔴 MUST

**File:** `src/components/ScrollToTop.jsx`
**What:** Added `window.history.scrollRestoration = 'manual'` before `scrollTo` in the `useEffect`.
**Why:** Mobile browsers (Safari, Chrome iOS, Samsung Internet) auto-restore scroll position after SPA route changes, overriding the explicit `scrollTo` call. Setting this to `'manual'` tells the browser not to interfere.
**Change:** One line addition in the effect body.

### Fix 2 — CSS `scroll-behavior` removal 🔴 MUST

**File:** `src/index.css`
**What:** Removed `scroll-behavior: smooth` from the `html` rule.
**Why:** CSS `scroll-behavior: smooth` can override JS `behavior: 'auto'` on some mobile rendering engines (iOS Safari 15.x, Samsung Internet). The BackToTop button already handles smooth scroll explicitly via JS `behavior: 'smooth'`.
**Change:** Deleted one line from the `html` block.

### Fix 3 — Header.jsx menu cleanup guard 🟡 SHOULD

**File:** `src/components/Header.jsx`
**What:** When the mobile menu closes due to navigation (user taps a nav link), the scroll-lock cleanup previously restored the scroll position (`window.scrollTo(0, scrollY)`) *after* ScrollToTop had already scrolled to top, effectively overriding it.
**How:**
1. Added `useRef` import
2. Added `navigatingRef` (`useRef(false)`) to track navigation-initiated menu closes
3. Added `navigateAndClose()` function that sets the ref + closes menu
4. Changed all mobile NavLink `onClick` handlers from `closeMenu` → `navigateAndClose`
5. Changed header logo NavLink `onClick` from `closeMenu` → `navigateAndClose`
6. Guarded the scroll-lock cleanup: if `navigatingRef.current` is true, skip scroll restore

**Non-nav close paths unaffected:** Close button (✕), overlay tap, Escape key, tel: link — these all still use `closeMenu()` and restore scroll normally.

## Files Changed

| File | Change | Status |
|------|--------|--------|
| `src/components/ScrollToTop.jsx` | Added `window.history.scrollRestoration = 'manual'` | ✅ Applied |
| `src/index.css` | Removed `scroll-behavior: smooth` | ✅ Applied |
| `src/components/Header.jsx` | Added navigating ref + guard in cleanup + NavLink handlers | ✅ Applied |

## Build & Deploy

```bash
cd /home/awake/.openclaw/workspace/hydromotor.bg
npm run build
npx gh-pages -d dist
```

## Verification

After deploy, test on real mobile devices:
1. Open a long page (e.g., /mashini)
2. Scroll down
3. Tap a nav link in the mobile menu → should scroll to top immediately
4. Tap a nav link on desktop → should scroll to top immediately
5. Open mobile menu, close with ✕ → should restore scroll position (existing behavior preserved)
6. Back/forward browser navigation → should not restore old scroll position

---

**Status:** All fixes applied, ready for build & deploy.
