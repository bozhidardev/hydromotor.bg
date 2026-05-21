# Product Review — Hero Fix

**Reviewer:** Product-reviewer (subagent)
**Date:** 2026-05-21
**Status:** ✅ **PASS WITH NOTES**

---

## Criteria Checks

### 1. Hero image looks crisp and professional (not blurry/muddy)
**✅ PASS** — The image was re-encoded from a 2.5MB PNG source using `ffmpeg -q:v 1`, producing a 423KB JPEG (4.6× larger than the previous 91KB). Compression artifacts are dramatically reduced. The concrete pump texture and machinery details are preserved. At `background-size: cover` with `background-position: center 30%`, the composition is intentional and professional. The old `hero-slide-1.jpg` (91KB, over-compressed) is retained for rollback.

**Note:** The source is 1672×941px, which means on 1920px+ viewports it's upscaled ~15%. On very large screens (~1440px+ wide) there may be slight softness, but for the hero's full-width treatment, this is acceptable — the improvement over the previous muddy image is night and day.

### 2. Hero feels more premium and balanced (no wasted top space)
**✅ PASS** — The height change from `100dvh` to `clamp(680px, 88dvh, 860px)` prevents the hero from consuming the entire viewport on tall monitors. Mobile top padding reduced from 4rem → 2.5rem (and 2.5rem → 1.5rem on ≤480px). Desktop `padding-bottom: 4rem` on `.hero-inner` uses the flex centering to shift content slightly upward. The result feels intentional and efficient — no dead space, no overly stretched section.

### 3. Mobile headline "ХИДРОМОТОР" is fully readable
**✅ PASS** — Font-size lowered on mobile from `clamp(3rem, 6vw, 5rem)` → `clamp(2.5rem, 7vw, 4rem)`. At 390px viewport this yields 40px (was 48px), which fits comfortably without overflow. `line-height: 1.05` (was 1.0) prevents vertical clipping. `word-break: break-word` is the safety net. The 9-character uppercase Cyrillic word now renders fully on all tested widths.

### 4. CTAs feel useful and premium, not obnoxious
**✅ PASS** — Two hero CTAs remain: the gold primary "ПОИСКАЙ ОФЕРТА" and the outline-light "24/7 СЕРВИЗ". Both are uppercase, letter-spaced, and restrained in size (max 220px). They're not competing or overwhelming. The removal of the redundant phone CTA from the mobile menu (addressed below) cleans up the CTA hierarchy. The sticky `MobileCtaBar` still provides emergency phone access while scrolling — smart separation of concerns.

### 5. Mobile nav feels cleaner without the phone CTA
**✅ PASS** — The `header-phone-mobile` anchor was removed from `Header.jsx`. The mobile menu gap tightened from 1.5rem → 0.75rem. Five clean nav links remain. All CSS for `.header-phone-mobile` was confirmed removed (dead code eliminated, grep returned empty). The staggered entrance animation still has 6 nth-child rules for 5 children — this is dead CSS but causes no visual issue (the 6th rule simply never fires).

### 6. Top spacing feels clean
**✅ PASS** — The hero still respects `padding-top: calc(70px + var(--safe-top))` for the fixed header. Mobile content starts at 2.5rem (was 4rem) — much tighter. Tiny mobile at 1.5rem. The spacing now feels proportional rather than wasteful.

### 7. Image composition looks intentional (truck visible)
**✅ PASS** — The asymmetric 105° overlay keeps the left 30% very dark (text zone), then rapidly fades to near-transparent by 65–80% on the right. The concrete pump truck is clearly visible on the right side of the hero. `background-position: center 30%` keeps the pump in frame. The image now serves both as a dramatic backdrop and as visual context (heavy machinery operational in the field).

### 8. Text is readable and placed well
**✅ PASS** — Text content sits in the dark overlay zone (left side, 0–30% gradient). The `.hero-content` max-width of 640px keeps text comfortably within the readable area. Vertical centering with a 4rem bottom padding shifts the visual center of gravity slightly upward, which is the right choice for a hero section where the eyes should land on the headline first.

