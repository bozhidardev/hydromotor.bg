# Mobile Optimization — Implementation Plan

> **Phase 2 Planner Report** | Date: 2026-05-21
> Project: hydromotor.bg — Putzmeister distributor SPA (React/Vite)
> Planner: Jarvis 🧠

---

## Design Decisions

### D1. Header opacity strategy
**Decision: Fully opaque (`#0f0f0f`) with dark `html` background.**
- Semi-transparent `rgba(15,15,15,0.8)` is the root cause of the iPhone notch bleed-through
- `html { background: #0f0f0f }` alone would still show dark-over-light at the notch edge
- Fix: make header fully opaque `#0f0f0f`, keep `backdrop-filter: blur(10px)` — it blurs content behind, not the body background in safe areas
- On scroll, keep same solid color (no glass-to-solid transition needed if always dark)

### D2. Viewport units for hero
**Decision: Use `100dvh` as primary with `100vh` fallback.**
- `100dvh` on iOS Safari correctly excludes the retracted/expanded browser chrome (address bar)
- Fallback `100vh` for Safari <15.4 and Chrome <89
- Pattern: `min-height: 100vh; min-height: 100dvh;`

### D3. Mobile CTA visibility
**Decision: Sticky bottom bar appears AFTER scrolling past hero — not always visible.**
- Always-visible CTA would obscure content and feel cluttered
- Visibility toggled via IntersectionObserver on hero section
- Once user scrolls past hero, bar fades/slides in
- If user is at the very top, bar is hidden (hero already has CTAs)

### D4. Back-to-top behavior
**Decision: Work on ALL screen sizes, but especially important on mobile.**
- Desktop users can use nav links or keyboard, but long SPA pages benefit from it everywhere
- Reuse `IconArrowUp` from Icons.jsx (already exists, unused)
- Appear after scrolling past hero (same threshold as mobile CTA or slightly after)
- Position: bottom-right, above any mobile CTA bar

### D5. CSS architecture
**Decision: Keep desktop-first with mobile overrides.**
- Full mobile-first refactor is risky and out of scope
- All mobile changes go inside existing `@media (max-width: 767px)` blocks
- New mobile-only components get their own CSS in the same file
- This is safe, predictable, and doesn't break desktop

---

## Fix Plan (by priority)

### P0 — SHOWSTOPPER

---

#### Fix 1: iPhone Safari top gap / safe area fix

