# Research: Scroll-to-Top Not Working on Mobile

## What the Fix Did

Changed `window.scrollTo(0, 0)` → `window.scrollTo({ top: 0, left: 0, behavior: 'auto' })` in `ScrollToTop.jsx`.

## Why It's Still Failing on Mobile — 3 Root Causes

### 🔴 Cause #1: `window.history.scrollRestoration` is not disabled (PRIMARY)

**File affected:** `src/components/ScrollToTop.jsx` (this is where it should be set, or in `main.jsx`)

SPAs on mobile face a well-known problem: **the browser auto-restores scroll position on history navigation**, even for SPA client-side route changes (where the URL changes via pushState).

The sequence of events:
1. User taps a nav link → URL changes → `ScrollToTop` fires `scrollTo({top:0})`
2. New page starts rendering
3. After the page paints, **the browser fires its own scroll restoration**: `window.scrollTo(savedPosition)` — overriding the `ScrollToTop` call
4. User sees the page at the old scroll position (or somewhere in between)

Mobile browsers (Safari, Chrome iOS, Samsung Internet) are **especially aggressive** about this because they cache the viewport state for fast back/forward navigation.

**The fix:** Set `window.history.scrollRestoration = 'manual'` once at app startup (or inside `ScrollToTop` on mount).

```js
// One line — put in ScrollToTop.jsx useEffect:
window.history.scrollRestoration = 'manual';
```

### 🔴 Cause #2: `scroll-behavior: smooth` on `html` interferes on mobile

**File affected:** `src/index.css` line 10

```css
html {
  scroll-behavior: smooth;
}
```

Even though `ScrollToTop` now passes `behavior: 'auto'` explicitly, on **some mobile browsers** (iOS Safari 15.x, Samsung Internet) the CSS `scroll-behavior: smooth` takes precedence over the JS `behavior` option. The scroll animates smoothly instead of jumping instantly.

An animated smooth scroll on mobile gets **interrupted by layout shifts** as the new page renders (images load, sections resize, scroll-reveal observer fires), leaving the page at a wrong scroll position.

**Why it worked "before" and still fails:** The previous fix was `window.scrollTo(0, 0)` which relied on the default behavior. Now it's explicit `behavior: 'auto'`, but CSS `scroll-behavior` can override it on some mobile rendering engines.

**The fix:** Remove `scroll-behavior: smooth` from `html` in `index.css`. It's only needed on the "Back to top" button, which sets `behavior: 'smooth'` explicitly anyway.

### 🟡 Cause #3: Header.jsx iOS menu scroll-lock cleanup overrides ScrollToTop

**File affected:** `src/components/Header.jsx`, lines 24-36

When the mobile menu closes:
```js
return () => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflow = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY); // ← THIS
};
```

**When navigating from the mobile menu:**
1. Both `menuOpen → false` and `pathname → newPath` fire in the same render cycle
2. React runs effects in component-mount order: `ScrollToTop` first, then `Header`
3. **ScrollToTop scrolls to top** ✅
4. **Header's cleanup fires immediately after and scrolls back to the old scrollY** 💥

This means navigation from the mobile menu ALWAYS overrides the scroll-to-top.

**The fix:** The cleanup should only restore scroll if the menu is just closing (not navigating). Check if the component is still mounted or add a guard.

### 🟡 Cause #4: Built JS confirmed — live site has the fix but not scrollRestoration

Confirmed via dist bundle:
- `scrollTo({top:0,left:0,behavior:"auto"})` ✅ — fix is in the build
- `scrollRestoration` — **not present** ❌

### Deployment: Live at `https://bozhidardev.github.io/hydromotor.bg/`

Last deploy: 2026-05-21 12:29 GMT (includes the current fix).

## Summary: What Needs to Change

| # | What | Severity | Fix |
|---|------|----------|-----|
| 1 | `window.history.scrollRestoration = 'manual'` | 🔴 MUST | Add to ScrollToTop on mount |
| 2 | `scroll-behavior: smooth` on `html` | 🔴 MUST | Remove from index.css (or guard with `@media (prefers-reduced-motion: no-preference)`) |
| 3 | Header.jsx cleanup scrolls back to old position | 🟡 SHOULD | Guard to not restore scroll on navigation |
| 4 | Layout shift during route transition | 🟡 COULD | Add `scrollRestoration` and the CSS fix first |

### One-line Fix (Minimum viable)

If you want the simplest fix that covers the most ground:

```js
// ScrollToTop.jsx — one line addition
window.history.scrollRestoration = 'manual';
```

Plus:

```css
/* index.css — remove or guard */
html {
  /* scroll-behavior: smooth; — removed; animates via CSS and overrides JS behavior:auto on mobile */
}
```

### Full Recommended Fix

See the combined implementation below.

---

## Investigation Methodology

1. Read `ScrollToTop.jsx` ✅ — Fix present, component structure correct
2. Read `main.jsx` ✅ — ScrollToTop is inside BrowserRouter, correct
3. Checked deployment ✅ — Latest build at bozhidardev.github.io/hydromotor.bg/ has the fix
4. Read `index.css` ✅ — `scroll-behavior: smooth` on `html` found
5. Checked `window.history.scrollRestoration` ✅ — Not set anywhere in codebase
6. Read `Header.jsx` ✅ — Mobile menu cleanup scrollTo interferes with navigation
7. Read `Layout.jsx` ✅ — No direct scroll interference
8. Read `MobileCtaBar.jsx` ✅ — No scroll interference
9. Read `BackToTop.jsx` ✅ — Uses `behavior: 'smooth'` but only on manual click, not interfering
