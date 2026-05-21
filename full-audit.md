# Full Website Audit — hydromotor.bg

**Date:** 2026-05-21
**Auditor:** Jarvis 🧠
**Build:** ✅ Passes (0 errors)

> **Context:** Many fixes were already applied today (OG image fix, contact form inline message, lazy loading, prefers-reduced-motion, active states, duplicate CSS cleanup, TrustBar.jsx removed, body font-weight, h2 clamp, scroll-to-top, footer breathing room, header padding, mobile CTA/footer/menu fixes, etc.). This audit focuses on what's **still outstanding**.

---

## 1. 🔴 Critical Issues

### 1.1 ContactForm is functionally broken (and doubly redundant)
- **File:** `src/components/ContactForm.jsx`
- **Issue:** The form submit handler calls `e.preventDefault()` and shows "Формата временно не е активна. Моля, обадете се на 0878 553 273." via both:
  - An inline `form-notice` (rendered after submit)
  - A permanent `contact-form-disclaimer` (always visible below the form)
- **Effect:** User fills out required fields, clicks submit, gets told the form doesn't work. The permanent disclaimer below makes the form look perpetually broken.
- **Fix:** Either:
  - Wire up actual form submission (Formspree, Netlify Forms, or a backend endpoint)
  - Or replace the entire form with a simple "Call us" CTA section (removing the broken form UI)

### 1.2 No favicon linked in `<head>`
- **File:** `index.html`
- **Issue:** `favicon-32.png` (2317 bytes) and `favicon-180.png` exist at `public/images/` but are never referenced in the HTML `<head>`.
- **Effect:** Browsers show no tab icon. Looks unprofessional for a B2B site.
- **Fix:** Add:
  ```html
  <link rel="icon" type="image/png" sizes="32x32" href="%BASE_URL%images/favicon-32.png" />
  <link rel="apple-touch-icon" href="%BASE_URL%images/favicon-180.png" />
  ```

### 1.3 Dead CSS `.trust-bar` (orphaned after TrustBar.jsx removal)
- **File:** `src/App.css`, lines ~226-265
- **Issue:** The entire `.trust-bar`, `.trust-bar-track`, `.trust-item`, `.trust-item-icon`, and related hover/media/scroll-fade rules remain in CSS but no component references the `.trust-bar` class.
- **Effect:** ~40 lines of dead CSS in the production bundle.
- **Fix:** Remove all `.trust-bar` CSS rules from App.css.

### 1.4 Dead CSS `.dark-grid-pattern` (never used in JSX)
- **File:** `src/App.css`, lines ~46-60
- **Issue:** `.dark-grid-pattern` and `.dark-grid-pattern::before` are defined but never applied to any component. The same grid pattern is duplicated inline via `::before` pseudo-elements on `.service-process`, `.footer`, etc.
- **Effect:** ~15 lines of dead CSS. Also, the grid pattern implementation is repeated 3× across the codebase.
- **Fix:** Either remove `.dark-grid-pattern`, or use it consistently across all dark sections instead of duplicated `::before` blocks.

### 1.5 Six TODO comments in production code
- **Files:**
  - `src/pages/Machines.jsx:7` — `// TODO: All machine images (400×284) should be replaced with 800×600+ versions`
  - `src/pages/Machines.jsx:25` — `{/* TODO: Replace putzmeister-p2.jpg with a proper brand logo image */}`
  - `src/pages/MachineDetail.jsx:7` — `// TODO: All machine images (400×284) need to be replaced with 800×600+ versions`
  - `src/pages/Services.jsx:57` — `{/* TODO: Replace service-workshop.jpg with 1600×900 image */}`
  - `src/pages/About.jsx:36` — `{/* TODO: Replace about-img-1.jpg with 1200×600+ image */}`
  - `src/pages/About.jsx:43` — `{/* TODO: Replace about-img-2.jpg with 1200×600+ image */}`
- **Effect:** Rendered as HTML comments in production. Visible in "View Page Source". Embarrassing for a business site.
- **Fix:** Either resolve each TODO (replace with proper images) or remove the comments. At minimum convert to JS comments that don't render in DOM.

---

## 2. 🟡 Notable Issues

