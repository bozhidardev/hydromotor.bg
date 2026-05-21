# Hero Fix Summary

## Changes Made

### 1. Hero Image — Re-encoded as High-Quality JPEG
- **File:** `public/images/hero-concrete-pump-sharp.jpg`
- **Source:** 2.5MB PNG → 433KB JPEG (`-q:v 1 -pix_fmt yuv420p`)
- **Dimensions:** 1672×941px (unchanged)
- **Path updated in** `src/components/Hero.jsx`: `hero-slide-1.jpg` → `hero-concrete-pump-sharp.jpg`

### 2. Hero Height
- `min-height` changed from `100dvh` → `clamp(680px, 88dvh, 860px)`
- Prevents content stretching on tall monitors while never going below 680px

### 3. Asymmetric Overlay
- New gradient: 105deg angle, very dark left (0–30%), rapidly fading to near-transparent right (65–80%)
- Concrete pump truck is now clearly visible on the right side
- Bottom vignette: `rgba(10,10,10,0.45)` → `rgba(10,10,10,0.05)` at 50%
- Mobile overlay unchanged (180deg top-to-bottom)

### 4. Mobile Headline Clipping Fix
- `@media (max-width: 767px)` — `.hero h1`:
  - `font-size: clamp(2.5rem, 7vw, 4rem)` (was `clamp(3rem, 6vw, 5rem)`)
  - `line-height: 1.05` (was `1.0`)
  - Added `word-break: break-word` as safety net

### 5. Reduced Top Empty Space (Mobile)
- `@media (max-width: 767px)` — `.hero-inner`:
  - `padding: 2.5rem 1.5rem 2rem` (was `4rem 1.5rem 2rem`)
- `@media (max-width: 480px)` — `.hero-inner`:
  - `padding: 1.5rem 1.25rem 1.5rem` (was `2.5rem 1.25rem 1.5rem`)

### 6. Desktop Text Positioning
- Added `@media (min-width: 768px)` — `.hero-inner { padding-bottom: 4rem }`
- Consumes bottom space in the flex container, shifting content slightly upward

### 7. Removed Mobile Menu Phone CTA
- Removed the `.header-phone-mobile` anchor tag from `src/components/Header.jsx`
- Removed all `.mobile-menu .header-phone-mobile` CSS rules (now dead code)
- Reduced `.mobile-menu` gap from `1.5rem` → `0.75rem`

### 8. Trust Bar Polish
- Desktop: `.hero-trust-item` padding increased from `0.5rem 1rem` → `0.5rem 1.25rem`
- Tablet (768–1024px): `.hero-trust-bar` grid collapses to 3 columns
- Tiny mobile (≤480px): `.hero-trust-item` padding tightened to `0.35rem 0.5rem`, `gap: 0.5rem`

### 9. Build
- `npm run build` passes with **0 errors** (59 modules, 877ms)

## Files Changed
| File | Change |
|------|--------|
| `public/images/hero-concrete-pump-sharp.jpg` | ✅ New high-quality hero image |
| `src/components/Hero.jsx` | ✅ Updated image path |
| `src/App.css` | ✅ 9 edits (height, overlay, spacing, typography, trust bar) |
| `src/components/Header.jsx` | ✅ Removed mobile menu phone CTA |
| `public/images/hero-slide-1.jpg` | ⏭️ Kept (not deleted) |
