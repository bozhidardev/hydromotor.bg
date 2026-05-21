# Hero Fix Plan — hydromotor.bg

## 1. Hero Image Quality (Blurry Image)

### Problem
- **Current file:** `public/images/hero-slide-1.jpg` — 1672×941px, **91KB JPEG** (96% compression from 2.5MB source)
- **Source file:** `/home/awake/.openclaw/media/inbound/clear_hero---4dc6dd25-94d8-4347-bdba-f5bc7762bacf.png` — same 1672×941px, **2.5MB PNG**
- The `-q:v 85` ffmpeg conversion threw away too much data. At 1672px wide stretched to 1920px+ viewports (~115% upscale), compression artifacts are very visible.

### Fix
Re-encode as a high-quality JPEG at ~95% quality. The image is displayed as a CSS `background-image` on `.hero`, so it's cropped/blown up naturally — we need sharp source data.

**Command:**
```bash
ffmpeg -i /home/awake/.openclaw/media/inbound/clear_hero---4dc6dd25-94d8-4347-bdba-f5bc7762bacf.png \
  -q:v 1 -pix_fmt yuv420p \
  /home/awake/.openclaw/workspace/hydromotor.bg/public/images/hero-concrete-pump-sharp.jpg
```

| Flag | Meaning |
|------|---------|
| `-q:v 1` | Highest quality (1-31 scale, 1=best) — produces ~500-700KB file |
| `-pix_fmt yuv420p` | Broad-browser compatible chroma subsampling |

**Alternative (if JPEG still shows artifacts on the concrete textures):** Use WebP (`-c:v libwebp -q:v 95`) for ~same quality at ~400KB, but one extra format to support. JPEG is safer for now.

### Files to change
- **Generate** `public/images/hero-concrete-pump-sharp.jpg`
- **Update** `src/components/Hero.jsx` → change `hero-slide-1.jpg` to `hero-concrete-pump-sharp.jpg`
- **Optionally keep or delete** old `hero-slide-1.jpg`

---

## 2. Top Empty Space

### Problem
Total space before headline text:
- `.hero` → `padding-top: 70px` (desktop) — accounts for fixed header height
- `.hero-inner` → `padding-top: 5rem` (80px on default root font)
- **Sum: 70 + 80 = 150px before any hero text**

This feels like wasted space — the content is pushed too far down.

### Fixes

**A — Reduce `.hero-inner` padding-top (primary fix)**

In `src/App.css`, change within the `.hero-inner` block (desktop):

| Current | New |
|---------|-----|
| No explicit `padding-top` on desktop `.hero-inner` — inherits from `padding: 0 1.25rem` | Add `padding-top: 1rem` on desktop |

Wait — actually the desktop `.hero-inner` has `padding: 0 1.25rem;` (in the base `.hero-inner` rule). The mobile overrides in the media query set `padding: 4rem 1.5rem 2rem`.

So the issue is:
- Desktop: `.hero-inner` has `padding: 0 1.25rem` — only left/right, so `padding-top` is 0. Content vertical positioning is handled by `flex: 1` + `align-items: center`. The "wasted space" reporter may have been mistaken — on desktop the content is vertically centered via flexbox, so there's no wasted "padding-top" per se, but with `min-height: 100dvh` minus 70px header, the centered content ends up with ~150px above due to centering in a tall container.
- Mobile: `.hero-inner` has explicit `padding: 4rem 1.5rem 2rem` — **this** is the wasted 4rem (64px) top padding.

**Actual fix for wasted space:**