### 2.1 All 4 "Why Hydromotor" points use the same icon (IconShield)
- **File:** `src/components/WhyHydromotor.jsx`
- **Issue:** The selling points in the "Защо Хидромотор" section all use `<IconShield />` — visually repetitive. Each point should ideally have a distinct icon reflecting its content.
- **Fix:** Map meaningful icons: `IconHandshake` (autorised partner), `IconPackage` (spare parts), `IconWrench` (service), `IconFactory` (experience).

### 2.2 SANY brand section missing logo
- **File:** `src/pages/Machines.jsx`
- **Issue:** Putzmeister brand section displays a logo image (`putzmeister-p2.jpg`) in the heading, but the SANY section just shows text "SANY" with no logo. Inconsistent branding.
- **Fix:** Add a SANY logo image to the brand header, or consistently use text-only for both.

### 2.3 putzmeister-p2.jpg used as brand logo (is actually a machine photo)
- **File:** `src/pages/Machines.jsx`
- **Issue:** The TODO notes this — `putzmeister-p2.jpg` is a photo of a machine, not a proper brand logo. Using it as a logo element looks unprofessional.
- **Fix:** Replace with a proper Putzmeister brand logo asset.

### 2.4 Duplicate grid pattern implementation (3 copies)
- **Files:** `src/App.css`
- **Issue:** The diagonal grid pattern for dark sections is implemented in three separate places:
  1. `.dark-grid-pattern::before` (unused — dead code)
  2. `.service-process::before` (inline)
  3. `.footer::before` (inline)
- **Fix:** Consolidate into a single utility class like `.dark-grid-pattern` and apply it wherever needed.

### 2.5 ContactForm has two messages saying the same thing
- **File:** `src/components/ContactForm.jsx`
- **Issue:** 
  - `form-notice` div: shown on submit (dynamic, JS)
  - `contact-form-disclaimer` div: permanently visible (static HTML)
  - Both say essentially "Form not active, please call us."
- **Effect:** The always-visible disclaimer makes the form look broken from the start. The dynamic message after submit is redundant.
- **Fix:** Either make the form functional, or remove `contact-form-disclaimer` and only show `form-notice` on submit, OR replace the entire form with a simple CTA.

### 2.6 Hero badge duplicates information in headline/subtitle
- **File:** `src/components/Hero.jsx`
- **Issue:** Badge reads "ОФИЦИАЛЕН ПРЕДСТАВИТЕЛ НА PUTZMEISTER ЗА БЪЛГАРИЯ", headline is "ХИДРОМОТОР", subtitle says "Вашият партньор в строителството", body says "Бетонпомпи, тунелни машини, промишлени помпи, резервни части и професионален сервиз."
- **Analysis:** The badge and hero subtitle overlap in message. The badge is 60 characters of ALL CAPS — this is a lot of text for a badge element and might overwhelm the top of the hero on mobile.
- **Fix:** Shorten badge to something punchier like "PUTZMEISTER — Официален партньор", or merge with the subtitle.

### 2.7 LinkedIn link likely dead / unverified
- **File:** `src/components/Footer.jsx` — `href="https://www.linkedin.com/company/hydromotor"`
- **Issue:** No LinkedIn page exists at this URL (likely placeholder). If the link resolves to a 404 or LinkedIn error page, it's a bad look for a professional B2B company.
- **Fix:** Either verify the page exists and update URL, or remove/comment the LinkedIn link.

### 2.8 `fbclid` in Facebook URL
- **File:** `src/data/content.js` — Facebook URL has a long `fbclid` tracking parameter. While not visible to users, the static URL with `fbclid` will break if Facebook re-indexes.
- **Fix:** Use clean URL: `https://www.facebook.com/Хидромотор-ООД-955410091164089/` (or even better, URL-encoded).

### 2.9 Hero background image position may crop poorly on certain viewports
- **File:** `src/components/Hero.jsx` — `backgroundPosition: 'center 30%'`
- **Issue:** On very tall or wide screens, `center 30%` may crop the image in unflattering ways. The image (`hero-concrete-pump-sharp.jpg`, 432KB, 1920×?) is set as inline background.
- **Fix:** Consider using `<picture>` with `object-fit: cover` for more predictable cropping, or add media-query-based position adjustments.