**Problem:**
- Header uses `rgba(15,15,15,0.8)` — semi-transparent
- `html` background is transparent (defaults to body's `#f5f2ed`)
- With `viewport-fit=cover`, the status bar notch area shows light body background through the 20% transparency

**Fix:**
1. Set `html { background-color: #0f0f0f }` — dark backdrop behind everything
2. Change header background to fully opaque `#0f0f0f`
3. Keep `backdrop-filter: blur(10px)` for the blur effect on scrolling content behind the header
4. Keep `padding-top: var(--safe-top)` — this is already correct

```css
/* In App.css, add to root */
html {
  background-color: #0f0f0f;
}

/* Update .header */
.header {
  background-color: #0f0f0f;  /* was var(--color-overlay) = rgba(15,15,15,0.8) */
}
```

**Check:** On iOS Safari with notch, the status bar zone should now be solid dark with no lighter bleed-through.

**Files affected:** `src/App.css`

---

#### Fix 2: Hero cut-off / padding-top mismatch

**Problem:**
- Header total height = `safe-area-inset-top` (≈44–47px) + `70px` (header-inner) ≈ 114px
- `.hero` padding-top is only `70px` — 44px of hero content is hidden behind the header

**Fix:**
```css
@media (max-width: 767px) {
  .hero {
    padding-top: calc(70px + var(--safe-top));
  }
}
```

**Secondary vh fix:**
Replace `min-height: 100vh` with this pattern to avoid iOS Safari bottom-bar issues:
```css
.hero {
  min-height: 100vh;    /* fallback */
  min-height: 100dvh;   /* dynamic — excludes browser chrome on iOS */
}
```

**Mobile hero-inner vh fix:**
```css
@media (max-width: 767px) {
  .hero-inner {
    min-height: 60dvh;  /* instead of 60vh */
  }
}
```

**Files affected:** `src/App.css`

---

### P1 — HIGH (Missing core mobile features)

---

#### Fix 3: Sticky bottom mobile CTA bar

**Problem:**
- CTAs only exist in the hero section
- Once user scrolls past hero, there's no persistent call-to-action
- Desktop header shows phone number, but on mobile `<768px`, `.header-phone-desktop` is hidden

**Implementation:**
Create a new React component `MobileCtaBar.jsx` and add it to `Layout.jsx`.

**Component structure:**
```jsx
// MobileCtaBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconPhone, IconFileText } from './Icons';

function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return; // handle pages without hero

    // Or use a scroll listener with threshold
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`mobile-cta-bar ${visible ? 'visible' : ''}`}>
      <a href="tel:0878553273" className="cta-bar-phone">
        <IconPhone size={18} /> 0878 553 273
      </a>
      <Link to="/kontakti" className="cta-bar-quote">
        <IconFileText size={18} /> Запитване
      </Link>
    </div>
  );
}

export default MobileCtaBar;
```

**CSS:**
```css
/* Mobile CTA bar — hidden by default, slides in when visible */
.mobile-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  background-color: #0f0f0f;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  transform: translateY(100%);
  transition: transform 0.4s var(--ease-out-expo);
}

.mobile-cta-bar.visible {
  transform: translateY(0);
}

.cta-bar-phone,
.cta-bar-quote {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  white-space: nowrap;
}

.cta-bar-phone {
  background-color: var(--color-emergency);
  color: #fff;
}

.cta-bar-quote {
  background-color: var(--color-primary);
  color: var(--color-bg-dark);
}
```

**Wrap in media query:**
```css
@media (min-width: 768px) {
  .mobile-cta-bar {
    display: none;
  }
}
```

**Layout.jsx changes:** Import and add `<MobileCtaBar />` after `<Header />` inside the fragment.

**Backward-only scroll visibility consideration:**
- IntersectionObserver on `#hero` hides the bar while hero is in view
- On pages WITHOUT a hero (e.g., inner pages like /mashini, /serviz), the bar should be ALWAYS VISIBLE
- Check: if `#hero` doesn't exist, observer fails gracefully, `visible` stays `false`
- Fix: default `visible` to `true` or detect hero existence

```jsx
useEffect(() => {
  const hero = document.getElementById('hero');
  if (!hero) { setVisible(true); return; }
  const observer = new IntersectionObserver(
    ([entry]) => setVisible(!entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
  return () => observer.disconnect();
}, []);
```

**Files affected:**
- New: `src/components/MobileCtaBar.jsx`
- Modified: `src/components/Layout.jsx`, `src/App.css`

---

#### Fix 4: Back-to-top button

**Problem:**
- Long single-page scroll (6 sections on homepage)
- No way to return to header/nav without manual scrolling
- `IconArrowUp` exists but is unused

**Implementation:**
Create `BackToTop.jsx` component, add to `Layout.jsx`.

**Component:**
```jsx
// BackToTop.jsx
import React, { useState, useEffect } from 'react';
import { IconArrowUp } from './Icons';

function BackToTop({ offset = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > offset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <IconArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
```

**CSS:**
```css
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 1.25rem;
  z-index: 998;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-bg-dark);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.3s, transform 0.3s var(--ease-out-expo);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.back-to-top.visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

/* On mobile, position above any sticky CTA bar */
@media (max-width: 767px) {
  .back-to-top {
    bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
  }

  /* When mobile CTA bar is visible, lift the button above it */
  .mobile-cta-bar.visible ~ .back-to-top {
    bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
  }
}

@media (min-width: 768px) {
  .back-to-top {
    bottom: 2rem;
    right: 2rem;
  }
}
```

**Note:** The CSS sibling selector won't work because `BackToTop` is not a sibling of `MobileCtaBar` in Layout. Instead, use a CSS variable approach or JavaScript to adjust offset. Simpler: set bottom to `calc(4.5rem + env(safe-area-inset-bottom))` on `(max-width: 767px)` — this accounts for the ~60px CTA bar.

```css
@media (max-width: 767px) {
  .back-to-top {
    bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px));
  }
}
```

**Files affected:**
- New: `src/components/BackToTop.jsx`
- Modified: `src/components/Layout.jsx`, `src/App.css`

---

### P2 — MEDIUM (UX Polish)

---

#### Fix 5: Mobile menu UX improvements

**Problems identified:**
1. No visible close button ("X") inside the menu
2. Width is hardcoded `320px` — too narrow on larger phones
3. Entrance animation is flat — no staggered animation on individual links
4. Phone CTA at bottom is not visually prominent
5. Body scroll lock doesn't handle iOS overscroll properly

**Fixes in Header.jsx:**

**a) Add close button inside menu**
```jsx
// Inside <div className="mobile-menu open">, at the top:
<button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
  <IconX size={24} />  {/* or just use "✕" text */}
</button>
```

