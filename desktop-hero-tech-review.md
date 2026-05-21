# Desktop Hero — Technical Review

**Change reviewed:** `.hero { min-height: clamp(680px, 88vh, 860px) }` → `.hero { min-height: 100svh }`
**Commit:** HEAD (`2854896`)
**File:** `src/App.css` line 2276

---

## Build

| Check | Result |
|---|---|
| `npm run build` | ✅ Passes cleanly (59 modules, 866ms) |
| No warnings | ✅ |
| Dist output present | ✅ `dist/index.html`, `dist/assets/index-btlG0srL.css`, `dist/assets/index-Dvf4bQAL.js` |

---

## CSS Structure

```
.hero (flex column, min-height: 100svh, overflow: hidden, padding-top: 70px)
├── .hero-overlay — absolute, z-index:0 (gradient)
├── .hero-inner — flex:1, z-index:2 (centers badge/h1/subtitle/body/actions)
├── .hero-trust-bar — z-index:2 (5 trust items, ~80px tall)
└── .hero-scroll-indicator — absolute, bottom:1.5rem, z-index:3
```

- `flex: 1` on `.hero-inner` pushes the trust bar to the bottom of the viewport.
- `.hero-scroll-indicator` is absolutely positioned at the bottom edge.
- No layout change beyond the `min-height` value.

---

## Viewport Analysis

### 1920×1080 (target desktop)
- `100svh` = 1080px (on desktop, `svh` equals `vh` since no dynamic toolbars)
- `.hero` height: 1080px (content is shorter, min-height kicks in)
- Padding-top: 70px (header space)
- `.hero-inner` (flex: 1): ~930px available after trust bar (~80px)
- Content (badge + h1 + subtitle + body + actions): ~300–400px, vertically centered
- **Trust bar:** Near bottom of viewport, above the scroll indicator
- **Next section:** Below the fold — scroll is needed to see it
- ✅ **Hero fills viewport as intended**

### 2560×1440 (1440p+)
- `100svh` = 1440px
- Hero is tall (trust bar at bottom, plenty of vertical space)
- Content is centered in a large area — dramatic but acceptable
- ✅ **Hero fills viewport, trust bar at bottom**

### Mobile 375×667 & 414×896
- `@media (max-width: 767px)` overrides: `.hero { min-height: auto; }`
- `min-height: auto` means the hero sizes to its content
- ✅ **No regression — mobile behavior unchanged**

---

## Hero Image Quality

| Property | Value |
|---|---|
| File | `public/images/hero-concrete-pump-sharp.jpg` |
| Resolution | 1672×941 (~16:9) |
| File size | 433 KB |
| CSS sizing | `background-size: cover` (inline style) |
| CSS positioning | `background-position: center 30%` |

- The image aspect ratio (1672/941 ≈ 1.777) closely matches 1920×1080 (1.778), so at the target viewport the image fills perfectly with negligible cropping.
- At taller viewports (1440p), `cover` scales the image up while maintaining aspect ratio. The 30% vertical offset biases the crop to show more of the sky portion — intentional for a cinematic look.
- ❓ **Note:** 433 KB is acceptable for a hero image, though a WebP variant (~150–200 KB) could improve performance at no visible quality loss. Not a blocker.

---

## Horizontal Overflow

- `.hero { overflow: hidden }` prevents any horizontal scroll from the hero section
- No global `overflow-x: hidden` on `<body>`, but the hero's own containment is sufficient
- Trust bar: on mobile it scrolls horizontally (`overflow-x: auto` with no scrollbar), on desktop it's `overflow-x: visible` with `justify-content: space-around`
- ✅ **No horizontal overflow**

---

## Edge Cases

### Viewport < 100svh (unusual, e.g. dev tools docked)
- If the viewport is shorter than `100svh` content, `.hero` uses `min-height: 100svh` which is taller than the viewport. The hero will extend below the fold, which is expected behavior — the hero is at minimum 100% of the screen height.
- This is a *min-height* not a *height* — content can make it taller, but it can't be shorter.

### Safari on iOS (mobile)
- `svh` is well-supported (Safari 15.4+). On mobile `@media (max-width: 767px)` overrides to `auto`, so `svh` doesn't apply on mobile anyway.
- ✅ Safe for desktop Safari.

### Browser support for `svh`
- Chrome 89+, Firefox 89+, Safari 15.4+, Edge 89+
- Widely supported for years. ✅

---

## Verdict

**PASS** ✅

The change is clean, well-contained, and produces the intended effect:
1. Desktop hero fills the viewport at all common sizes (1080p, 1440p+)
2. Trust bar sits near the bottom
3. Mobile is untouched (`min-height: auto` via media query)
4. Hero image remains crisp (`background-size: cover` at ~16:9)
5. No horizontal overflow
6. Build succeeds with no warnings

### Optional improvement (not a blocker)
- Convert hero JPEG to WebP/AVIF for bandwidth savings. Not part of this change.
