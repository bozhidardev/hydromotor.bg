# Hydromotor Website — Visual Fix Plan

**Generated:** 2026-05-21  
**Source audit:** `visual-audit.md`  
**Audit review:** `visual-audit-review.md`  
**Author:** Jarvis

---

## P0 — Broken / Showstopper

### 0. Broken "Правна информация" footer link → 404

**Problem:** `Footer.jsx` has `<Link to="/pravna-informacia">Правна информация</Link>` but no matching route in `App.jsx`. Clicking it navigates to a 404 page. Users who see this link in the footer expect it to work.

**Fix:** Remove the broken link from the footer. No legal page content exists in the project.
- Edit `Footer.jsx`: remove the `<Link>` element for "Правна информация" or visually disable it.
- Keep the rest of the footer unchanged.

**Files affected:** `src/components/Footer.jsx`

**Risks:** None. Dead link removal.

---

### 1. Missing og-image.jpg — Social preview broken

**Problem:** `index.html` line 10 references `%BASE_URL%images/og-image.jpg` for the Open Graph meta tag. The file does **not exist** at `public/images/og-image.jpg`. Social share cards on Facebook, LinkedIn, Messenger, WhatsApp, Telegram, etc. produce a broken preview (no image).

Vite correctly resolves `%BASE_URL%` in HTML (confirmed: build output shows `/hydromotor.bg/images/og-image.jpg`), but there is no file to serve.

**Fix:** Create a 1200×630px OG image at `public/images/og-image.jpg`. Use a branded dark background with the "Хидромотор" wordmark and the gold accent, matching the industrial identity. The image should:
- Be 1200×630px (exact OG ratio)
- Use `#0f0f0f` (dark) background with gold `#f9c500` text or accent
- Include the brand name "Хидромотор" and the tagline "Официален представител на Putzmeister"
- Be self-contained (no external fonts — use system fonts or rendered text)
- Keep file size under ~200KB for fast loading

**Files affected:** `public/images/og-image.jpg` (create), `index.html` (change `%BASE_URL%` to absolute `/images/og-image.jpg` or leave as-is since Vite resolves it — verify after build)

**Risks:** None. Missing file is the only problem.

---

## P1 — User-Facing Quality

### 2. Hero CTA buttons undersized on mobile

**Problem:** At `@media (min-width: 360px)` in App.css (around line 831), `.hero-actions .btn` sets `font-size: 0.75rem`. This is ~12px for primary lead-generation CTAs ("ПОИСКАЙ ОФЕРТА" / "24/7 СЕРВИЗ") — too small for usability on mobile. Desktop is `0.82rem` which is also tight but less critical.

**Fix:** Increase mobile font-size for hero CTAs:
- `@media (min-width: 360px)` → `.hero-actions .btn`: change `font-size: 0.75rem` to `font-size: 0.85rem`
- Keep desktop `0.82rem` as-is (acceptable on larger screens)
- Adjust padding proportionally if needed

**Files affected:** `src/App.css` (`.hero-actions .btn` rules)

**Risks:** Low. Button text may be slightly wider — verify they still fit in 220px max-width on mobile.

---

### 3. No phone CTA in mobile nav

**Problem:** The mobile menu (`Header.jsx`) only contains 5 nav links. For a call-driven B2B service business (24/7 emergency service), users on mobile have to scroll down to find the phone number. Desktop has `.header-phone-desktop` but mobile has nothing equivalent in the menu.

**Fix:** Add a compact phone row at the bottom of the mobile menu, right after the last nav link:
- Show the 24/7 emergency number: `0878 553 273`
- Use a gold/emergency-red accent bar with phone icon
- Make it a `<a href="tel:0878553273">` for one-tap dialing
- Keep it visually compact so it doesn't dominate the menu

**Files affected:** `src/components/Header.jsx` (mobile menu section)  
**CSS:** No new CSS needed — can reuse existing `.header-phone` or add inline simple styles.

