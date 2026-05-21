# Phase 1 Plan — Quick Wins

All items are independent. No code edits — plan only.

---

## 1.1 Add favicon to `index.html`

**Files:** `public/images/favicon-32.png` (exists), `public/images/favicon-180.png` (exists)

**Action:** Insert in `<head>` (after the OG meta tags, before the preconnect links):

```html
<link rel="icon" type="image/png" sizes="32x32" href="%BASE_URL%images/favicon-32.png" />
<link rel="apple-touch-icon" href="%BASE_URL%images/favicon-180.png" />
```

**Why:** The favicon files exist but are never linked — current deployment has no favicon at all.

---

## 1.2 Remove dead `.trust-bar` CSS

**File:** `src/App.css` — lines 573–658 (approx.)

**Blocks to remove (no component uses `class="trust-bar"` — only `hero-trust-bar` is used, which is a separate rule set):**

| Lines | Selector | Notes |
|-------|----------|-------|
| 571–572 | `/* ===== TRUST BAR ===== */` | Comment header |
| 573–580 | `.trust-bar { … }` | Background, border, padding, overflow |
| 581–592 | `.trust-bar-track { … }` | Flex, gap, overflow, scrollbar, max-width |
| 593–596 | `.trust-bar-track::-webkit-scrollbar` | Display none |
| 597–608 | `.trust-item { … }` | Flex, font, color, shrink |
| 609–613 | `.trust-item-icon { … }` | Color |
| 614–618 | `.trust-item:hover { … }` | Color |
| 619–624 | `@media (min-width: 768px) { .trust-bar-track { … } }` | Justify space-between |
| 625–641 | `/* Scroll-fade edge on mobile */ .trust-bar { position: relative } .trust-bar::after { … }` | Pseudo-element fade |
| 642–647 | `@media (min-width: 768px) { .trust-bar::after { display: none } }` |
| 648–658 | `@media (max-width: 767px) { .trust-bar-track { … } }` | Touch scrolling, gap |

**Verification:** `grep -rn 'trust-bar\|trust-bar-track\|trust-item' src/` only finds `.hero-trust-bar` (in Hero.jsx and App.css), confirming the plain `.trust-bar` block is dead.

**Note:** `hero-trust-bar` (lines ~2347–2651) is **live** — do **not** touch those.

---

## 1.3 Remove dead `.dark-grid-pattern` CSS

**File:** `src/App.css` — lines 92–105

**Block to remove:**

```css
/* Subtle diagonal grid pattern for dark sections */
.dark-grid-pattern {
  position: relative;
}

.dark-grid-pattern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}
```

**Verification:** `grep -rn 'dark-grid-pattern' src/` only returns hits in `App.css` itself — no component references it. Confirmed dead.

---

## 1.4 Remove 6 TODO comments from production code

| File | Line | Content | Action |
|------|------|---------|--------|
| `src/pages/Machines.jsx` | 7 | `// TODO: All machine images (400×284) should be replaced with 800×600+ versions` | Delete line |
| `src/pages/Machines.jsx` | 25 | `{/* TODO: Replace putzmeister-p2.jpg with a proper brand logo image */}` | Delete line |
| `src/pages/MachineDetail.jsx` | 7 | `// TODO: All machine images (400×284) need to be replaced with 800×600+ versions` | Delete line |
| `src/pages/Services.jsx` | 57 | `{/* TODO: Replace service-workshop.jpg with 1600×900 image */}` | Delete line |
| `src/pages/About.jsx` | 36 | `{/* TODO: Replace about-img-1.jpg with 1200×600+ image */}` | Delete line |
| `src/pages/About.jsx` | 43 | `{/* TODO: Replace about-img-2.jpg with 1200×600+ image */}` | Delete line |

**Why:** These are image-replacement TODOs that will never be actioned in the current scope. They add noise.

---

## 1.5 Delete orphan images

**Files not referenced anywhere in `src/`:**

| File | Size |
|------|------|
| `public/images/about-yellow-bus.jpg` | 202 KB |
| `public/images/autobetonpompi.jpg` | 44 KB |
| `public/images/betonovozi.jpg` | 47 KB |
| `public/images/cropped-logo_Hordomotor-192.png` | 47 KB |
| `public/images/gdpr-logo.png` | 214 KB |
| `public/images/hero-slide-1.jpg` | 93 KB |
| `public/images/hero-slide-2.jpg` | 64 KB |
| `public/images/hero-slide-bg.jpg` | 531 KB |
| `public/images/news-sample.jpg` | 106 KB |
| `public/images/putzmeister-p3.jpg` | 51 KB |
| `public/images/putzmeister-p7.jpg` | 73 KB |

**Verification:** `grep -rq '<filename>' src/` returned no matches for each.

**Total reclaimable:** ~1.47 MB.

**Note:** The following images in `public/images/` **are** used and must be kept:
- `about-img-1.jpg`, `about-img-2.jpg`
- `favicon-32.png`, `favicon-180.png`
- `hero-concrete-pump-sharp.jpg`
- `logo_Hydromotor.png`
- `og-image.jpg`
- `putzmeister-p2.jpg`, `putzmeister-p4.jpg`, `putzmeister-p5.jpg`, `putzmeister-p6.jpg`
- `sany-20m.jpg`, `sany-30m.jpg`, `sany-50m.jpg`, `sany-60m.jpg`
- `service-workshop.jpg`

---

## 1.6 Add canonical link to `index.html`

**Action:** Insert in `<head>`:

```html
<link rel="canonical" href="https://hydromotor.bg" />
```

**Placement:** After the `title` tag (line 17), before the closing `</head>`, to help SEO consolidate ranking to the canonical URL.

---

## Execution Order

All items are independent. Suggested order for efficiency:

1. **1.4** (remove 6 TODOs) — trivial, no risk
2. **1.2** + **1.3** (remove dead CSS) — do together in one file edit
3. **1.1** + **1.6** (add favicon + canonical to index.html) — do together in one file edit
4. **1.5** (delete orphan images) — single rm command
