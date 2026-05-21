# Desktop Hero — Product Review

**Reviewer:** Product-reviewer (subagent)
**Date:** 2026-05-21
**Change reviewed:** `.hero { min-height: clamp(680px, 88vh, 860px) }` → `.hero { min-height: 100svh }`
**Files changed:** `src/App.css` (single line, line 2277)
**Build:** ✅ Clean (59 modules, 904ms)

---

## Criteria Evaluation

### 1. Desktop hero feels like one complete first-screen composition

**PASS ✅**

On a 1920×1080 screen, the hero now fills the entire 1080px viewport. The layered elements — dark gradient overlay, grid texture overlay (.hero-overlay), vertical-centered hero content, horizontal trust bar, and bounce-animated scroll indicator — compose a single, intentional cinematic frame. The dark background (`var(--color-bg-dark)`) creates a contained visual space with no light-colored content bleeding in from below.

**Before the change:** The 860px `clamp` ceiling left ~220px of the light cream (`#f0ede8`) Machines section visible at the bottom of the viewport, breaking the dark hero composition.

**After the change:** The Machines section (light background) starts below the fold. The first screen is a complete dark composition with gold accents throughout.

---

### 2. Trust bar sits near bottom of PC viewport

**PASS ✅**

The flex column layout (`display: flex; flex-direction: column`) with `.hero-inner { flex: 1 }` naturally pushes the trust bar to the bottom of the viewport. The trust bar itself is ~80px tall (1.25rem top/bottom padding + content). The `.hero-trust-bar` uses `background: rgba(12, 12, 12, 0.95)` with `backdrop-filter: blur(16px)` — a dark, slightly transparent bar that anchors the composition at the viewport baseline.

The scroll indicator (`position: absolute; bottom: 1.5rem`) sits at the very bottom edge of the hero, below the trust bar, providing a subtle "scroll for more" nudge.

**Layout breakdown (1920×1080):**

| Element | Position from top | Height |
|---|---|---|
| Fixed header | 0px | 70px |
| Hero content area (flex: 1) | 70px | ~900px (vertically centered) |
| Trust bar | ~970px | ~80px |
| Scroll indicator | ~1060px (bottom: 1.5rem) | ~20px |
| **Hero total** | — | **1080px (100svh)** |
| Machines section | 1080px | Below fold |

---

### 3. Next section (machines) no longer intrudes early

**PASS ✅**

The `<Machines />` component is rendered immediately after `<Hero />` in `Home.jsx`. With `100svh` = 1080px, the Machines section starts at exactly 1080px from the page top — below the viewport. Scrolling is required to reveal it.

**Before:** The 860px clamp ceiling caused ~220px of the light Machines section to peek into the viewport, making the page feel like the hero was "cut off" and the sections were blending prematurely.

**After:** Clean, intentional content boundary. The first scroll reveals the Machines section as a distinct new content block. The `.scroll-reveal` animation on the Machines section (if animated on scroll) benefits from this clear visual entry.

---

### 4. Hero image still crisp and cinematic

**PASS WITH NOTES** ✅

**Image details:**
- `public/images/hero-concrete-pump-sharp.jpg`
- 1672 × 941 px (16:9 ≈ 1.777 aspect ratio)
- 433 KB (JPEG, baseline, quality ~95%)
- CSS: `background-size: cover`, `background-position: center 30%`

At 1920×1080 (1.778:1), the image is upscaled ~15% from its native 1672px width. The aspect ratio match is near-perfect (1.777 vs 1.778), so there's minimal cropping — only ~2px of vertical crop difference across 1080px height, negligible.

The image is high-quality with preserved detail on machinery textures, concrete pump components, and the truck. It's dramatically better than a heavily compressed alternative. The `center 30%` positioning keeps the concrete pump truck in frame and visible through the right side of the gradient overlay.

**⚠️ Note for larger screens (1440p / 2560×1440):** The 1672px source will be upscaled significantly (to 2560px wide) on 1440p displays. Textures may soften. Not a blocker, but a higher-resolution source (2560+ wide) or a WebP variant would future-proof the hero for Retina and high-res desktop monitors.

---

### 5. Text readable, not lost in too-tall hero

**PASS ✅**

**Content volume:**
- Badge: 1 line (~20px)
- H1 "ХИДРОМОТОР": 1 line (~80px)
- Subtitle: 1 line (~24px)
- Body text: 2 lines (~52px)
- Two CTAs: 2 rows (~80px on mobile column, ~56px on desktop row)
- **Total content stack:** ~260–300px

**Available vertical space above the trust bar:** ~930px (1080 − 70 header − 80 trust bar)

**Vertical centering effect:** The `flex: 1` + `align-items: center` on `.hero-inner` centers the ~300px content block within ~930px of space. This leaves roughly 315px above and below the content block.

**Is this too tall?** At 1920×1080, the spacing is dramatic but not empty — it reads as intentional cinematic breathing room. The hero badge + large headline + subtitle + body + CTAs fill the visual field well. The gradient overlay adds depth that occupies the "empty" zones.

**At 1440p (2560×1440):** Content would be centered in ~1290px of space — ~645px above and below. This is a lot of empty space. The composition may feel thin. Consider adding a `max-height: 900px` or `max-height: 1000px` ceiling for very tall screens if client feedback indicates it feels sparse. The plan acknowledges this as a future consideration.

**Readability:** The 105° overlay gradient keeps the left 0–30% zone very dark (`rgba(10,10,10,0.92)` → `0.78`), ensuring white text has strong contrast. The text block's `max-width: 640px` keeps it in this dark zone. White text at sizes from 0.68rem (badge) to 5rem (h1) is fully legible against the dark background.