Since there's no `IconX` in Icons.jsx, use a simple CSS-drawn X or text:
```jsx
<button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
  <span className="close-icon">✕</span>
</button>
```

**b) Full-width menu on smaller screens**
```css
.mobile-menu {
  width: min(100vw, 380px);
  right: -100%; /* keep same transition */
  padding: 5rem 2rem 2rem; /* reduce top padding to account for close button */
}
```

**c) Staggered link animation**
Add CSS for staggered entrance of nav-link items:
```css
.mobile-menu.open .nav-link {
  opacity: 0;
  transform: translateX(20px);
  animation: slideInLink 0.4s var(--ease-out-expo) forwards;
}

.mobile-menu.open .nav-link:nth-child(1) { animation-delay: 0.05s; }
.mobile-menu.open .nav-link:nth-child(2) { animation-delay: 0.10s; }
.mobile-menu.open .nav-link:nth-child(3) { animation-delay: 0.15s; }
.mobile-menu.open .nav-link:nth-child(4) { animation-delay: 0.20s; }
.mobile-menu.open .nav-link:nth-child(5) { animation-delay: 0.25s; }
.mobile-menu.open .nav-link:nth-child(6) { animation-delay: 0.30s; }

@keyframes slideInLink {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**d) Touch target sizes**
Ensure all interactive mobile elements meet ≥44×44px minimum touch target (WCAG):
- Mobile CTA bar buttons — `min-height: 44px; padding: 0.8rem 1rem;`
- Mobile menu nav links — `min-height: 44px; display: flex; align-items: center;`
- Mobile menu close button — explicit `width: 44px; height: 44px;`
- Mobile hamburger wrapper — already 44×44px ✅
- Back-to-top button — already 44×44px ✅

**e) iOS body scroll lock fix**
Replace the simple `overflow: hidden` approach with a more robust iOS-friendly version:
```jsx
useEffect(() => {
  if (menuOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  } else {
    document.body.style.overflow = '';
  }
  return () => {};
}, [menuOpen]);
```

**e) Make phone CTA more prominent in mobile menu**
```css
.mobile-menu .header-phone-mobile {
  margin-top: auto; /* push to bottom with flex-gap */
  background-color: var(--color-emergency);
  border: none !important;
  border-radius: var(--radius-sm);
  padding: 0.85rem;
}

.mobile-menu .header-phone-mobile .header-phone-label {
  color: var(--color-text-white);
}
```

The `.mobile-menu` already uses `display: flex; flex-direction: column`. Adding `margin-top: auto` to the phone link will push it to the bottom.

**f) Menu top offset fix**
Change `top: var(--safe-top)` to `top: 0` — the header already occupies the safe area. The menu should start at the top and have its own padding:
```css
.mobile-menu {
  top: 0;
  padding-top: calc(70px + var(--safe-top) + 1rem);
}
```

**Files affected:** `src/components/Header.jsx`, `src/App.css`

---

#### Fix 6: Header scroll state / logo sizing

**Problem:**
- No visual feedback on scroll state (always same dark overlay)
- Logo at 46px may cause layout imbalance on very narrow screens

**Fix:**
Instead of reducing logo globally on mobile, only apply a smaller size on very small screens (<400px) if overflow is observed. Keep 46px as default on mobile — most phones handle it fine.

```css
@media (max-width: 399px) {
  .header-logo img {
    height: 38px; /* only on small phones to prevent overflow */
  }
}
```

**Post-implementation check:** Verify actual logo image proportions on iPhone 13 Safari (390px). If no overflow at 46px, no reduction needed.

Scroll state: Since we already made header fully opaque `#0f0f0f`, a scroll-state transition isn't strictly needed. But adding a subtle shadow on scroll would provide visual feedback:
```css
.header {
  /* keep existing styles */
}
.header.scrolled {
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
```