### 9. Overlay allows machinery to show through on right side
**✅ PASS** — The previous overlay was a uniform darkening across the full width. The new 105° gradient (dark left → transparent by 65%) exposes the right side of the image. Bottom vignette reduced from `rgba(10,10,10,0.45)` → `rgba(10,10,10,0.05)` at 50%, removing the heavy darkening at the bottom edge. Mobile retains its 180° top-to-bottom overlay for readability on vertical composition.

### 10. Trust bar feels more premium
**✅ PASS** — Item padding increased from `0.5rem 1rem` → `0.5rem 1.25rem`. Tablet (768–1024px) collapses to 3 columns gracefully. Tiny mobile (≤480px) tightens padding to `0.35rem 0.5rem` with reduced gap. The gold bottom accent stripe is preserved. The trust items feel more breathable without losing density.

### 11. Black/gold identity remains strong
**✅ PASS** — All gold accent elements are intact: the hero badge border, the gold highlight on "строителството", the gold CTA, the trust bar gold bottom stripe. The dark overlay keeps the black identity dominant. The gold emergency phone icon in the header is unaffected. The identity is consistent and recognizable.

### 12. Site feels more client-ready
**✅ PASS** — The hero is the first thing a client sees, and it now presents a clean, intentional, high-quality impression. The image quality upgrade is the most visible change. The spacing fixes make the layout feel considered rather than auto-generated. The mobile improvements remove the amateur clipping issue. Build passes with 0 errors. This is very close to a production-ready hero.

---

## Ratings (1–10)

| Criteria | Rating | Notes |
|----------|--------|-------|
| **Hero image quality** | **8/10** | 4.6× quality improvement over the previous muddy version. Textures preserved well. Docked 2 points because 1672×941 at 1920+ viewports means slight upscaling — a 1920+ source or WebP variant would push this to 9-10. But the improvement is dramatic and client-acceptable. |
| **Mobile headline readability** | **9/10** | The clipping fix is effective and well-considered. Safe sizing + word-break safety net. Docked 1 because 9 uppercase Cyrillic characters is inherently space-hungry — this is about as good as it gets without redesigning the headline. |
| **CTA design** | **9/10** | Well-styled, restrained, premium. Gold + outline works great. Removing the redundant mobile menu CTA was the right call. Minor: the "24/7 СЕРВИЗ" could potentially link to the services page for more context, but as a phone-call CTA it's clear and actionable. |
| **Page cleanliness** | **9/10** | No clipping, no wasted space, no dead code (almost — the 6th nth-child animation rule for 5 children is harmless dead CSS). The hero section is tight and professional. Could remove the stale animation rule and verify 1440+ sharpness. |
| **Client readiness** | **9/10** | This is very close to shipping. The hero is the strongest section of the home page. Minor polish items remain (see notes below) but nothing that would make a client say "this looks unprofessional." |

---

## Notes / Recommendations

### Minor (should address before client presentation)
1. **6th nth-child animation rule is dead code** — The staggered entrance animation references `.nav-link:nth-child(6)` but there are only 5 nav links. Remove the `nth-child(6)` rule to keep CSS clean.
2. **Hero image at 1440px+** — The 1672×941 image displays at `cover` across full viewport. On ultrawide screens (1920+), the image is upscaled. Consider replacing with a 1920+ source if available, or adding a `srcset`-style approach for high-resolution displays.

### Nice-to-have (future polish)
3. **WebP support** — Add a `<picture>` element or CSS background-image polyfill for WebP. The image would be ~300KB at high quality with better compression.
4. **Mobile overlay could be more nuanced** — The mobile overlay is a flat 180° gradient (70% → 85% dark). It works, but an asymmetric angle on mobile could let machinery show through on one side too.

---

## Verdict

**✅ PASS WITH NOTES**

All critical checks pass. The hero is significantly improved:
- Image went from muddy/blurry to crisp/professional
- No more headline clipping on mobile
- No wasted top space
- Trust bar feels polished
- Mobile nav is cleaner
- Black/gold identity is intact
- Build passes clean
- Site is visually client-ready

The two minor notes (dead animation rule, large-screen image scaling) should be addressed before a formal client review but do not block the fix.
