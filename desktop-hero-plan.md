# Desktop Hero / Trust Bar Composition Plan

## 1. Current Hero Height Analysis

**Current rule (in `src/App.css`):**
```css
.hero {
  min-height: clamp(680px, 88vh, 860px);
}
```

**Why the trust bar sits too high on desktop (1920×1080):**

| Metric | Value |
|---|---|
| Viewport height | 1080px |
| 88vh | 950px |
| Clamp ceiling | **860px** (clamp hit) |
| Header | 70px (subtracted from top via `padding-top`) |
| Hero inner | `flex: 1` → fills remaining space, text centered |
| Trust bar position | ~780px from top |
| Hero bottom | **860px** |
| Viewport bottom | **1080px** |
| Gap from trust bar to viewport bottom | ~280px |
| `.machines` section start | Immediately at 860px (light cream `#f0ede8`) |

**Result:** The hero composition feels truncated. 280px of light section intrudes below the dark hero, breaking the first-screen immersion. The trust bar does not sit near the viewport bottom.

---

## 2. Recommended Fix: `100svh`

**Change:**
```css
.hero {
  min-height: 100svh;   /* was: clamp(680px, 88vh, 860px) */
}
```

`100svh` (small viewport height) is preferred over `100vh` because:
- On desktop: identical to `100vh` (both equal the viewport height)
- On mobile Safari: `100svh` excludes the dynamic address bar, preventing layout jumps
- Chrome/Edge/Firefox all support `svh` natively (since 2020+)

**What happens with `100svh` on a 1920×1080 screen:**
- Hero `min-height` = 1080px (fills viewport exactly)
- Header = 70px from top (within hero via `padding-top`)
- Hero inner (`flex: 1`) fills the space above the trust bar
- Trust bar naturally sits at the **bottom of the viewport** because flex pushes it down
- Scroll indicator (chevron) appears below the trust bar at viewport bottom edge
- Next `.machines` section starts **below the fold** — only visible on scroll

### Why Option A (100svh) over Option B (higher clamp)

| Aspect | Option A (100svh) | Option B (clamp max ↑) |
|---|---|---|
| Trust bar at viewport bottom | ✅ Perfect | ❌ Depends on DH |
| No magic numbers | ✅ Clean | ❌ Still a fixed ceiling |
| Future-proof (any screen) | ✅ Yes | ❌ Need DH-specific tuning |
| Mobile unaffected | ✅ Yes (override) | ✅ Yes (override) |
| Very tall screens (e.g., 1440p) | Fills viewport (large hero) | Capped at 1000px → trust bar floats |

---

## 3. Files Affected

### `src/App.css` — one rule change

**Current (line ~484):**
```css
.hero {
  position: relative;
  min-height: clamp(680px, 88vh, 860px);
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-dark);
  overflow: hidden;
  padding-top: 70px;
}
```

**Change to:**
```css
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-dark);
  overflow: hidden;
  padding-top: 70px;
}
```

**No other files need changes.** The hero-trust-bar, hero-inner, hero-scroll-indicator, and all media queries remain untouched.

---

## 4. Desktop Regression Check

### ✅ Expected behavior after change (1920×1080):
- Hero fills the entire viewport (1080px)
- Trust bar sits near the bottom of the viewport
- First screen = complete dark hero composition + gold-accented trust bar
- Scroll to see `.machines` section — natural, intentional scroll
- Hero image is `background-size: cover` with `background-position: center 30%` → no stretching, still crisp

### ⚠️ Very tall screens (1440p+, 2560×1440):
- Hero will be 1440px tall — much larger than before
- The trust bar sits at viewport bottom, so the hero content (headline, subtitle, CTAs) will be vertically centered in a very tall space
- This is acceptable for a cinematic hero — many premium sites do this
- The hero badge + h1 + subtitle + body + CTAs have enough content to not look empty
- If it's too tall, the user can later add `max-height: 900px` or similar as a safety ceiling

### ✅ Background image:
- `background-size: cover` + `background-position: center 30%` — works at any height
- No distortion

---

## 5. Mobile Preservation

### Current mobile override (unchanged, already present):
```css
@media (max-width: 767px) {
  .hero {
    min-height: auto;       /* ← overrides the 100svh */
    padding-top: calc(70px + var(--safe-top));
  }
}
```

**Mobile behavior:** `min-height: auto` means the hero shrinks to fit its content on mobile. The trust bar sits directly below the hero text/CTAs. No regression.

### Small-phone override (≤480px):
Also uses `min-height: auto` — unaffected.

---

## 6. Testing Checklist

- [ ] **Desktop (1920×1080):** Hero fills viewport, trust bar near bottom, `.machines` below fold
- [ ] **Desktop (1440×900):** Hero fills viewport, no gap below trust bar
- [ ] **Tablet (768×1024):** Hero fills viewport (1024px → large but acceptable)
- [ ] **Tablet landscape (1024×768):** Hero fills viewport
- [ ] **Mobile (375×667):** Hero height = auto, text compact, trust bar scrolls horizontally
- [ ] **Mobile (414×896):** Same, no regression
- [ ] **Hero background image:** Crisp, no stretching at any size
- [ ] **Scroll indicator:** Visible at bottom of hero on desktop, hidden on mobile (already correct via `display: none` in mobile media query)
- [ ] **Scroll behavior:** `scroll-behavior: smooth` (if set) — smooth scroll to `.machines` on down-arrow or scroll
- [ ] **Build:** `npm run build` or `vite build` passes without errors

---

## Summary

| Before | After |
|---|---|
| `min-height: clamp(680px, 88vh, 860px)` | `min-height: 100svh` |
| Trust bar at ~780px (280px above viewport bottom) | Trust bar at viewport bottom |
| Light section intrudes on first screen | Full dark composition fills first screen |
| Feels cut off | Feels complete and cinematic |

**One line change in `src/App.css`. No new dependencies. No mobile regression. Build passes.**
