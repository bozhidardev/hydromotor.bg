# Hydromotor Website — Visual Audit

**Audited:** 2026-05-21  
**Scope:** All CSS, JSX components, pages, data files  
**Site:** B2B industrial equipment (concrete pumps, tunnel machines, industrial pumps) — official Putzmeister representative for Bulgaria.

---

## 1. Typography

### Good
- Strong font pairing: **Montserrat** (headings: 600–900, uppercase capable) + **DM Sans** (body: 400–700). Feels professional and industrial.
- `h1` has `letter-spacing: -0.02em` — tight, appropriate for display headlines.
- `h2` size uses `clamp()` for fluid scaling.
- Body size `1.0625rem` (~17px) is comfortable for long reading.
- Google Fonts preconnect and crossorigin are set up (`index.html`), reducing font-load latency.
- `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` applied globally.

### Needs Improvement
- **Body `font-weight: 450` is NOT loaded.** `index.html` loads DM Sans at weights 400, 500, 600, 700 — but `App.css` line 43 sets `font-weight: 450`. The browser will fall back to either 400 or 500 depending on the rendering engine, causing **inconsistent weight across browsers**. Either load weight 450 or change to 400/500.  
  → `src/index.css` line 12: `font-weight: 450`  
  → `index.html` line 14: font load only includes 400, 500, 600, 700
- **`h2` size defined in TWO places with different values:**
  - `src/index.css` line 31: `font-size: clamp(1.75rem, 4vw, 2.75rem)`  
  - `src/App.css` line 78: `font-size: clamp(2rem, 4vw, 2.5rem)` (wins due to cascade order — same specificity both body class cascade)  
  → The larger min (2rem vs 1.75rem) and smaller max (2.5rem vs 2.75rem) from App.css override index.css. This conflict is confusing for maintenance. Should exist in one place.
- Montserrat `font-weight: 900` for hero `h1` — works because 900 is loaded. But the hero also uses `font-weight: 800` for `h2` — Montserrat 800 is loaded. ✓ All heading weights are actually available except body 450.
- Body line-height `1.6` is reasonable but slightly tight for long-form paragraphs. Consider `1.65–1.75` for better readability.

### Broken
- No font-display strategy. `font-display: swap` or `block` should be applied to prevent invisible text during font load. Currently the Google Fonts URL doesn't include `&display=swap`.

---

## 2. Color

### Good
- Solid design token system in `:root` (`App.css` lines 2–22). All colors are centralized.
- Strong brand color: `#f9c500` (yellow/gold) — distinctive, industrial, visible against both dark and light backgrounds.
- Emergency red: `#cc2936` — clear visual hierarchy, appropriately reserved for urgent CTAs (phone, 24/7 service).
- Dark backgrounds: `#0f0f0f` and `#1a1a1a` — rich, premium, used consistently for header, footer, hero, dark sections.
- Text contrast ratios are good: `#1a1a1a` on `#f5f2ed` is ~13:1, `#3a3a3a` on `#f5f2ed` is ~8:1, white on `#0f0f0f` is ~18:1.
- Primary color available as RGB tokens for backdrop overlays: `--color-primary-rgb: 249, 197, 0`.

### Needs Improvement
- **Two very similar light background colors** that are hard to distinguish:
  - `--color-bg-white: #f5f2ed` (warm off-white/beige)
  - `--color-bg-light: #f0ede8` (slightly darker beige)
  - The difference is only 5 points per channel — barely perceptible. This creates a visual "almost-but-not-quite" inconsistency. Consider making `--color-bg-light` more distinct for section alternation (e.g. true white `#ffffff` or a more visibly different warm tone).