**Desktop:**
- The content is centered via flex, so reducing the section height will move content up.
- Change `min-height: 100dvh` → `min-height: clamp(680px, 88vh, 860px)` (see #5 below).
- Centering naturally yields less dead space with a shorter container.

**Mobile (improvement):**
- Change `padding: 4rem 1.5rem 2rem` → `padding: 2.5rem 1.25rem 2rem`
- Also apply at `@media (max-width: 480px)`:
  - Change `padding: 2.5rem 1.25rem 1.5rem` → `padding: 1.5rem 1.25rem 1.5rem`

This cuts mobile top padding by ~1.5rem (24px on mobile 16px root).

### CSS changes needed

In `.hero-inner` base rule, add:
```css
padding-top: 1rem;
```

On desktop the vertical centering from flex handles spacing. On mobile the explicit padding applies.

**Desktop `@media (min-width: 768px)` — add:**
```css
.hero-inner {
  padding-top: 1rem;
}
```

**Mobile `@media (max-width: 767px)` — change:**
```css
.hero-inner {
  padding: 2.5rem 1.5rem 2rem;  /* was 4rem 1.5rem 2rem */
}
```

**Tiny mobile `@media (max-width: 480px)` — change:**
```css
.hero-inner {
  padding: 1.5rem 1.25rem 1.5rem;  /* was 2.5rem 1.25rem 1.5rem */
}
```

---

## 3. Mobile "ХИДРОМОТОР" Clipping Fix

### Problem
- `font-size: clamp(3rem, 6vw, 5rem)` — at 390px viewport: 6vw = 23.4px → clamp gives 3rem = **48px**
- `line-height: 1.0` — text height = 48px
- `letter-spacing: 0.04em` — adds 1.92px of letter-spacing to "ХИДРОМОТОР" (9 chars × 0.04em ≈ 9*0.04*48 = 17.28px total extra width)
- The word is 9 uppercase Cyrillic characters, some wide (Д, О, Р) — at 48px it easily overflows on 390px viewport
- `.hero-inner` has `overflow: hidden` (from parent rules activating on mobile)
- `.hero-content` is the containing block with `max-width: 100%`

### Fix

**A — Reduce font-size on mobile (primary fix)**

Change the clamp:
```css
/* Current */
font-size: clamp(3rem, 6vw, 5rem);

/* New */
font-size: clamp(2.5rem, 7vw, 5rem);
```

At 390px viewport: 7vw = 27.3px → clamp gives **2.5rem = 40px** (was 48px). This is more compact and less likely to overflow.

**B — Increase line-height slightly for safe rendering**

```css
/* Current */
line-height: 1.0;

/* New */
line-height: 1.05;
```

This doesn't add much visual difference but prevents vertical clipping if the parent has `overflow: hidden`.

**C — Mobile-only override to ensure no clipping**

Add inside `@media (max-width: 767px)`:
```css
.hero h1 {
  font-size: clamp(2.2rem, 8vw, 3rem);
  line-height: 1.05;
  word-break: break-word; /* safety net for extreme small screens */
}
```

---

## 4. CTA Hierarchy Cleanup

### Problem
- Desktop header: phone CTA ✅ — clean, works well
- Mobile menu drawer: has a large red `.header-phone-mobile` block at the bottom — competes with the sticky MobileCtaBar that also shows the phone number
- Hero has two CTAs: "Поискай оферта" (primary) and "24/7 Сервиз" (outline)

### Fix

**Remove the phone CTA from the mobile menu drawer.**

The slim sticky `MobileCtaBar` already provides 24/7 access after scrolling past the hero. Having both is redundant and creates visual competition.

In `src/components/Header.jsx`:

**Remove these lines** from the mobile menu section (inside the `.mobile-menu div`):
```jsx
<a href="tel:0878553273" className="header-phone-mobile" onClick={closeMenu}>
  <span className="header-phone-label"><IconPhone size={12} /> Свържете се с нас</span>
  <span className="header-phone-number">0878 553 273</span>
</a>
```

Also remove the `gap` from `.mobile-menu` to account for the removal — the nav links should still be spaced properly. The `.mobile-menu` already has `display: flex; flex-direction: column; gap: 1.5rem;` — remove `gap: 1.5rem` and use `gap: 0.75rem` instead (tighter, since we no longer need to reserve bottom space for the CTA):

```css
.mobile-menu {
  gap: 0.75rem;  /* was 1.5rem */
}
```

Additionally, the `.mobile-menu .header-phone-mobile` CSS rule can be removed (it becomes dead code).

---

## 5. Hero Height

### Problem
- Currently `min-height: 100dvh` — takes the full viewport, pushes content down
- On desktop this is unnecessarily tall; on tall monitors (>900px) content gets lost

### Fix

In `src/App.css`, change `.hero`:

```css
/* Current */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
}

/* New */
.hero {
  min-height: clamp(680px, 88vh, 860px);
  min-height: clamp(680px, 88dvh, 860px);
}
```

This:
- Never below 680px (enough for logo, content, trust bar)
- Uses 88% of viewport (not full 100%)
- Caps at 860px (prevents extreme stretching on ultrawide monitors)

The `clamp` ensures both CSS property fallback and modern dvh support.

---

## 6. Asymmetric Overlay

### Problem
- Current overlay is a full linear gradient going left-to-right on desktop
- `linear-gradient(90deg, rgba(10,10,10,0.92) 0%, ..., transparent 85%)`
- This darkens the entire image uniformly from left to right

### Fix
Make the overlay asymmetric: left side darker (for text readability), right side significantly lighter (so the concrete pump truck is visible).

In `src/App.css`, `.hero::before`:

```css
/* Current */
background:
  linear-gradient(
    90deg,
    rgba(10, 10, 10, 0.92) 0%,
    rgba(10, 10, 10, 0.75) 25%,
    rgba(10, 10, 10, 0.35) 50%,
    rgba(10, 10, 10, 0.08) 70%,
    transparent 85%
  ),
  linear-gradient(
    0deg,
    rgba(10, 10, 10, 0.4) 0%,
    transparent 40%
  );

/* New — asymmetric: darker left, much lighter right */
background:
  linear-gradient(
    105deg,
    rgba(10, 10, 10, 0.92) 0%,
    rgba(10, 10, 10, 0.78) 30%,
    rgba(10, 10, 10, 0.30) 50%,
    rgba(10, 10, 10, 0.08) 65%,
    rgba(10, 10, 10, 0.02) 80%
  ),
  linear-gradient(
    0deg,
    rgba(10, 10, 10, 0.45) 0%,
    rgba(10, 10, 10, 0.05) 50%
  );
```

This gives:
- **Left 30%**: very dark → text is crisp on any background
- **Mid transition (30–50%)**: rapid fade so the truck behind starts showing through
- **Right 50%+**: barely any dark overlay → the concrete pump and background scene are clearly visible
- **Bottom fade**: gentle vignette for grounding

On mobile, the overlay becomes `linear-gradient(180deg, ...)` — this is fine, it darkens top-to-bottom so text stays readable. Keep the mobile override as-is.

---

## 7. Hero Text Positioning — Slightly Upward

### Problem
- Content is vertically centered in the flex container via `align-items: center`
- The trust bar sits below the text, pushing the visual center of gravity slightly down
- We want the content to appear slightly above the absolute middle

### Fix

Change the flex alignment on `.hero-inner`:

```css
/* Current */
.hero-inner {
  align-items: center;
}

/* New */
.hero-inner {
  align-items: center;
}
```

🤔 CSS-only fix doesn't work with `align-items: center` + trust bar below. Instead:

**Option A — Add negative margin or translate to the content:**
```css
.hero-content {
  margin-top: -2rem; /* pull content slightly up */
}
```

**Option B — Use `justify-content` if we separate content from trust bar:**

Actually, looking at the Hero.jsx structure:
```
.hero (section, flex, column)
  .hero-overlay (absolute)
  .hero-inner (flex, items-center, flex:1)
    .hero-content
  .hero-trust-bar (positioned below)
  .hero-scroll-indicator (absolute bottom)
```

The `.hero-inner` has `flex: 1` and the trust bar is a sibling. Since `.hero` is `flex-direction: column`:
- `.hero-inner` takes `flex: 1` = all available space
- `.hero-trust-bar` takes its natural height at bottom
- Content is centered within `.hero-inner`

**Add a small upward bias:**
```css
.hero-inner {
  padding-bottom: 5rem;  /* was 0 — shifts visual center up by removing bottom slack */
}
```

Or simpler:
```css
.hero-content {
  transform: translateY(-1.5rem);
  /* Or: */
  margin-top: -1.5rem;
}
```

Option: Keep `align-items: center` but also add `padding-bottom: 3rem` to `.hero-inner`. Since `.hero-inner` has `flex: 1`, adding bottom padding reduces the centering area, shifting content slightly upward.

**Preferred fix:** Add `padding-bottom: 4rem` to `.hero-inner` on desktop:
```css
/* Inside @media (min-width: 768px) */
.hero-inner {
  padding-bottom: 4rem;  /* shifts content upward by consuming bottom space */
}
```

---

## 8. Trust Bar Polish

### Problem
- Items are tightly packed
- On smaller viewports the 5-column grid collapses to 3 then 2 columns, hiding items
- Text sizing is already small (0.7rem title, 0.6rem subtitle)

### Fixes

**A — Slightly more spacing between items**
```css
/* Current */
.hero-trust-item {
  padding: 0.5rem 1rem;
  gap: 0.85rem;
}

/* New */
.hero-trust-item {
  padding: 0.5rem 1.25rem;
  gap: 0.85rem;
}
```

**B — On desktop, use flex-wrap instead of grid so items wrap more gracefully**
Keep the grid on desktop (5 items works well at ≥1024px), but on slightly smaller screens (768-1024px), switch to wrapping:

```css
@media (max-width: 1024px) {
  .hero-trust-bar {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**C — Tighter vertical padding at mobile breakpoints**
```css
/* On @media (max-width: 480px) — already good, but add: */
.hero-trust-item {
  padding: 0.35rem 0.5rem;
  gap: 0.5rem;
}
```

**D — Remove the scroll-fade gradient on hero trust bar (it doesn't need it since it scrolls with the hero)**
The `::after` gradient on `.trust-bar` (the non-hero one) is fine. Confirm hero-trust-bar doesn't have one — looking at the CSS, `.hero-trust-bar::after` is the gold accent stripe, not a fade. ✅ All good.

---

## 9. Image Re-encoding Process (Document)

### Exact steps to run

```bash
# 1. Generate high-quality JPEG from the source PNG
#    - q:v 1 = highest quality in ffmpeg JPEG encoding
#    - yuv420p = broad compatibility
ffmpeg -i /home/awake/.openclaw/media/inbound/clear_hero---4dc6dd25-94d8-4347-bdba-f5bc7762bacf.png \
  -q:v 1 -pix_fmt yuv420p \
  /home/awake/.openclaw/workspace/hydromotor.bg/public/images/hero-concrete-pump-sharp.jpg

# 2. Update the image reference in Hero.jsx
#    Change:  asset('images/hero-slide-1.jpg')
#    To:      asset('images/hero-concrete-pump-sharp.jpg')

# 3. Clean up old file (optional)
rm /home/awake/.openclaw/workspace/hydromotor.bg/public/images/hero-slide-1.jpg
```

**File resolution:** 1672×941px (unchanged from source — upscaling is handled by CSS `background-size: cover`)

**Expected output:** ~500-700KB JPEG (vs 91KB current, vs 2.5MB PNG source)

---

## Summary of All Changes

| # | Change | File | Impact |
|---|--------|------|--------|
| 1 | Re-encode hero image as high-quality JPEG | `public/images/` + `Hero.jsx` path | Sharp image |
| 2 | Reduce `.hero-inner` padding-top on mobile | `App.css` media queries | Less dead space |
| 3 | Reduce `clamp()` lower bound on h1 font-size, add `overflow` safety | `App.css` `.hero h1` | No headline clipping |
| 4 | Remove mobile menu phone CTA | `Header.jsx` + `App.css` | Clean CTA hierarchy |
| 5 | Change hero `min-height` from `100dvh` to `clamp(680px, 88vh, 860px)` | `App.css` `.hero` | Better content density |
| 6 | Asymmetric overlay — left dark, right light | `App.css` `.hero::before` | Truck visible, text readable |
| 7 | Move content slightly upward | `App.css` `.hero-inner` padding-bottom | Better visual balance |
| 8 | Trust bar spacing tweaks | `App.css` `.hero-trust-item` padding | Polished look |
| 9 | Document re-encoding command | This file | Repeatable process |

### No-dependency constraint ✅
All changes use existing CSS/JS/React features. No new packages.

### Desktop must not break ✅
All sizing changes use `clamp()` with desktop-friendly upper bounds. Desktop `.hero-inner` already uses flex centering, unaffected by padding changes. Asymmetric overlay only improves desktop appearance.

### Build must pass ✅
No JSX restructuring. No new imports. Image file is just a resource swap.