**Risks:** Low. Content-only addition. Ensure the staggered animation delay count is updated (currently 6 nav links animated; adding a phone row makes 7).

---

### 4. Trust bar font size on mobile — below readability minimum

**Problem:** At `@media (max-width: 480px)` in App.css (around line 850+):
- `.hero-trust-title` → `font-size: 0.6rem` (~9.6px)
- `.hero-trust-sub` → `font-size: 0.55rem` (~8.8px)

These are below the 10px minimum recommendation and fail WCAG small-text contrast considerations.

**Fix:** Increase minimum font sizes at the 480px breakpoint:
- `.hero-trust-title`: change `0.6rem` → `0.7rem` (~11.2px)
- `.hero-trust-sub`: change `0.55rem` → `0.65rem` (~10.4px)

**Files affected:** `src/App.css` (`@media (max-width: 480px)` section, hero-trust-* rules)

**Risks:** Low. Items may be slightly wider on the smallest screens — the trust bar already has `overflow-x: auto` with horizontal scrolling, so no layout breakage.

---

### 5. Contact form dead alert — change to friendly inline message

**Problem:** Both `ContactMap.jsx` (homepage) and `Contact.jsx` (Contact page) have `handleSubmit` functions that call:
```js
alert('⚠️ Формата за момента не е активна. Моля, обадете се на 0878 553 273.');
```
This is a disruptive JavaScript `alert()` dialog. Bad UX — users filling out a form expect it to work. The alert makes the site look broken/unmaintained.

