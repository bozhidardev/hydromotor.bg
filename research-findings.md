# Mobile Optimization — Research Findings

> **Researcher / Visual Reviewer Phase 1 Report**
> Date: 2026-05-21
> Project: hydromotor.bg — Putzmeister distributor SPA (React/Vite)
> Analyst: Jarvis 🧠

---

## 1. All Mobile Problems Found

### 1.1 White/light gap above the navbar on iPhone (notch area)

**Observed:** A lighter strip visible in the status bar / notch zone above the fixed header on iPhone Safari.

**Root Cause — Dual factor:**

1. **Semi-transparent header background.** The `.header` uses `background-color: var(--color-overlay)` = `rgba(15, 15, 15, 0.8)` (80% opaque). With `viewport-fit=cover` in the `<meta name="viewport">` tag, iOS Safari extends web content into the notch/safe-area region. Because the header background is **semi-transparent**, the underlying `body` background (`--color-bg-white: #f5f2ed` — a light cream) shows through the 20% transparency in the status-bar zone.

2. **No dark background on `<html>`.** The `html` element has no explicit `background-color` (defaults to `transparent`). The `body` has `background-color: var(--color-bg-white)`. When iOS overscrolls or when the viewport extends into the notch area, there is no dark backdrop behind the header. The light body color bleeds through.

**Evidence in code:**

