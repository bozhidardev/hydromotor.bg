# Scroll Position on Page Navigation — Investigation

## Files Read

- `src/App.jsx` — no scroll handling
- `src/main.jsx` — `ScrollToTop` is imported and rendered inside `<BrowserRouter>` ✅
- `src/components/ScrollToTop.jsx` — uses `useEffect` + `window.scrollTo(0, 0)` on pathname change
- `src/components/Layout.jsx` — contains `useScrollReveal()` (IntersectionObserver for `.scroll-reveal` elements)
- `src/components/MobileCtaBar.jsx` — no scroll-affecting behavior
- `src/components/BackToTop.jsx` — user-initiated scroll, fine
- `src/index.css` — has `html { scroll-behavior: smooth; }`
- `src/App.css` — no relevant scroll handling

---

## ✅ Does a ScrollToTop component exist?

**Yes.** Located at `src/components/ScrollToTop.jsx`:

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
```

---

## ✅ Is it registered in the router?

**Yes.** In `src/main.jsx`:

```jsx
<BrowserRouter basename="/hydromotor.bg">
  <ScrollToTop />
  <App />
</BrowserRouter>
```

Placed correctly — inside `<BrowserRouter>`, before page components.

---

## 🔍 Root Cause

The component **exists and is correctly wired**, but the scroll-to-top call is **silently broken** by `scroll-behavior: smooth`.

### Why?

1. `src/index.css` sets `html { scroll-behavior: smooth; }` (line 10).
2. `ScrollToTop` calls `window.scrollTo(0, 0)` — without a `behavior` option.
3. Per the CSSOM spec, when `window.scrollTo(x, y)` is called with only positional args (no options object), the browser **respects the CSS `scroll-behavior` property** and animates the scroll smoothly.
4. On mobile, this animated scroll can be **interrupted** by:
   - Page content rendering / layout shifts during route transition
   - IntersectionObserver callbacks firing (the `useScrollReveal` hook in `Layout.jsx`)
   - React hydration / component mounting causing layout changes
5. Result: the scroll animation either doesn't complete or gets overridden, leaving the page at its previous scroll position.

### How to confirm

On a mobile device (or narrow Chrome DevTools):
1. Open any non-home page like `/mashini`
2. Scroll down
3. Tap a nav link to go to `/za-nas`
4. Notice the page stays scrolled down instead of snapping to top
   — this is the smooth-scroll animation being disrupted

---

## 🛠 Recommended Fix

**File:** `src/components/ScrollToTop.jsx`

Change the `window.scrollTo` call to use the **options form** with `behavior: 'auto'`. This explicitly overrides the CSS `scroll-behavior: smooth` and forces an **instant** scroll on every navigation.

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}
```

**Why `behavior: 'auto'` works:** Per MDN and the CSSOM View spec, the `behavior` option in the JavaScript `scrollTo()` method **always takes precedence over** the CSS `scroll-behavior` property. Calling `window.scrollTo(0, 0)` without the options object inherits the CSS smooth scroll. Adding `{ behavior: 'auto' }` forces instant.

---

## 📋 Files That Need to Change

| File | Change |
|---|---|
| `src/components/ScrollToTop.jsx` | Convert `window.scrollTo(0, 0)` to `window.scrollTo({ top: 0, left: 0, behavior: 'auto' })` |

No other files need changes. The component, router registration, and CSS are otherwise correct.

---

## ✅ Alternative (Not Recommended)

Remove `scroll-behavior: smooth` from `index.css`:
- This would also fix the issue but would remove smooth scrolling site-wide (including the BackToTop button's manual click, which already uses `{ behavior: 'smooth' }` explicitly).
- Better to keep smooth scroll for user-initiated actions and only override it for automatic nav-scrolls.