### 2.10 No `robots.txt` or `sitemap.xml`
- **Issue:** Neither file exists in public/. While search engines can still index the site, these files help with SEO.
- **Fix:** Add `public/robots.txt` and `public/sitemap.xml`.

---

## 3. 🟢 Polish Items

### 3.1 Orphan assets in public/images/
- **Unreferenced files (9):**
  - `about-yellow-bus.jpg` (202 KB)
  - `autobetonpompi.jpg` (43 KB)
  - `betonovozi.jpg` (47 KB)
  - `cropped-logo_Hordomotor-192.png` (47 KB)
  - `gdpr-logo.png` (213 KB — large!)
  - `hero-slide-1.jpg` (92 KB)
  - `hero-slide-2.jpg` (64 KB)
  - `hero-slide-bg.jpg` (531 KB — large!)
  - `news-sample.jpg` (106 KB)
  - `putzmeister-p3.jpg` (51 KB)
  - `putzmeister-p7.jpg` (73 KB)
- **Effect:** These bloat the repository (~1.5 MB total wasted). Not served to users (Vite only bundles referenced assets), but increases repo size.
- **Fix:** Delete unreferenced assets from `public/images/`.

### 3.2 Machine detail page: M 38-5 has minimal specs (only 4)
- **File:** `src/data/machines.js`
- **Issue:** All Putzmeister machines have detailed specs except M 38-5 which only lists: Вертикален обхват, Брой рамене, Сгъване, Тръбопровод. No pump options, height, reach, unfolding height, etc.
- **Fix:** Add comprehensive specs for M 38-5 consistent with other machines.

### 3.3 Machine card images loaded eagerly on homepage
- **File:** `src/components/Machines.jsx`
- **Issue:** Machine card images use `loading="lazy"` (good), but checking the markup: the `<img>` inside `.machine-card-icon` has inline `style` for dimensions. The real `machine-card-image` pattern used on the Machines page is cleaner.
- **Fix:** Use consistent image handling between homepage and machine listing page.

### 3.4 PDF filenames with Cyrillic characters
- **File:** `src/pages/Downloads.jsx` — references `/pdfs/%D0%9C%D0%90%D0%99-%D0%9C%D0%90%D0%A8%D0%98%D0%9D%D0%98.pdf`
- **Issue:** The file on disk is `МАЙ-МАШИНИ.pdf` (Cyrillic). The URL uses percent-encoding which works, but:
  - Some CDNs/proxies may have issues with non-ASCII filenames
  - Download dialog shows the percent-encoded name instead of readable Bulgarian
- **Fix:** Rename to ASCII (e.g., `maj-mashini-2020.pdf`) with a readable display name.

### 3.5 Footer bottom padding on mobile works, but desktop lacks safe-area
- **File:** `src/App.css`
- **Issue:** Mobile footer has `padding-bottom: calc(3.5rem + env(safe-area-inset-bottom))` but desktop has no safe-area consideration. Minor since desktop rarely has bottom insets.
- **Fix:** Already fine — just noting desktop is theoretically unprotected.

### 3.6 No `aria-current="page"` on active nav links
- **File:** `src/components/Header.jsx`
- **Issue:** NavLink from react-router-dom automatically applies `aria-current="page"` by default, so this may actually be handled. Let me verify... Actually, NavLink does set `aria-current="page"` automatically when active. This is fine.

### 3.7 Index.html missing `<link rel="canonical">`
- **File:** `index.html`
- **Fix:** Add `<link rel="canonical" href="https://hydromotor.bg" />` for SEO.

### 3.8 No structured data (JSON-LD) for LocalBusiness/Organization
- **File:** `index.html`
- **Issue:** Adding JSON-LD structured data would help search engines display contact info, hours, and location in rich results.
- **Fix:** Add `Organization` or `LocalBusiness` schema with address, phone, coordinates.

### 3.9 Page meta description should be page-specific
- **File:** `index.html` — single hardcoded meta description
- **Issue:** Each page (About, Services, Machines, Contact) has the same meta description. For SEO, each page should have its own description.
- **Fix:** Use react-helmet or similar for per-page `<meta>` tags.