```css
:root {
  --color-overlay: rgba(15, 15, 15, 0.8);
  --color-bg-white: #f5f2ed;   /* light cream */
  --safe-top: env(safe-area-inset-top, 0px);
}

.header {
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: var(--color-overlay);   /* ← 80% opaque */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding-top: var(--safe-top);             /* ← pushes content into notch */
}

body {
  background-color: var(--color-bg-white);  /* ← light — visible through header */
}
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### 1.2 Hero cut off / cropped on iPhone Safari

**Observed:** Hero image and content get cropped at the top and/or bottom on iPhone Safari.

**Root Cause — Three compounding factors:**

**A. `100vh` bug on iOS Safari (desktop breakpoint applied on some tablets).**
The `.hero` has `min-height: 100vh` at the base (no media query override). On iOS Safari, `100vh` includes the area behind the bottom address bar (which can be ~80–90px). This makes `.hero` taller than the visible viewport.
```css
.hero {
  min-height: 100vh;  /* ← iOS: includes bottom bar area → too tall */
  padding-top: 70px;
  overflow: hidden;   /* ← clips bottom content */
}
```
On mobile (`≤767px`) this is overridden to `min-height: auto` and `.hero-inner` gets `min-height: 60vh` — but `60vh` still suffers from the same iOS bug.

**B. Header height mismatch — hero content hidden behind header.**
The header's total height = `safe-area-inset-top` (≈44–47px on notch iPhones) + `70px` (`.header-inner` height) ≈ **114px**.
But `.hero` uses `padding-top: 70px` — it only accounts for the inner header height, NOT the safe-area padding. Result: ~44px of hero content (badge, headline, subtitle) is positioned behind the fixed header and is **invisible**.

```css
.hero {
  padding-top: 70px;
  /* Should be: padding-top: calc(70px + var(--safe-top)) */
}
```

**C. Mobile `background-position` change.**
On mobile (`≤767px`), the hero background position is overridden to `center 40%`:
```css
@media (max-width: 767px) {
  .hero {
    background-position: center 40% !important;
  }
}
```
This shifts the background image compared to desktop (`center 30%` via inline style), potentially cropping important visual elements (e.g., the top of a concrete pump or the Putzmeister logo if present in the hero image).

### 1.3 Mobile header not polished

Issues beyond the notch gap:

- **Glass effect may cause jank.** `backdrop-filter: blur(10px)` on iOS Safari can cause scrolling jank and visual stuttering, especially during page load and scroll.
- **No transition on background-color.** The header has `transition: background-color 0.4s` but starts opaque (no `background-color: transparent` state).
- **Scroll behavior.** The header has no "solid on scroll" state — it's always the same dark overlay, which is fine, but there's no visual feedback when at the very top of the page vs. scrolled.
- **Logo sizing.** `height: 46px` on the logo image might be too small on mobile for text legibility in the logo file.

### 1.4 Mobile navigation menu needs better design

Current mobile menu (`<div class="mobile-menu">`):

| Property | Current Value | Problem |
|---|---|---|
| Width | `320px` | Too narrow on larger phones, takes less than full width |
| Top offset | `var(--safe-top)` | Creates a visual gap between screen top and menu top when safe-area > 0 |
| Close affordance | Overlay tap or link tap only | **No visible close button ("X")** inside the menu — poor UX |
| Link styling | Simple text with `border-bottom` | Flat, no hover/active feedback beyond color change |
| Entrance | `right: -100% → 0` | Whole menu slides at once — no staggered animation on individual links |
| CTA visibility | `header-phone-mobile` at bottom (border + phone icon) | Not visually prominent — a small bordered box at the bottom of a long list |
| Scroll lock | `document.body.style.overflow = 'hidden'` | Works, but no iOS-specific `-webkit-overflow-scrolling: touch` handling or `position: fixed` body lock for overscroll prevention on Safari |

### 1.5 Missing back-to-top button

**No implementation found.** The `IconArrowUp` icon exists in `Icons.jsx` but is not used in any component. On long pages (Home has 6 sections: Hero, Machines, Services, WhyHydromotor, ServiceProcess, ContactMap), users on mobile must manually scroll to the top to access the header navigation or CTAs.

### 1.6 Missing mobile CTA

CTAs ("ПОИСКАЙ ОФЕРТА" and "24/7 СЕРВИЗ") exist **only in the hero section**. On mobile:
- Once the user scrolls past the hero, there is **no fixed/sticky Call-to-Action button**.
- The header has only a logo and hamburger — no phone button.
- The desktop header shows a phone number, but on mobile `<768px` the `.header-phone-desktop` is `display: none`.
- No sticky "Call now" or "Get Quote" button at the bottom of the viewport.

---

## 2. Root Cause of iPhone Top Gap (Summary)

**Primary cause: Semi-transparent header background + light body background + `viewport-fit=cover`.**

```css
/* Fix chain: */
html  →  no background set (transparent)            ← fix: set html background to dark
body  →  background: #f5f2ed (light cream)           ← fix: doesn't need change
header → background: rgba(15,15,15,0.8)              ← fix: make opaque or adjust
```

The `env(safe-area-inset-top)` padding on the header is **correct** for pushing content below the notch. The issue is that the **notch area itself** shows the body's light background through the header's semi-transparency.

---

## 3. Root Cause of Hero Cut-Off (Summary)

**Primary cause: Hero `padding-top` doesn't account for safe-area-inset-top of the fixed header.**

The hero calculates `padding-top: 70px` but the actual header height = `70px + env(safe-area-inset-top)` ≈ 114px. The top ~44px of hero content (badge, headline) is positioned behind the fixed header.

**Secondary cause:** `min-height: 100vh` on `.hero` includes the iOS bottom bar area, making the hero taller than the viewport and causing bottom clipping when `overflow: hidden` is applied.

---

## 4. Recommended Mobile Layout Strategy

### Architecture

```
┌──────────────────────────────────┐
│  Safe area (dark background)     │  ← html { background: #0f0f0f }
├──────────────────────────────────┤
│  Fixed Header (fully opaque)     │  ← z-index: 1000, height: 70px + safe-top
│  [Logo]               [☰]       │
├──────────────────────────────────┤
│  Content (scrollable)            │  ← padding-top: calc(70px + var(--safe-top))
│  ┌────────────────────────────┐  │
│  │  Hero (full-width)        │  │
│  │  Trust Bar                │  │
│  │  Sections...              │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  Fixed Mobile CTA Bar            │  ← z-index: 999, sticky bottom
│  [📞 0878 553 273] [💬 Запитване]│
└──────────────────────────────────┘
│  Back-to-top button              │  ← appears on scroll
└──────────────────────────────────┘
```

### Key Principles

1. **Safe area awareness throughout.** Every fixed/sticky element must account for `env(safe-area-inset-*)`. Heroes should use `padding-top: calc(70px + var(--safe-top))` instead of hardcoded `70px`.

2. **Full opacity on fixed elements in the notch zone.** The header background should be fully opaque (`background-color: #0f0f0f` or a dark solid color) to avoid the body background bleeding through in safe areas. The `backdrop-filter` blur can still be applied — it will blur underlying page content, not the body background outside the viewport.

3. **Use `dvh` (dynamic viewport height) instead of `vh`.** `100dvh` on iOS Safari correctly excludes the retracted/expanded browser chrome (address bar). This fixes the `100vh` bug where the hero extends behind the bottom bar. Fallback: `100vh` with `min-height` override.

4. **Mobile-first refactor.** The current CSS is desktop-first (base styles for desktop, overrides in `@media (max-width: ...)`). For a robust mobile experience, refactor to mobile-first breakpoints (`@media (min-width: ...)`) so mobile is the default.

5. **Sticky bottom CTA.** A thin, fixed bar at the bottom of the viewport on mobile with a phone call button and a "Request Quote" button. Must respect `env(safe-area-inset-bottom)`.

---

## 5. Priority Order for Fixes

### P0 — Showstopper (broken UX on target device)

1. **Hero cut-off (top padding mismatch)** — `padding-top: calc(70px + var(--safe-top))`
   - Without this, the hero headline and badge are hidden behind the header on every notch iPhone.

2. **iPhone top gap (semi-transparent header)** — Make header background opaque or set dark `html` background
   - Visible to every iPhone user with a notched device (iPhone X and newer = all modern iPhones).

### P1 — High (Missing core mobile features)

3. **Fixed/sticky mobile CTA** — Bottom bar with phone + quote buttons
   - Primary conversion driver for a B2B machinery site — customers need to call or inquire immediately.

4. **Back-to-top button** — Floating button visible after scrolling past the hero
   - Long single-page layout demands this. `IconArrowUp` already exists.

### P2 — Medium (UX polish)

5. **Mobile menu UX improvements**
   - Add close button ("X") inside the menu
   - Staggered link animation on open/close
   - Full-width menu on smaller screens (`100vw` instead of `320px`)
   - Better visual hierarchy for the phone CTA

6. **iOS vh/dvh fix** — Replace `100vh` / `60vh` with `100dvh` / `60dvh` (with `100vh` fallback for non-supporting browsers)
   - Fixes bottom clipping on iOS when the address bar is visible.

### P3 — Low (Visual polish)

7. **Header transition polish** — Add scroll-aware state (glass → solid on scroll)
8. **Logo sizing audit on mobile**
9. **Hero background-position fine-tuning** for mobile safe zones

---

## 6. Risks to Consider

### 6.1 `dvh` browser support
`100dvh` / `60dvh` is supported in Safari 15.4+ and all modern browsers, but not in some older browsers (Safari <15.4, Chrome <89). **Mitigation:** Use `100dvh` as the primary value with `100vh` as a fallback:
```css
.hero {
  min-height: 100vh;
  min-height: 100dvh;
}
```

### 6.2 Bottom safe area on sticky CTAs
If a sticky bottom CTA is added without `env(safe-area-inset-bottom)`, it will overlap with the iPhone home indicator bar. **Mitigation:** Always include:
```css
.mobile-cta-bar {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

### 6.3 `backdrop-filter` performance on iOS
`backdrop-filter: blur()` can cause jank on lower-end iOS devices, especially during scroll. **Mitigation:** Test on iPhone SE / 8. If janky, consider switching to a solid dark background with a subtle gradient or pseudo-element blur instead.

### 6.4 Body scroll lock on iOS when menu is open
`document.body.style.overflow = 'hidden'` does NOT reliably prevent overscroll/scroll on iOS Safari when the mobile menu is open. The page can still scroll behind the menu. **Mitigation:** Add `-webkit-overflow-scrolling: touch` handling and set `position: fixed` on `body` with `top: 0; left: 0; right: 0` and `overflow: hidden`. Store the current scroll position to restore it on close.

### 6.5 Hero background image loading
The hero image (`hero-slide-1.jpg`) is a full-resolution desktop image served via inline `backgroundImage` style. On a mobile connection, this large image (potentially 1920×1080+ px) will be downloaded at full resolution with no responsive image handling. **Mitigation:** Consider using `@media` queries to serve different background images for mobile, or use `srcSet` / `<picture>` inside the hero if switching to an `<img>`-based approach.

### 6.6 Clip-path diagonals and overflow
The diagonal section patterns (`.section-diagonal: clip-path: polygon(0 3%, 100% 0, 100% 97%, 0 100%)`) use `clip-path` which may be clipped differently on iOS Safari. These sections have `overflow: hidden` set globally on `section {}` in `index.css`, which can interact badly with `clip-path` on mobile. **Test on device.**

### 6.7 Overall page weight
The CSS file is already very large (containing all page styles in a single file). Adding mobile-specific styles will increase its size. Consider CSS splitting if it becomes a performance issue.

---

## Appendix: Key CSS Values Reference

| CSS Property | Current Value | Issue | Fix |
|---|---|---|---|
| `.hero padding-top` | `70px` | Doesn't account for safe top | `calc(70px + var(--safe-top))` |
| `.hero min-height` | `100vh` | iOS vh bug | `min-height: 100dvh` (fallback `100vh`) |
| `.header background-color` | `rgba(15,15,15,0.8)` | Shows body background in notch | Fully opaque dark or set `html { background: #0f0f0f }` |
| `.header padding-top` | `var(--safe-top)` | ✅ Correct usage | Keep as-is |
| `html background` | none (transparent) | Light body shows in notch | `html { background: #0f0f0f }` |
| `.mobile-menu top` | `var(--safe-top)` | Creates visible gap | Should be `0` with own safe-area padding |
| `.mobile-menu width` | `320px` | Too narrow on large phones | `min(100vw, 380px)` or full-width variant |
| Hero mobile bg position | `center 40% !important` | May crop hero image badly | Test actual image and adjust |
| Desktop CTA visibility | `.header-phone-desktop { display: none }` below 768px | No mobile call button in header | Add `.header-phone-mobile-inline` beside hamburger |

---

*End of Phase 1 Research Report*