**Fix (for both forms):**
- Remove the `alert()` call
- Replace with React state that shows an inline friendly message below the form (or in a banner above the submit button)
- The message should read: "Формата временно не е активна. Моля, обадете се на [phone link]." — same info, friendlier delivery
- Keep the form disabled in a subtle way (don't remove the form HTML, just make submission show the message)
- Keep the disclaimer box as-is (it's informative)

**Files affected:** `src/components/ContactMap.jsx`, `src/pages/Contact.jsx`

**Risks:** Low. No backend change — just UX improvement from alert() to inline UI.

---

## P2 — Code Quality / Cleanup

### 6. Dead code: TrustBar.jsx component

**Problem:** `src/components/TrustBar.jsx` is defined but never imported or rendered by any page, component, or layout. Fully tree-shaken dead code that adds cognitive overhead.

**Fix:** Remove the file `src/components/TrustBar.jsx`. Delete the import (nonexistent) and the component definition.

**Files affected:** `src/components/TrustBar.jsx` (delete)

**Risks:** None. Confirmed in audit review — component is unreferenced. Build will pass.

---

### 7. Dead token: `--color-overlay` CSS variable

**Problem:** `src/App.css` line 21 defines `--color-overlay: rgba(15, 15, 15, 0.8)` in `:root`. It is never referenced anywhere in the CSS or JSX files.

**Fix:** Remove the `--color-overlay` declaration from `:root`.

**Files affected:** `src/App.css`

**Risks:** None. Zero usages in the codebase.

---

### 8. Duplicate page-hero CSS — 5 dead per-page hero classes

**Problem:** `App.css` defines **5 identical** per-page hero classes that are no longer used:
- `.about-hero` (lines ~456-474)
- `.machines-hero` (lines ~530-549)
- `.services-hero` (lines ~685-704)
- `.contact-hero` (lines ~814-833)
- `.downloads-hero` (lines ~858-877)

All 5 have identical styling (same linear-gradient background, same `::after` gold bottom bar, same h1 size, same p/subtitle). All inner pages now use the unified `.page-hero` class (verified: About.jsx, Machines.jsx, Services.jsx, Contact.jsx, Downloads.jsx all use `<div className="page-hero">`).

**Fix:** Remove all 5 dead per-page hero class definitions from `App.css`. Keep `.machine-detail-hero` (used by MachineDetail.jsx) and `.page-hero` (the unified class).

**Files affected:** `src/App.css` (remove 5 blocks of CSS)

**Risks:** Low/medium. Double-check that no page unexpectedly uses these classes:
- ✅ About.jsx uses `page-hero`
- ✅ Machines.jsx uses `page-hero`
- ✅ Services.jsx uses `page-hero`
- ✅ Contact.jsx uses `page-hero`  
- ✅ Downloads.jsx uses `page-hero`

After removal, verify build output is smaller and no CSS is missing on those pages.

---

### 9. Duplicate contact forms — consolidate

**Problem:** Two identical contact forms exist:
- `src/components/ContactMap.jsx` — has a `<form className="contact-form">` with name, contact, message fields + submit
- `src/pages/Contact.jsx` — has an identical `<form className="contact-form">` with same fields + submit

Both have the exact same `handleSubmit`, same field IDs (different prefixes), same structure. Duplication means any form change (add field, fix validation) must be done twice.

**Fix:** Create a shared `ContactForm` component in `src/components/ContactForm.jsx` that contains the form HTML and the submit handler. Import it in both `ContactMap.jsx` and `Contact.jsx`:
- `ContactMap.jsx` — replace the form section with `<ContactForm />`
- `Contact.jsx` — replace the form section with `<ContactForm />`
- Remove the duplicated form HTML from both files
- Keep the surrounding layout (info cards, map, etc.) in each file — only consolidate the form itself

**Files affected:** `src/components/ContactForm.jsx` (create), `src/components/ContactMap.jsx` (edit), `src/pages/Contact.jsx` (edit)

**Risks:** Low. Pure refactoring — no visual change. Ensure field IDs remain unique (use prefixes or avoid explicit IDs in favor of label wrappers).

---

### 10. Body font-weight 450 not available in loaded fonts

**Problem:** `App.css` body rule sets `font-weight: 450`. Google Fonts loads DM Sans at 400, 500, 600, 700 — **not 450**. The browser falls back to either 400 or 500 depending on rendering engine, causing inconsistent weight across browsers.

**Fix:** Change `font-weight: 450` to `font-weight: 500` in the body rule in `App.css`. This matches a loaded weight and gives consistent rendering.

**Alternative considered:** Loading weight 450 from Google Fonts — not possible without adding another weight URL parameter, which increases load time. Using 500 is simpler and visually close enough.

**Files affected:** `src/App.css` (body rule, ~line 43)

**Risks:** Low. Body text becomes slightly bolder (450→500). Visually subtle. Verify the site still looks balanced.

---

### 11. h2 clamp duplication between index.css and App.css

**Problem:** Two different `h2` font-size declarations:
- `src/index.css` (global `h2` selector): `font-size: clamp(1.75rem, 4vw, 2.75rem)`
- `src/App.css` (`.section-header h2` selector): `font-size: clamp(2rem, 4vw, 2.5rem)`

These conflict in specificity (`.section-header h2` wins in its context). Having both is confusing for maintenance.

**Fix:** Remove the `h2` font-size rule from `src/index.css` (or set it to inherit). Keep the `.section-header h2` rule in `App.css` since it has proper context. Cascade handles other h2 instances.

**Files affected:** `src/index.css` (remove `h2 { font-size: clamp(...); font-weight: 800; ... }` block)

**Risks:** Low. Verify that h2 elements outside `.section-header` (e.g., about section titles) still have appropriate sizing — they'll inherit from the reset/global font-size.

---

## P3 — Polish

### 12. Add `:active` state on buttons

**Problem:** Buttons have hover states (`translateY(-2px)`, shadow) but no `:active` state for click/tap feedback. On mobile especially, users get no immediate press feedback.

**Fix:** Add `.btn:active` rule:
```css
.btn:active {
  transform: scale(0.97);
}
```
This gives a subtle "press" feedback that works well on both desktop (click) and mobile (tap). Keep `.btn:active` after `.btn:hover` to override properly on click.

**Files affected:** `src/App.css` (add `.btn:active` rule in the Buttons section)

**Risks:** Low. Minor visual addition. Ensure no hover state conflicts (hover's `translateY(-2px)` gets overridden by active's `scale(0.97)` — fine for UX).

---

### 13. Add `prefers-reduced-motion` media query

**Problem:** The site has scroll-reveal animations, hero entrance animation, card hover effects, and staggered link animations. There is no `@media (prefers-reduced-motion)` rule to disable animations for users with motion sensitivity (vestibular disorders, migraines, etc.).

**Fix:** Add a global `prefers-reduced-motion` section in `App.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
  }

  .hero-content > * {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
}
```

**Files affected:** `src/App.css` (add media query block at the end)

**Risks:** Low. Standard accessibility best practice. iOS/Android/macOS users with Reduced Motion enabled get a safer experience.

---

### 14. Add `loading="lazy"` to below-the-fold images

**Problem:** Several `<img>` elements below the fold lack `loading="lazy"`:
- `Machines.jsx` — machine preview card images (inside `.machine-card-icon img`)
- `MachinesPage.jsx` — machine listing images (inside `.machine-card-image img`)
- About.jsx — about-images (`.about-image`)
- Services.jsx — service-workshop image (`.service-workshop-image`)

Only the Google Maps iframe has `loading="lazy"`. Missing lazy loading means all images load on initial page render, wasting bandwidth on images the user may never scroll to.

**Fix:** Add `loading="lazy"` to all `<img>` tags in:
- `src/components/Machines.jsx` (machine preview images)
- `src/pages/Machines.jsx` (machine listing images)
- `src/pages/About.jsx` (about images)
- `src/pages/Services.jsx` (workshop image)

**Files affected:** `src/components/Machines.jsx`, `src/pages/Machines.jsx`, `src/pages/About.jsx`, `src/pages/Services.jsx`

**Risks:** Low. Standard HTML attribute. All major browsers support it. Ensures on-screen content loads first.

---

## Summary Table

| # | Priority | Issue | Effort | Risk | Files Changed |
|---|----------|-------|--------|------|--------------|
| 1 | P0 | Missing og-image.jpg | Medium | None | Create 1 file |
| 2 | P1 | Hero CTA undersized on mobile | Low | Low | 1 CSS file |
| 3 | P1 | No phone CTA in mobile nav | Low | Low | 1 JSX file |
| 4 | P1 | Trust bar font size on mobile | Low | Low | 1 CSS file |
| 5 | P1 | Contact form dead alert | Low | Low | 2 JSX files |
| 6 | P2 | Dead code: TrustBar.jsx | Low | None | Delete 1 file |
| 7 | P2 | Dead token: --color-overlay | Low | None | 1 CSS file |
| 8 | P2 | Duplicate page-hero CSS | Low | Low | 1 CSS file |
| 9 | P2 | Duplicate contact forms | Medium | Low | Create 1, edit 2 |
| 10 | P2 | Body font-weight 450 | Low | Low | 1 CSS file |
| 11 | P2 | h2 clamp duplication | Low | Low | 1 CSS file |
| 12 | P3 | No :active states on buttons | Low | Low | 1 CSS file |
| 13 | P3 | No prefers-reduced-motion | Low | None | 1 CSS file |
| 14 | P3 | Lazy loading on images | Low | Low | 4 JSX files |

---

## Execution Order (recommended)

1. **P0:** Create OG image (most impactful: fixes broken social sharing)
2. **P1 (usability):** Fix contact form alert, hero CTA sizes, trust bar fonts, mobile nav phone
3. **P2 (cleanup):** Dead code removal, CSS consolidation, font-weight fix, form consolidation
4. **P3 (polish):** Active states, reduced motion, lazy loading

Each step is independent — can be done in parallel or any order.