- `--color-bg-white` is NOT actually white (`#f5f2ed` is beige). Named "white" is misleading. Consider renaming to `--color-bg-warm` or similar.
- `--color-overlay` (`rgba(15, 15, 15, 0.8)`) is **defined but never used anywhere** in the codebase. Dead token.
- `--color-border: #d8d4cf` — very light, sometimes too subtle for card borders against `--color-bg-white` (#f5f2ed). The border barely registers.
- `--color-emergency-dark: #a81e2a` is defined but only used in one hover state. Consider adding more uses for consistency.
- `--grain-opacity: 0.03` is **extremely subtle**. On many displays (especially mobile, OLED, or lower brightness), this will be completely invisible. Consider `0.04–0.06`.

---

## 3. Spacing

### Good
- Systematic section spacing with named classes: `section-light-spacing` (5rem), `section-dark-spacing` (4rem), `section-callout-spacing` (3rem).
- Mobile overrides reduce spacing proportionally: light → 3rem, dark → 2.5rem, callout → 2rem.
- Container padding scales with breakpoints: 1.25rem → 2rem → 2.5rem.
- `gap` values in grids are consistent at 1.5rem.

### Needs Improvement
- `section-diagonal` clip paths (`polygon(0 3%, 100% 0, 100% 97%, 0 100%)`) create 3% diagonal edges — these look choppy when sections are adjacent, leaving ~1.5rem triangular gaps at top/bottom. The diagonal sections (`Services`, `ServiceProcess`) are not offset by enough extra padding to compensate.
- Section spacing classes are inconsistently applied. `About` page uses `section-light-spacing` class on the container div, but `Services` page uses `services-content section-light-spacing` on a nested wrapper. Some sections use padding classes, others use a mix.
- Hero has no explicit padding class — relies on `min-height: 100svh` which works but makes it an outlier from the spacing system.

### Broken
- Machines homepage section (`Machines.jsx`) uses `padding: 5rem 0` from its own CSS class, not the spacing system. Same for `services`, `why-hydromotor`, `contact-map`. These duplicate the spacing values from `section-light-spacing`. If the spacing system is updated, these won't follow.

---

## 4. Layout

### Good
- Clean 1200px max-width container with responsive padding.
- Grid breakpoints are well-chosen: single column → 2 columns at 600px → 3 columns at 1024px.
- Product page layout uses `grid-template-columns: 1fr 1fr` on desktop for image + info split — good pattern.
- Desktop header uses CSS grid (`grid-template-columns: 1fr auto 1fr`) for proper centering.
- Footer grid: 1 → 2 → 4 columns at appropriate breakpoints.

### Needs Improvement
- The homepage `Machines.jsx` component uses `object-fit: cover` with a fixed `height: 140px` on the machine image via inline style. This crops images if they have different aspect ratios. Better to use a consistent aspect-ratio or object-position strategy.
- `MachinesPage.jsx` uses `height: 200px` on `.machine-card-image`. Inconsistent with homepage's `140px`. Both should pull from the same design token.
- `WhyHydromotor` layout on mobile: text block + 4 selling points in a single column. The selling points stack vertically with 1rem gaps — good, but the text block above them has `max-width` unconstrained on mobile, making it full-width (which is fine, but loses some of the visual structure).
- `ContactMap.jsx` embeds the map with a dynamic URL using template literals — the `pb` parameter has a specific ID that looks like an example/placeholder. Verify it points to the correct Google Maps location.

### Broken
- **404 page:** The `not-found-content` uses `max-width: 740px` with its own padding and background — but it's inside a `.container` that also applies padding. The inner div's padding compounds with the container's padding on small screens, resulting in excessive horizontal whitespace on mobile.
- **Google Maps iframe** in `ContactMap.jsx` uses an inline style `height: 100%` with `min-height: 250px` from CSS, but in `Contact.jsx` it uses inline `height: 400px`. Two different heights for the same component is inconsistent.

---

## 5. Hero

### Good
- Cinematic full-viewport hero with gradient overlay is visually striking.
- Multi-layer approach: background image → gradient overlay (`::before`) → grid pattern (`hero-overlay`) → content (`hero-inner`). Excellent depth.
- Badge, h1, subtitle, body, CTAs — all have staggered fade-in animation.
- Trust bar below hero with 5 items reinforces credibility immediately.
- Scroll indicator adds a nice "below the fold" cue.
- Responsive adjustments: gradient changes to top-down on mobile, font sizes scale down.

### Needs Improvement
- **Hero CTA buttons are very small:** `font-size: 0.82rem` on desktop with uppercase + letter-spacing. For primary CTAs, this is undersized. Should be at least `0.9rem–1rem`. The CTAs are the main action points — they should be more prominent.
- **Hero H1 is ALL CAPS** ("ХИДРОМОТОР") with `font-weight: 900` — impactful but risks readability issues. In Bulgarian Cyrillic, all-caps can be harder to distinguish (especially letterforms like И, М, Т).
- The hero gradient overlay uses `background-position: center 30%` for the image — this may clip important parts of the concrete pump photo on certain viewports.
- **hero-scroll-indicator:** The `IconChevronDown` is positioned `absolute; bottom: 1.5rem; left: 50%`. But it's positioned relative to `.hero`, which also contains `.hero-trust-bar` below the content. On some viewport heights, the scroll indicator could overlap with or appear on top of the trust bar.

### Broken
- `hero-scroll-indicator` has `z-index: 3` while `.hero-trust-bar::before` has `z-index: 1`. The scroll indicator is inside `.hero`, which also contains `.hero-trust-bar`. Since `.hero-trust-bar` is after `.hero-inner` in DOM order, and the scroll indicator is absolutely positioned, on medium-height screens the indicator could overlay the trust bar's content.

---

## 6. Header / Nav

### Good
- Fixed dark header with `backdrop-filter: blur(10px)` — modern, premium feel.
- Desktop centered nav using CSS grid layout (`1fr auto 1fr`) — logo on left, nav center, phone on right.
- Active nav link gets gold underline via `::after` pseudo-element with width transition.
- Uppercase nav links with `letter-spacing: 0.08em` — professional, industrial aesthetic.
- Hamburger menu has 44×44px touch target wrapper (accessibility-conscious).
- Mobile menu: slide-in from right (min(100vw, 380px)) with staggered entrance animation.
- Body scroll lock on mobile menu open with iOS workaround (body position fixed).
- Keyboard support: Escape closes mobile menu.
- Safe-area handling: `padding-top: var(--safe-top)` on header, applied to mobile menu too.

### Needs Improvement
- **Mobile menu lacks a phone number/link.** Desktop has `.header-phone-desktop` but mobile only has nav links. For a service/call-driven business, the mobile menu should prominently display the emergency phone number (0878 553 273) as a tappable CTA.
- Mobile menu close button (✕) is positioned absolutely at `top: calc(0.5rem + var(--safe-top))` and `right: 0.5rem` — could visually clash with the notch or status bar on phones with large safe areas.
- `scrolled` class adds `box-shadow` but **no background color change** — the header already has `background-color: #0f0f0f` and `backdrop-filter: blur(10px)`. The shadow is barely visible on the dark background.
- The `.header-nav` on desktop uses `display: none` at base, then `display: flex !important` at 768px. The `!important` is unnecessary — better to flip the default.

### Broken
- **Logo image alt-text:** `alt="Хидромотор"` is correct for the logo link — but the alt text is only provided on the `NavLink` component. If the image fails to load, the alt text will show but the clickable space remains.

---

## 7. Cards (Machine Cards / Service Cards)

### Good
- Machine cards: consistent `border-left: 3px solid transparent` that transitions to gold on hover — nice accent.
- Top gradient bar across all machine cards (`::before` with `linear-gradient`).
- Hover: `translateY(-4px)` + enhanced shadow — standard, effective.
- Spec chips: dark bg + gold text — readable, consistent with brand.
- Service cards: centered icon + title + description, top gradient bar.
- Machine detail page has a proper image gallery + info + specs table layout.

### Needs Improvement
- **Machine card icons on homepage** (`Machines.jsx`) use an `<img>` inside a div meant for an icon font. The inline style `height: 140px; object-fit: cover; border-radius: 0.375rem` works but the image is labeled as `machine-card-icon` in className, which is semantically misleading (it's a product image, not an icon).
- **Service cards on homepage** use inline SVG icons at `size={32}` but the icon container is `font-size: 2.5rem` (~40px). The SVG is 32px inside a parent that's ~40px — these should match.
- **Machine cards on the Machines page** (`MachinesPage.jsx`) have a different structure than homepage machine cards: homepage uses a flat card with image as icon, while the page uses a structured card with `machine-card-image` + `machine-card-body`. This is good for detail, but the visual inconsistency between homepage and listing page may confuse users.
- **Specs table** (`specs-table`) on machine detail has alternating row colors but no border between rows except the `border-bottom`. The rounded corners via `overflow: hidden` clip correctly since there's no separate border-radius on the table itself.

### Broken
- None critical — cards are well-structured.

---

## 8. Buttons / CTAs

### Good
- Typed button system: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-outline-light`, `.btn-lg`, `.btn-block`.
- Consistent hover effects: `translateY(-2px)` + enhanced shadow on all variants.
- Primary uses brand gold on dark background — strong visual weight.
- Outline buttons have `2px` solid borders with matching hover transitions.

### Needs Improvement
- **Hero CTA buttons are too small for the primary action:**  
  - Desktop: `font-size: 0.82rem`, `letter-spacing: 0.04em`, `padding: 0.9rem 1.5rem`  
  - On 360px+: `font-size: 0.75rem`, `padding: 0.7rem 1rem`  
  - These are uppercase + heavy weight — for B2B lead generation CTAs, this feels undersized. Recommend at least `0.95rem` on desktop.
- `btn-block` class exists but **Contact.jsx uses inline `style={{ width: '100%' }}`** instead of `className="btn btn-primary btn-block"`. Inconsistent.
- `.btn-outline-light` on hero uses a white border on the dark background, but the `btn-primary` has more visual weight. Both CTAs are uppercase with same letter-spacing — they compete for attention rather than having clear primary/secondary hierarchy.
- **Button duplicate pattern:** The homepage ContactMap and Contact page both use `<IconMail size={18} /> Изпрати съобщение` as submit button text — should be a shared component.

### Broken
- None critical.

---

## 9. Trust Bar

### Good
- Two trust-bar variants exist: one inside the hero (`hero-trust-bar`), one standalone (`trust-bar`).
- Hero trust bar: 5 items with icon + title + sub-text. Scrollable on mobile, spread evenly on desktop. Nice gold accent stripe at bottom edge via `::before`.
- Component trust bar: 6 items with icon + label. Horizontal scroll on mobile with gradient fade edge (`::after` with linear gradient from transparent to bg-dark). Justified-space-between on desktop.

### Needs Improvement
- **Two trust bars = duplicated content.** The hero trust bar has items like "25+ ГОДИНИ ОПИТ / Основана през 1996 г." and the component trust bar says "Основана през 1996 г." with an icon. On the homepage, both trust bars appear in close succession (hero trust is visually at fold, and the component trust bar follows after next sections). The same message is told twice — reduces impact.
- Hero trust bar items have small text: title `0.7rem`, subtitle `0.6rem`. On mobile (480px breakpoint), these shrink further to `0.6rem` and `0.55rem`. At `0.55rem` (~8.8px), the subtitle is **below minimum readable size** for most users. WCAG recommends minimum 10px for readable text.
- The trust-bar component uses `::after` with `width: 48px` for the fade edge — this only fades the right side. On mobile, users scrolling left-to-right won't see a fade indicator on the left to suggest there's more content. A left-side fade would help.

### Broken
- The `hero-trust-bar` has `overflow-x: auto` on mobile but the items use `border-right: 1px solid rgba(255, 255, 255, 0.06)` as dividers. When scrolling, the last item's right border creates an orphan divider against the fade edge. The `::after` gradient overlays this, but it's still technically there.

---

## 10. Forms

### Good
- Clean form layout with proper label/input associations.
- Focus states use gold border + box-shadow ring — accessible and on-brand.
- Input padding (`0.75rem 1rem`) and border-radius are consistent.
- Textarea has `resize: vertical` and a good `min-height: 120px`.

### Needs Improvement
- **Form is non-functional with an `alert()` message.** This is a major UX issue for a B2B site expecting serious inquiries. Users filling out the form get a JavaScript alert saying "Формата за момента не е активна." This undermines credibility. The form either needs a backend or should be replaced with a "call us" prompt.
- **Two identical contact forms** (homepage `ContactMap.jsx` and Contact page `Contact.jsx`) with duplicate code. Any change to fields needs to be done in two places. Should be extracted to a shared component.
- Form disclaimer is visually prominent (`background-color: rgba(var(--color-primary-rgb), 0.08)`, border, centered, italic) — it highlights that the form is broken, which is the opposite of what you want.
- No `autocomplete` attributes on form fields — important for UX on a business site where users may be filling forms quickly.
- "Телефон или имейл" field uses `type="text"` — should be `type="tel"` or `type="email"` for better mobile keyboard support.

### Broken
- Both contact forms submit via `handleSubmit` that only calls `e.preventDefault()` + `alert()` — data is never sent anywhere. This is a production-risk: if someone mistakenly deploys without realizing, all form submissions are silently discarded.

---

## 11. Footer

### Good
- Dark footer with grid overlay pattern — consistent with dark section treatment.
- 4-column grid on desktop: About Company, Quick Links, Contacts, Social.
- Gold accent underline on headings via `::after`.
- Social icons with hover effect: background turns gold, icon turns dark → `translateY(-2px)`.
- Bottom bar with gradient line (gold fade in center) — premium touch.
- Dynamic current year in copyright.
- GDPR/cookie policy links present.

### Needs Improvement
- Footer social section: Facebook and LinkedIn are present. LinkedIn link (`/company/hydromotor`) is hardcoded. Facebook URL uses `CONTACT.facebook` which has Cyrillic characters in the URL — potentially fragile.
- Footer legal links: "Правна информация" links to `/pravna-informacia` — this route doesn't exist in the app. It'll 404. Cookie policy link uses `onClick={(e) => e.preventDefault()}` — non-functional placeholder.
- `footer-legal` links are quite small (`font-size: 0.8rem`). On mobile, these may be <12px effective — readability concern.
- The footer primary text color `rgba(255, 255, 255, 0.6)` with `font-size: 0.9rem` gives a contrast ratio of ~6.5:1 against `#0f0f0f` — acceptable but could be brighter for readability.

### Broken
- The "Правна информация" link points to a non-existent route. Will produce a React 404 page. Could be confusing for users seeking legal documentation.

---

## 12. Page Headers (Inner Page Hero)

### Good
- **Consistent pattern:** All inner pages (`About`, `Machines`, `Services`, `Contact`, `Downloads`) use `.page-hero` with the same gradient dark background, gold bottom accent line, and responsive typography.
- `page-hero` has `clamp(2rem, 4vw, 3rem)` for h1 — good fluid sizing.
- Shared `.page-hero-subtitle` class for consistent description text.
- Mobile override reduces padding (`3.5rem 0 2rem`).

### Needs Improvement
- **Duplicate page-hero definitions.** Each page has its own `.about-hero`, `.machines-hero`, `.services-hero`, `.contact-hero`, `.downloads-hero` in `App.css` — all identical. A single shared `.page-hero` class exists in `App.css` but pages don't use it directly; they have their own CSS. The per-page classes are redundant.
- The 3px gold accent `::after` gradient is defined 6 times (once per page class + once for `.page-hero`). Multiply by the per-page hero classes: `.about-hero::after`, `.machines-hero::after`, etc. — all identical code.

### Broken
- None — the page headers are visually consistent, just over-engineered in CSS.

---

## 13. Mobile

### Good
- Responsive breakpoints at 360px, 480px, 600px, 768px, 1024px — good coverage.
- Mobile CTA bar: fixed bottom bar with phone number + 24/7 label, appears when hero scrolls out of view. Essential for a service business.
- Body scroll lock when mobile menu is open (with iOS position:fixed workaround).
- Touch targets: 44px for hamburger, 44px for mobile menu close, 44px+ for nav links (`min-height: 44px`).
- Safe area handling: `var(--safe-top)` and `env(safe-area-inset-bottom)` applied.
- Mobile spacing overrides reduce section padding appropriately.

### Needs Improvement
- **Mobile navigation lacks a phone call button.** Given the business is service/call-driven, the mobile menu should have a prominent "24/7 Сервиз" call link at the top or bottom.
- Staggered link animation on mobile menu is nice but adds 300ms total delay (6 links × 50ms). Users on slow connections may see blank space before links appear.
- Mobile CTA bar uses `min-height: 44px` but the text inside is small: `font-size: 0.9rem` and the label is `0.7rem`. For a bottom-fixed action bar, the phone number should be larger (`1.1rem–1.2rem`).
- The hero on mobile uses `min-height: auto` instead of `100svh` — consistent with space economy but the hero-trust-bar pushes the fold further down. The transition from hero content → trust bar → next section is smooth but lengthy on small screens.
- Machine detail page: on mobile, the `machine-detail-grid` stacks image above info — good, but the image `max-height: 450px; object-fit: contain` with `background-color: #f5f5f5` may show large empty areas around images with different aspect ratios.

### Broken
- Homepage machine cards on mobile: the homepage `Machines` section uses `grid-template-columns: 1fr` below 600px, but the `machines-grid` images have `height: 140px` with `object-fit: cover`. This crops machine images significantly on small screens — key visual details of the equipment may be lost.

---

## 14. Animations / Micro-interactions

### Good
- **Scroll reveal:** `IntersectionObserver`-based reveal with `threshold: 0.1` and `rootMargin: 0px 0px -50px 0px` — elements animate 50px before entering viewport. 1200ms fallback timeout ensures content is never permanently hidden.
- **Hero entrance:** Staggered fade-in + translateY for headline, subtitle, body, CTAs. Clean `heroFadeIn` keyframes. Smooth `cubic-bezier(0.16, 1, 0.3, 1)` easing across all transitions.
- **Mobile menu:** Slide-in with staggered links — good polish.
- **Card hovers:** `translateY(-4px)` + shadow + border-color transitions. Consistent at `0.4s`.
- **Button hovers:** `translateY(-2px)` + shadow + background color transitions at `0.4s`.

### Needs Improvement
- **No micro-interaction on CTA click.** Buttons have hover states but no `:active` state. When clicked/tapped, there's no feedback (no scale-down, no color flash). Especially noticeable on mobile.
- **No loading/transition states.** The site has no page transition animation between routes. Pages snap into view immediately. For a premium B2B site, subtle page transitions would elevate the feel.
- **Scroll reveal threshold is low.** `0.1` threshold means elements start animating when only 10% visible. Combined with `-50px` rootMargin, animations may trigger prematurely on fast scrolls. Consider `0.15–0.2` for a more deliberate reveal.
- **Mobile menu lacks a close swipe gesture.** Slide-in menus commonly support swipe-right-to-close — not implemented. Users can only close via the ✕ button or overlay tap.
- No `prefers-reduced-motion` media query. Users with motion sensitivity may experience discomfort from the animations. Should respect system preferences.

### Broken
- None — all animations work as intended.

---

## 15. Overall Premium Feel

### Good
- **Strong brand identity:** Gold + dark = premium industrial. Consistent across all components.
- **Texture depth:** Grain overlay (`body::after`), grid patterns (`dark-grid-pattern`, `service-process::before`, `footer::before`) — adds tactile quality.
- **Typographic hierarchy:** Clear distinction between headings, body, and small text across all sections.
- **Edge-to-edge hero:** Cinematic full-width with multi-layer depth — feels expensive.
- **Consistent accent colors:** Gold appears in headers (active links, underlines), cards (borders, top bars, spec chips), buttons (primary), footer (underline, social hover), process steps (numbers), trust bars (icons) — unified system.
- **Responsive polish:** Grid breakpoints, CTA placement, spacing scaling — all handled well.
- **Performance flag:** `loading="lazy"` on images and iframe — good for load times.

### Needs Improvement
- **Broken contact form** is the single biggest detractor from premium feel. A B2B equipment company with a non-functional contact form looks unprofessional.
- **Grain overlay at 0.03 opacity** is practically invisible on most screens. At 0.05–0.06, it would add meaningful texture without being distracting.
- **No actual logo** — the header shows the company name "Хидромотор" via a PNG (`logo_Hydromotor.png`), and the header logo uses it as `<img>`. The brand would benefit from a proper SVG logo with better resolution independence.
- **Missing OG image:** `og:image` in `index.html` references `%BASE_URL%images/og-image.jpg` — check if this file exists in `/public/images/`. If not, social share cards will be broken.
- **Image consistency:** Multiple TODO comments in code about replacing images with higher resolution versions (`about-img-1.jpg`, `about-img-2.jpg`, `service-workshop.jpg`, machine images). Current image quality may vary.
- **Favicon:** Only 32px (`favicon-32.png`) and 180px (`favicon-180.png`) variants exist. No SVG favicon, no multiple-pixel-density support, no `mask-icon` for Safari pinned tabs.
- **The `.section-diagonal` and `.section-diagonal-reverse` classes** create diagonal clip paths on `Services` and `ServiceProcess` sections. On mobile, the 3% diagonal is roughly a 1–2 degree angle — barely noticeable. For this to be impactful, it should be steeper (8–12%) or removed.
- **No testimonials / case studies** section — for a B2B equipment company, social proof through client logos, testimonials, or project highlights would significantly boost credibility.

### Broken
- `og:image` path uses `%BASE_URL%` templating which is not replaced by Vite's build process. This is a **Vite-specific syntax** that may not work as expected. Vite uses `import.meta.env.BASE_URL` in JS, not `%BASE_URL%` in HTML. The meta tag will read literally as `%BASE_URL%images/og-image.jpg` in production — broken social sharing.

---

## Summary of Critical Findings

| Priority | Issue | Category | Location |
|----------|-------|----------|----------|
| 🔴 | Form doesn't submit — shows JS alert | Forms | `ContactMap.jsx:17`, `Contact.jsx:17` |
| 🔴 | OG image URL not resolved — `%BASE_URL%` not replaced | Premium/SEO | `index.html:10` |
| 🔴 | "Правна информация" links to non-existent route | Footer | `Footer.jsx:58` |
| 🟡 | Body font-weight 450 not available in loaded font weights | Typography | `App.css:43`, `index.html:14` |
| 🟡 | `h2` clamp values defined in two places with different values | Typography | `index.css:31` vs `App.css:78` |
| 🟡 | Hero CTA buttons undersized (0.75rem on mobile) | Buttons/CTAs | `App.css` hero-actions rules |
| 🟡 | Duplicate page-hero CSS (6x identical definitions) | CSS bloat | `App.css` — various per-page hero classes |
| 🟡 | No `font-display: swap` on Google Fonts | Typography/Perf | `index.html:14` |
| 🟡 | Trust bar hero text < 9px on mobile | Trust Bar | `App.css: hero-trust-title/sub mobile rules |
| 🟡 | No mobile phone CTA in mobile nav | Header/Mobile | `Header.jsx` — mobile menu |
| 🟡 | Machine cards image sizes and crop differ (140px vs 200px) | Layout | `Machines.jsx` vs `MachinesPage.jsx` |
| 🟡 | Two identical contact forms — duplicate code | Forms | `ContactMap.jsx` + `Contact.jsx` |
| 🟡 | `--color-overlay` defined but never used | Color/Rot | `App.css:21` |
| 🟢 | No `:active` state on buttons | Animations | All `.btn` styles |
| 🟢 | No `prefers-reduced-motion` support | Animations | All animation CSS |
| 🟢 | Cookie policy link is non-functional | Footer | `Footer.jsx:60` |
| 🟢 | Trust bar items on mobile below minimum readable size | Trust Bar | `App.css` hero-trust media queries |

**Legend:** 🔴 Broken / 🟡 Needs Improvement / 🟢 Polish

---

*End of audit. This is based on source code review — a live browser audit may reveal additional issues (viewport rendering, image loading, font swap behavior, etc.).*
