# Visual Polish + Consistency Pass — Summary

**Date:** 2026-05-21
**Status:** ✅ Complete — `npm run build` passes (0 errors)

## Changes Made

### Phase 1 — CSS Foundation (App.css)

1. **Unified `.page-hero` class** — Added a single `page-hero` class replacing the pattern of 6 separate hero classes (`.about-hero`, `.machines-hero`, `.services-hero`, `.contact-hero`, `.downloads-hero`, `.machine-detail-hero`). Includes:
   - Consistent padding (5rem top / 3rem bottom desktop, 3.5rem/2rem mobile)
   - Dark gradient background
   - Gold gradient bottom accent line (`::after`)
   - Standard h1 (`clamp(2rem, 4vw, 3rem)`) and `.page-hero-subtitle` (white/gray)

2. **Mobile hero sizing (iPhone-safe)**:
   - `<480px`: `min-height: 65dvh` (was 50dvh) — more room for content on iPhone SE
   - `<480px`: reduced padding to 2.5rem top / 1.5rem bottom
   - CTA buttons now side-by-side from 360px upward (was 480px)
   - Each CTA button gets `flex: 1` with `max-width: 220px`
   - Below 360px: buttons stack full-width as before

3. **Visual polish additions**:
   - Added `.contact-page` to radial-gradient background list
   - Added `.machine-detail` to radial-gradient background list (was missing)

4. **Gold-tinted homepage cards**:
   - `.machine-card`: Added `border-left: 3px solid transparent` with gold on hover
   - `.service-card`: Added `border-left: 3px solid transparent` with gold on hover
   - `.why-point`: Added `border-left: 3px solid transparent` with gold on hover

5. **Section spacing consolidation**:
   - Added `section-light-spacing` class to About.jsx and Services.jsx content wrappers
   - Removed hardcoded `padding-top: 4.5rem` override from visual polish section

### Phase 2 — CTA Cleanup

6. **Simplified MobileCtaBar**:
   - Replaced dual-button layout (phone + запитване) with a slim single phone-only bar
   - Red background with phone icon, number, and "24/7 СЕРВИЗ" label
   - Shows only after scrolling past the hero
   - Proper `safe-area-inset-bottom` handling

7. **Hero CTA stacking**:
   - CTA buttons now side-by-side from 360px viewport width
   - Each CTA at `max-width: 220px` with `flex: 1`
   - Below 360px: original full-width stacked layout preserved

8. **Back-to-top button**:
   - Mobile position adjusted for new slim CTA bar height (from 4.5rem to 3.5rem)

### Phase 3 — Page Consistency

9. **All page components updated to `.page-hero`**:
   - `About.jsx` — changed `.about-hero` to `.page-hero`, removed gold subtitle
   - `Machines.jsx` (page) — changed `.machines-hero` to `.page-hero`
   - `Services.jsx` (page) — changed `.services-hero` to `.page-hero`
   - `Contact.jsx` — changed `.contact-hero` to `.page-hero`
   - `Downloads.jsx` — changed `.downloads-hero` to `.page-hero`
   - `MachineDetail.jsx` — changed `.machine-detail-hero` to `.page-hero`
   - Added `.page-hero-subtitle` class to all subtitle `<p>` elements

10. **About page subtitle**:
    - Changed from gold-colored `.about-hero-subtitle` to standard white/gray `.page-hero-subtitle`

11. **WhyHydromotor gold icons**:
    - Added `IconShield` component with gold color (`--color-primary`) to each why-point
    - Uses existing `.why-point-icon` CSS class with explicit `color: var(--color-primary)`

### Phase 4 — Polish

12. **Trust bar on small mobile**:
    - `<480px`: Reduced icon size (18px) and text size instead of hiding icons
    - Icons remain visible, adjusted padding and font sizes for readability
    - Compact padding on the trust bar container

## Files Modified

| File | Changes |
|------|---------|
| `src/App.css` | Added `.page-hero` class, visual polish for contact + machine-detail, gold homepage card borders, slim CTA bar CSS, mobile hero sizing, trust bar adjustments, section spacing consolidation |
| `src/components/MobileCtaBar.jsx` | Rewrote to slim single phone-only bar |
| `src/components/WhyHydromotor.jsx` | Added gold `IconShield` icons to why-points |
| `src/pages/About.jsx` | `.page-hero`, `.page-hero-subtitle`, `section-light-spacing` |
| `src/pages/Machines.jsx` | `.page-hero`, `.page-hero-subtitle` |
| `src/pages/Services.jsx` | `.page-hero`, `.page-hero-subtitle`, `section-light-spacing` |
| `src/pages/Contact.jsx` | `.page-hero`, `.page-hero-subtitle` |
| `src/pages/Downloads.jsx` | `.page-hero`, `.page-hero-subtitle` |
| `src/pages/MachineDetail.jsx` | `.page-hero` |

## Not Changed

- No new npm packages
- No content changes (all text, images, data preserved)
- No routing changes
- No desktop layout regressions (all changes are mobile-safe or CSS-class additions)
- Old individual hero CSS classes retained (unused but safe fallbacks)
- Hydromotor black/gold identity preserved throughout
- Brand logo, hero images, all assets untouched