**In Header.jsx:**
```jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

Apply class: `className={\`header ${scrolled ? 'scrolled' : ''}\`}`

This is lower priority (P3) but quick to add.

**Files affected:** `src/components/Header.jsx`, `src/App.css`

---

#### Fix 7: Hero overlay strength and background position

**Problem:**
- On mobile, hero `background-position` changes to `center 40% !important`
- Gradient overlay switches to 180deg (top-to-bottom) — may be too dark
- Large hero image is served at full resolution on mobile connections

**Fix — tune overlay:**
```css
@media (max-width: 767px) {
  /* Gentler overlay: less opaque, let hero image show through more */
  .hero::before {
    background:
      linear-gradient(
        180deg,
        rgba(10,10,10,0.70) 0%,
        rgba(10,10,10,0.85) 100%
      );
  }
}
```

**Background position:** Test actual hero image and adjust. If `center 40%` crops the machine/logo, try `center center` or `center 30%` on mobile.

```css
@media (max-width: 767px) {
  .hero {
    /* Consider: center center, or keep center 40% after testing */
    background-position: center 30% !important;
  }
}
```

**Responsive image (nice-to-have, low priority):**
Consider adding a mobile-specific background image:
```css
@media (max-width: 767px) {
  .hero {
    background-image: url('/images/hero-slide-1-mobile.jpg') !important;
  }
}
```

This requires creating a mobile-optimized version of the hero image. Mark as P3.

**Files affected:** `src/App.css`

---

### P3 — LOW (Visual polish / nice-to-have)

---

#### Fix 8: Mobile spacing / section rhythm

**Problem:**
- Section spacing uses `4rem` and `5rem` padding on all sizes
- On mobile, these create excessive whitespace

**Fix:** Add mobile overrides for section spacing:
```css
@media (max-width: 767px) {
  .section-dark-spacing {
    padding: 2.5rem 0;
  }

  .section-light-spacing {
    padding: 3rem 0;
  }

  .section-callout-spacing {
    padding: 2rem 0;
  }

  .machines,
  .services,
  .why-hydromotor,
  .contact-map {
    padding: 3rem 0;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-header h2 {
    font-size: 1.6rem;
  }

  .container {
    padding: 0 1rem;
  }
}
```

**Files affected:** `src/App.css`

---

#### Fix 9: Trust bar horizontal scroll polish

The trust bar already has horizontal scroll behavior. Ensure the fade edge is visible and the scroll is smooth on iOS.

```css
@media (max-width: 767px) {
  .trust-bar-track {
    -webkit-overflow-scrolling: touch;
    gap: 1.5rem;
  }
}
```

**Files affected:** `src/App.css`

---

## Testing Checklist

### Device / Browser Matrix
- [ ] **iPhone 14/15 Pro** (Safari) — notch, bottom bar, 100dvh
- [ ] **iPhone SE** (Safari) — smaller screen, no notch but bottom bar
- [ ] **iPhone X** (Safari) — notch, earliest device with `safe-area-inset-*`
- [ ] **iPad** (Safari) — notch/safe areas on newer iPads, viewport units, same rendering engine
- [ ] **Recent Android phone** (Chrome) — address bar show/hide
- [ ] **Desktop Chrome** — ensure no regressions
- [ ] **Desktop Firefox** — ensure no regressions
- [ ] **Responsive DevTools** — iPhone 12/13/14, Galaxy S21/S23 modes

### Test Cases

#### P0 Tests
- [ ] **Top gap**: On iPhone with notch, status bar zone shows dark color, not light/cream
- [ ] **Hero cutoff**: All hero content (badge, "ХИДРОМОТОР" headline, subtitle, body, CTAs) is fully visible — not hidden behind header
- [ ] **Hero bottom**: No content clipped at bottom of hero section

#### P1 Tests
- [ ] **Mobile CTA bar**: Appears when scrolling past hero on mobile
- [ ] **Mobile CTA bar**: Hidden when hero is in view at top of page
- [ ] **Mobile CTA bar**: Always visible on non-hero pages (e.g., /mashini, /serviz)
- [ ] **Mobile CTA bar**: Respects `env(safe-area-inset-bottom)` — no overlap with home indicator
- [ ] **Back-to-top**: Appears after scrolling ~400px
- [ ] **Back-to-top**: Smooth scroll to top on click
- [ ] **Back-to-top**: Not overlapping mobile CTA bar
- [ ] **Back-to-top**: Tappable (44×44px minimum)

#### P2 Tests
- [ ] **Mobile menu**: Close button ("✕") is visible inside the menu
- [ ] **Mobile menu**: Full width on smaller phones (not stuck at 320px)
- [ ] **Mobile menu**: Links animate in with stagger on open
- [ ] **Mobile menu**: Body doesn't scroll underneath on iOS
- [ ] **Mobile menu**: Phone CTA at bottom is prominent (red background)
- [ ] **Header scroll shadow**: Appears after small scroll on mobile

#### P3 Tests
- [ ] **Section spacing**: No excessive whitespace on mobile
- [ ] **Hero overlay**: Not too dark, content is readable
- [ ] **Container padding**: 1rem on mobile (was 1.25rem)
- [ ] **Trust bar**: Smooth horizontal scroll on iOS
- [ ] **Trust bar**: No clipping on small screens

### Regression Tests
- [ ] **Desktop header**: Centered nav still works, phone visible, no hamburger
- [ ] **Desktop hero**: Full background image, proper overlay, no changes
- [ ] **Desktop sections**: Padding stays at original values
- [ ] **Routing**: All routes work (/, /mashini, /serviz, /za-nas, /kontakti, /katalozi, /pravna-informacia)
- [ ] **Build**: `npm run build` succeeds with no errors
- [ ] **Console**: No JavaScript errors on mobile or desktop

---

## Files / Components Likely Affected

| File | Changes |
|---|---|
| `src/App.css` | HTML bg, header opacity, hero padding/vh, mobile menu CSS, back-to-top CSS, mobile CTA bar CSS, spacing overrides, section overrides |
| `src/components/Header.jsx` | Close button in mobile menu, iOS scroll lock fix, optional scroll state detection |
| `src/components/Layout.jsx` | Import and render MobileCtaBar, BackToTop |
| **New:** `src/components/MobileCtaBar.jsx` | New component — sticky bottom bar with phone + quote |
| **New:** `src/components/BackToTop.jsx` | New component — floating back-to-top button |

### Files NOT affected
- `Icons.jsx` — `IconArrowUp` already exists, no new icons needed (use ✕ text or CSS for close)
- `Hero.jsx` — No logic changes (CSS-only fixes for padding, vh, overlay)
- `Footer.jsx` — Unchanged
- Any page component files — Unchanged
- `main.jsx`, `vite.config.js`, `package.json` — Unchanged

---

## Implementation Order

1. **P0** — Fix 1 (html bg + header opacity) + Fix 2 (hero padding-top + dvh)
   → Build + test on iPhone simulator/devtools immediately
2. **P1** — Fix 3 (MobileCtaBar) + Fix 4 (BackToTop)
   → Core mobile features for conversion and navigation
3. **P2** — Fix 5 (Mobile menu close button, full-width, stagger, iOS lock) + Fix 6 (header scroll, logo)
4. **P3** — Fix 7 (overlay, bg-position) + Fix 8 (spacing) + Fix 9 (trust bar)
5. **Test** — Run testing checklist
6. **Build** — `npm run build` and verify

Each step is independent and can be worked on in parallel if needed, except P0 must be done before P2-P3 for correct baseline.
