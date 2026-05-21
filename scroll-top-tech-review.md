# Tech Review: Scroll-to-top fix

**Reviewer:** Jarvis 🧠  
**Date:** 2026-05-21  
**Branch/Ref:** main  
**Status:** ✅ **PASS**

---

## 1. `src/components/ScrollToTop.jsx` — Confirm the change

```js
window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
```

✅ Change applied. Uses the options object form with `behavior: 'auto'` — no smooth animation on route navigation, which is the intended fix.

---

## 2. `src/App.jsx` / Router registration

`ScrollToTop` is **not** referenced in `App.jsx` — it lives one level up in `src/main.jsx`:

```jsx
<BrowserRouter basename="/hydromotor.bg">
  <ScrollToTop />
  <App />
</BrowserRouter>
```

✅ Correct placement — inside `<BrowserRouter>` but outside `<Routes>`, so it fires on every pathname change. (Import via `import ScrollToTop from './components/ScrollToTop'` at line 5.)

---

## 3. `src/index.css` — `scroll-behavior: smooth` preserved

Line 8 of `src/index.css`:

```css
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
```

✅ `scroll-behavior: smooth` is still present, so user-initiated scrolls (e.g. the BackToTop button in `Layout.jsx`) will animate smoothly while the route-change scroll remains instant via `behavior: 'auto'`.

---

## 4. Build — 0 errors

```
> vite build

vite v5.4.21 building for production...
✓ 60 modules transformed.
✓ built in 857ms
```

✅ Clean build. No warnings, no errors.

---

## Summary

| Check | Result |
|---|---|
| Change applied in ScrollToTop.jsx | ✅ `behavior: 'auto'` |
| Component registered in router tree | ✅ `main.jsx` inside `<BrowserRouter>` |
| `scroll-behavior: smooth` preserved | ✅ `index.css` line 8 |
| Build passes (0 errors) | ✅ 60 modules, clean |

**Verdict: PASS** — The fix is correct and safe. Route navigation scrolls instantly; user-initiated scrolls remain smooth.