---

### 6. Black/gold identity strong

**PASS ✅**

All gold accent elements are intact:

| Element | Gold detail |
|---|---|
| `.hero-badge` | Border: `rgba(var(--color-primary-rgb), 0.25)` |
| `.hero-highlight` („строителството") | `color: var(--color-primary)` |
| Primary CTA button | Gold background (`.btn-primary`) |
| `.hero-trust-icon` SVGs | `color: var(--color-primary)` |
| Trust bar bottom stripe (via `::before`) | Gold accent (confirmed in CSS) |
| Scroll indicator (subtle) | White at 0.2 opacity — unobtrusive |

The dark hero background + gold accents communicates "premium industrial" — fitting for a heavy machinery company. The identity is consistent with the brand positioning throughout the rest of the site.

---

### 7. Mobile not regressed

**PASS ✅**

Mobile media queries (`max-width: 767px`) correctly override `min-height: 100svh` with `min-height: auto`, reverting the hero to content-defined height.

**Mobile-specific checks:**
- ✅ `.hero { min-height: auto }` at ≤767px → hero shrinks to fit content
- ✅ `.hero { padding-top: calc(70px + var(--safe-top)) }` → header clearance + notch safe area
- ✅ `.hero h1` at `clamp(2.5rem, 7vw, 4rem)` → fits at all mobile widths
- ✅ `.hero-trust-bar { overflow-x: auto }` → horizontal scroll on trust items unchanged
- ✅ `.hero::before` → flattened 180° gradient (top-to-bottom) on mobile for consistent readability
- ✅ `.hero-scroll-indicator { display: none }` → hidden on mobile
- ✅ `max-width: 480px` → further tightened padding and font scaling

**No behavioral regression.** The hero on mobile looks and behaves exactly as before.

---

## Edge Cases & Observations

### Very tall screens (1440p+)
At 2560×1440, `100svh` = 1440px. The content stack (~300px) is centered in ~1290px of vertical space. This creates a dramatic but potentially sparse composition. The plan marks this as acceptable but notes a `max-height: 900px` ceiling could be added later if needed. Not a blocker — many premium brand sites use full-viewport heroes at all sizes.

### Safari SVG viewport bug
Not applicable — the hero uses a JPEG background image with `background-size: cover`, not an SVG. No `100svh` rendering issues on Safari (supported since Safari 15.4, 2022).

### Docked dev tools / small desktop viewports
If the viewport is less than the content height, `min-height: 100svh` still applies — the hero extends beyond the viewport. Scroll behavior is natural. No layout breakage.

### Horizontal overflow
`.hero { overflow: hidden }` prevents any horizontal scroll from the hero area. The trust bar's horizontal scroll on mobile is explicitly allowed via `overflow-x: auto` on `.hero-trust-bar` — this is intentional and exists only on mobile.

---

## Summary: Before vs After

| Aspect | Before (`clamp(680px, 88vh, 860px)`) | After (`100svh`) |
|---|---|---|
| Hero height at 1920×1080 | 860px (capped) | 1080px (fills viewport) |
| Trust bar position | ~780px (220px above bottom) | Bottom of viewport |
| Machines section visible? | ~220px peeking at bottom | Below fold, needs scroll |
| First-screen feel | Cut off, light section intrudes | Complete cinematic composition |
| Mobile behavior | `min-height: auto` | `min-height: auto` (unchanged) |
| Build | Passes | Passes |
| Code change | — | One line in App.css |

---

## Rating by Check Criteria

| # | Criterion | Status | Notes |
|---|---|---|---|
| 1 | Complete first-screen composition | ✅ PASS | Hero fills viewport, no light content bleed |
| 2 | Trust bar near viewport bottom | ✅ PASS | Flex column pushes it to baseline |
| 3 | Machines section doesn't intrude | ✅ PASS | Starts below fold at 1080px |
| 4 | Hero image crisp and cinematic | ✅ PASS WITH NOTE | 1672px source upscaled ~15% at 1920px; fine for target but 1440p may soften |
| 5 | Text readable in tall hero | ✅ PASS | Dark overlay zone covers 0–30% of width, content centered, strong contrast |
| 6 | Black/gold identity strong | ✅ PASS | All gold accents preserved, identity consistent |
| 7 | Mobile not regressed | ✅ PASS | `min-height: auto` overrides at ≤767px; behavior identical to before |

---

## Verdict

**PASS** ✅

The `100svh` change achieves its stated goals:

1. **Desktop hero fills the viewport** — the trust bar sits at the bottom of the screen, creating a polished first-screen composition.
2. **The Machines section no longer intrudes** — clean content separation with a natural scroll boundary.
3. **Mobile is fully preserved** — the media query override (`min-height: auto`) keeps mobile behavior unchanged.
4. **Build passes** — zero warnings, zero errors.
5. **Code change is minimal and clean** — one line in `src/App.css`, no new dependencies, no structural changes.

### Minor non-blocking observations

- **Hero image source (1672×941) is adequate for 1080p but softens at 1440p+** — not a blocker for this change, but worth upgrading to a wider source or WebP variant at a future date.
- **1440p screens get a very tall hero (~1440px)** — the centered content may feel sparse. A `max-height: 1000px` ceiling could be added if testing reveals this is an issue for the client. The current implementation is acceptable and many premium sites use this pattern.

Neither observation is a regression — both are inherent to using `100svh` and are acknowledged in the plan as acceptable trade-offs.