### 3.10 Machine detail: 404 fallback uses basic styling
- **File:** `src/pages/MachineDetail.jsx`
- **Issue:** When machine slug doesn't match, it shows inline styles (`style={{ textAlign: 'center', padding: '4rem 0' }}`) instead of the `NotFound` component.
- **Fix:** Either render the `<NotFound />` component, or use CSS class-based styling.

### 3.11 Hero scroll indicator visible when trust bar is present
- **File:** `src/components/Hero.jsx`
- **Issue:** The scroll indicator (bouncing chevron) sits below the trust bar. Users may interpret it as "scroll further for content below trust bar" — but the trust bar is already at the bottom of hero. On mobile it's hidden, but on desktop users might scroll down slightly and see nothing new.
- **Fix:** Minor — consider removing or adjusting its position.

### 3.12 Machine card homepage image vs page image inconsistency
- **File:** `src/components/Machines.jsx` vs `src/pages/Machines.jsx`
- **Issue:** Homepage machine cards use inline `<img>` inside `.machine-card-icon` with inline styles. The Machines page uses a structured `.machine-card-image` with hover zoom effect (`scale(1.05)`). The homepage cards lack the zoom effect.
- **Fix:** Unify the card component or at least add hover zoom to homepage cards.

---

## 4. ✅ Already Fixed (for reference)

These issues were fixed in today's session and are **not** outstanding:

| Issue | Status |
|-------|--------|
| OG image path broken (was `/og-image.jpg`, now uses `%BASE_URL%`) | ✅ Fixed |
| Contact form: no inline feedback on submit | ✅ Fixed (form-notice added) |
| Images not lazy-loaded | ✅ Fixed (all images loading="lazy") |
| Missing `prefers-reduced-motion` support | ✅ Fixed |
| NavLink `active` class styling | ✅ Fixed |
| Duplicate CSS cleanup | ✅ Fixed |
| TrustBar.jsx removed | ✅ Fixed |
| Body font-weight was 300 (now 500) | ✅ Fixed |
| h2 font-size not using clamp | ✅ Fixed |
| Scroll-to-top button missing | ✅ Fixed |
| Footer missing breathing room on mobile | ✅ Fixed |
| Header safe-area padding | ✅ Fixed |
| Mobile CTA bar sticky bottom | ✅ Fixed |
| Mobile menu (iOS scroll lock, Escape, touch targets) | ✅ Fixed |
| Hero gradient overlay | ✅ Fixed |
| Mobile section spacing | ✅ Fixed |
| Section spacing system | ✅ Fixed |

---

## 5. Summary

### Priority Action Items

| # | Severity | Item | Effort |
|---|----------|------|--------|
| 1 | 🔴 | Make ContactForm functional OR replace with CTA | Medium |
| 2 | 🔴 | Add favicon links to index.html | 5 min |
| 3 | 🔴 | Remove dead `.trust-bar` CSS | 5 min |
| 4 | 🔴 | Remove dead `.dark-grid-pattern` CSS | 5 min |
| 5 | 🔴 | Remove 6 TODO comments from code | 5 min |
| 6 | 🟡 | Diversify WhyHydromotor icons | 15 min |
| 7 | 🟡 | Add SANY logo or consistent branding | 15 min |
| 8 | 🟡 | Fix putzmeister-p2.jpg as brand logo | 15 min |
| 9 | 🟡 | Consolidate duplicate grid pattern code | 10 min |
| 10 | 🟡 | Simplify ContactForm double-message | 10 min |
| 11 | 🟡 | Verify LinkedIn URL | 5 min |
| 12 | 🟢 | Delete 11 orphan images (~1.5 MB) | 5 min |
| 13 | 🟢 | Expand M 38-5 specs | 10 min |
| 14 | 🟢 | Rename Cyrillic PDF to ASCII | 5 min |
| 15 | 🟢 | Add canonical link, robots.txt, sitemap.xml | 20 min |
| 16 | 🟢 | Add JSON-LD structured data | 15 min |
| 17 | 🟢 | Shorten hero badge text | 5 min |

### Stats
- **Source files audited:** 22 (6 pages, 8 components, 3 data, 3 CSS/HTML, 2 config)
- **Lines of CSS:** ~1800 in App.css, ~100 in index.css
- **Critical (🔴):** 5
- **Notable (🟡):** 7
- **Polish (🟢):** 12
- **Already fixed today:** 18+ items

---

*End of audit.*
