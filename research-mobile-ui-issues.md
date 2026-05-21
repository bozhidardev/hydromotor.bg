# Mobile UI Issues — Research Findings

## Issue 1: Red CTA bar overlaps footer on mobile

### How it works

**`src/components/MobileCtaBar.jsx`** (lines 1–29):
- Renders a fixed-position `<a>` tag with class `mobile-cta-bar`.
- Uses an `IntersectionObserver` on `#hero` — visible only when hero is scrolled past.
- Links to `tel:0878553273` with phone number and "24/7 СЕРВИЗ" label.
- Self-closes when hero re-enters view.

**`src/App.css` — `.mobile-cta-bar` (lines 2076–2112)**:
- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 999`
- Height: ~44px actual content + safe-area bottom padding (`padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px))` → total ~50–60px).
- Entrance: slides up from `translateY(100%)` → `translateY(0)` when `.visible`.
- Hidden on desktop via `@media (min-width: 768px) { display: none; }`.

**`src/App.css` — `.back-to-top` (lines 2114–2152)**:
- Already correctly accounts for the mobile CTA bar:
  ```
  @media (max-width: 767px) {
    .back-to-top {
      bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px));
    }
  }
  ```
  The `3.5rem` (~56px) roughly equals the CTA bar height.

### The footer

**`src/components/Footer.jsx`** (lines 1–77):
- Renders a `<footer className="footer">` with a grid of columns (about us, quick links, contacts, social).
- The bottom row (`footer-bottom`) has copyright text.
- No bottom padding to speak of — `.footer` has `padding: 4rem 0 0;`.

**`src/App.css` — `.footer` (lines 1147–1318)**:
- No `@media (max-width: 767px)` rules adding `padding-bottom` to the footer.
- The only breakpoints for `.footer-grid` are `min-width: 600px` (2 cols) and `min-width: 1024px` (4 cols).
- The `.footer-bottom` sits right at the bottom of the footer with `margin-top: 3rem` and `padding: 1.5rem 1.25rem`.

### Overlap condition

When a user scrolls to the bottom of any page on mobile:
1. The `#hero` section is out of view → CTA bar is visible (`.visible` applied).
2. The CTA bar covers the bottom ~50–60px of the viewport.
3. The footer content (especially copyright in `.footer-bottom` and links in `.footer-legal`) scrolls behind it.

### Proposed fix

Add to `src/App.css` inside the `@media (max-width: 767px)` block (or a new one):

```css
@media (max-width: 767px) {
  .footer {
    padding-bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px));
  }
}
```

This mirrors the same calculation already used for `.back-to-top`. The `3.5rem` accounts for the ~44px CTA bar body + some spacing, and `env(safe-area-inset-bottom)` handles iPhone notch/home indicator.

---

## Issue 2: Mobile nav menu cluttered/stacked

### How the mobile menu works

**`src/components/Header.jsx`** (lines 1–100):
- Desktop nav (`.header-nav`) — hidden on mobile via CSS.
- Mobile menu (`.mobile-menu`) — a fixed panel that slides in from the right.
- Content:
  - Close button (absolute positioned top-right).
  - 5 nav links: Начало, Машини, Услуги, За нас, Контакти.
  - Phone CTA row (`.mobile-menu-phone`) at the bottom with "24/7 СЕРВИЗ" label.
- iOS body scroll lock is applied when menu is open.
- Staggered entrance animation via `slideInLink` keyframes.

**`src/App.css` — mobile menu styles (lines 356–465)**:

| Element | Key specs |
|---------|-----------|
| `.mobile-menu` | `width: min(100vw, 380px)`, `padding: calc(70px + var(--safe-top) + 1rem) 2rem 2rem`, `gap: 0.75rem` |
| `.mobile-menu .nav-link` | `font-size: 1.05rem`, `padding: 0.5rem 0`, `min-height: 44px`, `border-bottom: 1px solid...` |
| `.mobile-menu-phone` | `font-size: 0.85rem`, `padding: 0.6rem`, `min-height: 44px`, `margin-top: auto`, `border-top: 1px solid...` |
| `.mobile-menu-close` | Absolute at `top: calc(0.5rem + var(--safe-top))` |

### The stacking issue

On screens with limited height (<600px viewport height), the menu overflows the viewport because:

- **Top padding:** `~70px (header) + safe-top(~8px) + 1rem(16px)` ≈ **94px**
- **5 nav links:** `5 × 44px` = **220px** (at min-height, could be more with text content)
- **Gaps between links:** `4 × 0.75rem(12px)` = **48px**
- **Phone row:** ~44px at minimum
- **Bottom padding:** `2rem(32px)`
- **Total rough estimate:** **~438px** of content before scrolling

On a 667px iPhone 6/7/8 screen, this leaves about 229px for header + safe area, which works. But on smaller Android devices (320px or 360px viewport height), there's significant overflow. The menu panel itself doesn't get `overflow-y: auto`, so content gets cut off.

The animation values (5 links staggered at 0.05s increments + phone at 0.30s) are fine — they work sequentially and don't cause layout issues. The `min-height: 44px` on each link ensures touch targets are large enough (good for accessibility), but the cumulative vertical space is the problem.

### Fix options

#### Option A — Reduce padding/spacing between nav links

**Current:** `gap: 0.75rem` on `.mobile-menu`, `padding: 0.5rem 0` per link.
**Change:** Reduce `gap` to `0.25rem` and/or `padding` to `0.25rem 0`. Could save ~32px.

Trade-off: Links become more vertically compact but remain touch-friendly at 44px min-height.

#### Option B — Make phone row more compact

**Current:** `.mobile-menu-phone` has `padding: 0.6rem; margin-top: auto;`, close button separate.
**Change:**
- Remove `margin-top: auto` (let it flow naturally).
- Reduce padding to `0.4rem`.
- Or restructure: embed phone as part of the link list (a special 6th link styled differently) to avoid the extra row.
- Could save ~20px.

#### Option C — Smaller font size on very small screens

**Current:** `.mobile-menu .nav-link` uses `font-size: 1.05rem`.
**Change:** Add a media query for very small screens (≤360px height):
```css
@media (max-height: 600px) {
  .mobile-menu .nav-link { font-size: 0.95rem; padding: 0.35rem 0; }
}
```

Trade-off: Readability decreases slightly; still WCAG-compliant.

#### Option D — Make menu scrollable (prevent content loss entirely)

This is the most robust fix:
```css
.mobile-menu {
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
```

This ensures all content is reachable even on very small screens. Combining this with Option A (reduced gap) would be the best UX — content is compact but still scrollable for edge cases.

### Recommendation

Combine **Option A + Option D**:
1. Reduce the `gap` on `.mobile-menu` from `0.75rem` to `0.25rem`.
2. Add `overflow-y: auto` and `overscroll-behavior: contain` so the menu scrolls on very small screens instead of clipping content.

This keeps the touch target sizes (44px min-height) and animations intact while preventing content loss on low-height viewports.
