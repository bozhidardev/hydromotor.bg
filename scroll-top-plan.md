# Scroll-to-Top Fix — Plan & Execution

## Problem

`ScrollToTop.jsx` calls `window.scrollTo(0, 0)` without a behavior option. The CSS `html { scroll-behavior: smooth }` in `index.css` causes the browser to animate the scroll smoothly. On mobile, rendering/layout shifts during route transitions interrupt this animation, leaving the page at the old scroll position.

## Fix Applied

**File:** `src/components/ScrollToTop.jsx`

| Before | After |
|---|---|
| `window.scrollTo(0, 0);` | `window.scrollTo({ top: 0, left: 0, behavior: 'auto' });` |

**Why:** The `behavior` option in `scrollTo()` always takes precedence over CSS `scroll-behavior`. Using `behavior: 'auto'` forces an instant jump to top on every navigation, regardless of the CSS smooth scroll setting.

## Files Changed

- `src/components/ScrollToTop.jsx` — 1 line changed

## What Was NOT Changed

- **`src/index.css`** — `scroll-behavior: smooth` stays for user-initiated scrolls (e.g., the BackToTop button)
- **`src/App.jsx`, `src/main.jsx`, etc.** — No changes needed

## Build Verification

`npm run build` passed with 0 errors (60 modules, ~891ms).

## Status

✅ Complete
