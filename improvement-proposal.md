# Improvement Proposal — hydromotor.bg

**Proposed by:** Jarvis 🧠  
**Date:** 2026-05-21  
**Based on:** [Full Website Audit](./full-audit.md)  

> This document categorizes outstanding issues by implementation phase and provides effort estimates, risks, and dependencies for each proposal.

---

## Phase 1 — Quick Wins (5–15 min each, high impact)

These are low-risk, isolated changes that deliver immediate polish. Each can be done independently.

### 1.1 Add Favicon Links to `index.html`

| Field | Detail |
|-------|--------|
| **Why it matters** | No tab icon = unprofessional. Browsers show a blank page icon, which looks unfinished — especially bad for a B2B site. |
| **Files** | `index.html` |
| **What to do** | Add two `<link>` tags in `<head>`: one for `favicon-32.png` (32×32, browser tab), one for `favicon-180.png` (Apple touch icon). Both files already exist at `public/images/`. |
| **Effort** | 5 min |
| **Risk** | None |
| **Dependencies** | None |

### 1.2 Remove Dead CSS — `.trust-bar`

| Field | Detail |
|-------|--------|
| **Why it matters** | ~40 lines of orphaned CSS in the production bundle. Increases file size, adds noise for anyone maintaining the code. |
| **Files** | `src/App.css` (~lines 226–265) |
| **What to do** | Delete the entire `.trust-bar` block (including `.trust-bar-track`, `.trust-item`, `.trust-item-icon`, and related hover/media/scroll-fade rules). TrustBar.jsx was already removed in a prior session. |
| **Effort** | 5 min |
| **Risk** | Low — no component references these classes. Verify with a search for `trust-bar` across the codebase. |
| **Dependencies** | None |

### 1.3 Remove Dead CSS — `.dark-grid-pattern`

| Field | Detail |
|-------|--------|
| **Why it matters** | ~15 lines of unused CSS. Same pattern is duplicated inline elsewhere; removing the dead class is a first step toward consolidation. |
| **Files** | `src/App.css` (~lines 46–60) |
| **What to do** | Delete `.dark-grid-pattern` and `.dark-grid-pattern::before` rule blocks. |
| **Effort** | 5 min |
| **Risk** | Low — no component applies this class. Verify via project-wide search. |
| **Dependencies** | None |

### 1.4 Remove 6 TODO Comments from Production Code

| Field | Detail |
|-------|--------|
| **Why it matters** | JSX `{/* TODO */}` comments render as HTML comments visible in "View Page Source." Embarrassing for a business website. Even `// TODO` in JS is unprofessional for production. |
| **Files** | `src/pages/Machines.jsx` (×2), `src/pages/MachineDetail.jsx` (×1), `src/pages/Services.jsx` (×1), `src/pages/About.jsx` (×2) |
| **What to do** | Either resolve each TODO (replace placeholder images with proper assets) or convert to `//` JS comments that don't render in the DOM. At minimum, strip them. |
| **Effort** | 5 min (just removal); 30+ min (if resolving with proper images) |
| **Risk** | Minimal — cosmetic change. No functional impact. |
| **Dependencies** | None for removal; proper images needed if resolving. |

### 1.5 Delete Orphan Images (~1.5 MB)

| Field | Detail |
|-------|--------|
| **Why it matters** | 11 files in `public/images/` are not referenced anywhere in the code. They bloat the repository (~1.5 MB) and create confusion about which assets are in use. |
| **Files** | `public/images/about-yellow-bus.jpg`, `autobetonpompi.jpg`, `betonovozi.jpg`, `cropped-logo_Hordomotor-192.png`, `gdpr-logo.png`, `hero-slide-1.jpg`, `hero-slide-2.jpg`, `hero-slide-bg.jpg`, `news-sample.jpg`, `putzmeister-p3.jpg`, `putzmeister-p7.jpg` |
| **What to do** | Delete all 11 files from `public/images/`. Vite only bundles referenced assets, so they're not served — but they waste disk and noise in version control. |
| **Effort** | 5 min |
| **Risk** | Low. Verify each is truly unreferenced (grep for filenames across `src/`). Keep a backup or commit separately for easy revert. |
| **Dependencies** | None |

### 1.6 Add Canonical Link to `index.html`

| Field | Detail |
|-------|--------|
| **Why it matters** | Prevents duplicate content issues if the site is reachable via multiple URLs (www/non-www, trailing slash, etc.). Standard SEO hygiene. |
| **Files** | `index.html` |
| **What to do** | Add `<link rel="canonical" href="https://hydromotor.bg" />` in `<head>`. |
| **Effort** | 5 min |
| **Risk** | None |
| **Dependencies** | None |

---

## Phase 2 — Content / UX Polish (15–30 min)

Slightly more involved changes that improve visual consistency and user experience.

### 2.1 Diversify WhyHydromotor Icons

| Field | Detail |
|-------|--------|
| **Why it matters** | All four selling points in "Защо Хидромотор" use the same icon (`IconShield`). This looks repetitive and reduces visual cue value — icons should help users scan and differentiate points at a glance. |
| **Files** | `src/components/WhyHydromotor.jsx` |
| **What to do** | Map distinct Lucide icons to each point: `IconHandshake` (authorised partner), `IconPackage` (spare parts warehouse), `IconWrench` (service/repair), `IconFactory` (experience/industry). Import each from `lucide-react`. |
| **Effort** | 15 min |
| **Risk** | Low. Visual only. Verify imports compile. |
| **Dependencies** | None (Lucide icons already in the project). |

### 2.2 Fix Brand Identity on Machines Page

| Field | Detail |
|-------|--------|
| **Why it matters** | Two inconsistencies: (1) Putzmeister section uses `putzmeister-p2.jpg` — a machine photo — as a brand logo. (2) SANY section has no logo at all (just text). Unprofessional and inconsistent. |
| **Files** | `src/pages/Machines.jsx`, potentially `public/images/` (add SANY logo asset) |
| **What to do** | Replace `putzmeister-p2.jpg` with a proper Putzmeister brand logo. Add a SANY logo image to the SANY section heading, matching the same visual treatment. |
| **Effort** | 20 min (finding/fetching proper logos + markup updates) |
| **Risk** | Low. Requires sourcing proper brand logo images (PNG with transparent background preferred). |
| **Dependencies** | Need to obtain proper Putzmeister and SANY logo assets. |

### 2.3 Simplify ContactForm Double-Message

| Field | Detail |
|-------|--------|
| **Why it matters** | The form has **two separate messages** saying "Формата временно не е активна": (1) a permanent `contact-form-disclaimer` always visible below the form, and (2) a dynamic `form-notice` shown on submit. This makes the form look perpetually broken before anyone even interacts with it. |
| **Files** | `src/components/ContactForm.jsx` |
| **What to do** | Option A: Remove the permanent `contact-form-disclaimer` div. Keep only the dynamic `form-notice` that appears on submit. Option B (better): Replace the form entirely with a clean "Свържете се с нас" CTA section showing phone + email directly. |
| **Effort** | 15 min |
| **Risk** | Low. The form doesn't work anyway — this only affects the messaging around it. |
| **Dependencies** | None. If choosing the full replacement, coordinate with Phase 3.1 (making the form functional). |

### 2.4 Shorten Hero Badge Text

| Field | Detail |
|-------|--------|
| **Why it matters** | The badge reads "ОФИЦИАЛЕН ПРЕДСТАВИТЕЛ НА PUTZMEISTER ЗА БЪЛГАРИЯ" — 60 characters of all caps. On mobile, this overwhelms the hero's top section. The message overlaps with the subtitle ("Вашият партньор в строителството"). |
| **Files** | `src/components/Hero.jsx` |
| **What to do** | Shorten to something punchier like "PUTZMEISTER — Официален партньор" or "Официален представител на Putzmeister". Merge the key info while keeping it scannable. |
| **Effort** | 10 min |
| **Risk** | None. Text-only change. |
| **Dependencies** | None |

### 2.5 Verify LinkedIn URL

| Field | Detail |
|-------|--------|
| **Why it matters** | The footer links to `https://www.linkedin.com/company/hydromotor`. If this resolves to a 404 or ghost page, it looks bad for a professional B2B company. A dead social link is worse than no link. |
| **Files** | `src/components/Footer.jsx` |
| **What to do** | Visit the URL and verify the page exists and looks legitimate. If dead, either update the correct URL or remove the icon. Also clean the `fbclid` parameter from the Facebook URL in `src/data/content.js`. |
| **Effort** | 10 min |
| **Risk** | None — purely verification and optional cleanup. |
| **Dependencies** | Needs internet access to verify LinkedIn page. |

---

## Phase 3 — Architecture/Systems (30–60 min)

These changes touch multiple files or require more careful planning.

### 3.1 Make ContactForm Functional (or Replace)

| Field | Detail |
|-------|--------|
| **Why it matters** | The contact form is the primary lead-generation mechanism. Currently it prevents submission and shows "Формата временно не е активна." Every day this stays broken is a day of lost potential leads. This is the single most impactful fix on the site. |
| **Files** | `src/components/ContactForm.jsx` |
| **What to do** | **Option A (recommended):** Wire up Formspree (free tier: 50 submissions/month) — add `action="https://formspree.io/f/xxxxx"` and remove `e.preventDefault()`. **Option B:** Use Netlify Forms (if hosted on Netlify) — add `netlify` attribute and a hidden `form-name` input. **Option C:** Build a simple backend endpoint (Node.js/nodemailer or similar). |
| **Effort** | 30–60 min depending on approach |
| **Risk** | Medium — Formspree/Netlify are low-risk integrations, but should be tested end-to-end after deployment. Need to monitor spam. |
| **Dependencies** | Option A: Formspree account + endpoint creation. Option B: Netlify hosting. Option C: Server/function deployment. |

### 3.2 Consolidate Duplicate Grid Pattern CSS

| Field | Detail |
|-------|--------|
| **Why it matters** | The dark-diagonal-grid `::before` pattern is implemented **three times**: once dead (`.dark-grid-pattern`), twice inline (`.service-process::before`, `.footer::before`). This violates DRY and makes visual updates error-prone. |
| **Files** | `src/App.css` |
| **What to do** | Consolidate into a single utility class (e.g., keep/resurrect `.dark-grid-pattern`) with the `::before` pseudo-element. Apply the class to `.service-process` and `.footer`. Remove the inline `::before` blocks. |
| **Effort** | 20 min |
| **Risk** | Low-medium. Need to verify the pattern renders identically after consolidation. Screen-test on both sections. |
| **Dependencies** | Phase 1.3 (removing dead `.dark-grid-pattern` CSS) should be merged with this step instead of done separately. |

### 3.3 Unify Machine Card Components

| Field | Detail |
|-------|--------|
| **Why it matters** | Homepage machine cards (`.machine-card-icon` with inline `<img>`) and the Machines page cards (`.machine-card-image` with hover zoom `scale(1.05)`) are implemented differently. The homepage cards lack the hover zoom effect. Inconsistent UX. |
| **Files** | `src/components/Machines.jsx`, `src/pages/Machines.jsx`, `src/App.css` |
| **What to do** | Extract a shared `MachineCard` component with consistent markup and hover effect. Use it on both pages. Alternatively, add the zoom effect to homepage cards with minimal CSS. |
| **Effort** | 30 min |
| **Risk** | Low-medium. Verify both pages render correctly after changes. |
| **Dependencies** | None |

### 3.4 Add Per-Page Meta Descriptions

| Field | Detail |
|-------|--------|
| **Why it matters** | Currently all pages share the same meta description from `index.html`. For SEO, each page (About, Services, Machines, Contact) should have its own description matching its content. |
| **Files** | `index.html`, potential addition of `react-helmet-async` |
| **What to do** | Install `react-helmet-async`, wrap the app with `HelmetProvider`, and add `<Helmet>` blocks in each page component with unique titles and meta descriptions. |
| **Effort** | 30 min |
| **Risk** | Low. Well-documented library. Test that meta tags update on route change. |
| **Dependencies** | `react-helmet-async` npm package. |


---

## Phase 4 — SEO / Standards (60+ min)

Larger, strategic improvements for search visibility and machine readability.

### 4.1 Add JSON-LD Structured Data

| Field | Detail |
|-------|--------|
| **Why it matters** | Structured data helps search engines display rich results: contact info, hours, location, and reviews directly in SERPs. For a local B2B company like Hydromotor, this can significantly improve click-through rates. |
| **Files** | `index.html` or add via `react-helmet` |
| **What to do** | Inject a `<script type="application/ld+json">` block with `Organization` or `LocalBusiness` schema. Include: name, address (Sofia), phone (0878 553 273), coordinates, opening hours, sameAs (Facebook, LinkedIn). |
| **Effort** | 20 min (writing JSON-LD) |
| **Risk** | Low. Validate with Google's Rich Results Test after deployment. |
| **Dependencies** | Phase 3.4 (react-helmet) if adding per-page; can also add directly to `index.html` immediately. |

### 4.2 Create `robots.txt` + `sitemap.xml`

| Field | Detail |
|-------|--------|
| **Why it matters** | These files instruct search engine crawlers on what to index and where to find all pages. Neither exists currently. Without a sitemap, search engines may take longer to discover new pages. |
| **Files** | `public/robots.txt`, `public/sitemap.xml` |
| **What to do** | Create `robots.txt` allowing all crawlers and pointing to sitemap. Create `sitemap.xml` listing all pages (/, /about, /services, /machines, /machine/:slug, /contact, /downloads) with appropriate priority and change frequency. |
| **Effort** | 20 min |
| **Risk** | Low. Standard files, well-understood format. |
| **Dependencies** | None — can create immediately. |

### 4.3 Expand M 38-5 Machine Specs

| Field | Detail |
|-------|--------|
| **Why it matters** | All Putzmeister machines list comprehensive specs (pump options, height, reach, unfolding height). M 38-5 has only 4 specs (Вертикален обхват, Брой рамене, Сгъване, Тръбопровод). This looks incomplete and may lose interested buyers who can't find the details they need. |
| **Files** | `src/data/machines.js` |
| **What to do** | Research and add missing specs for M 38-5 consistent with other machines: pump model, concrete output, pressure, unfolding height, slewing range, support system, etc. |
| **Effort** | 30–60 min (research + data entry) |
| **Risk** | Low — data-only change. Risk of incorrect specs if research sources are unreliable. |
| **Dependencies** | Need accurate technical data for M 38-5 (Putzmeister spec sheet, dealer documentation, or manufacturer website). |

### 4.4 SEO Audit: Page-Specific Meta Tags via react-helmet

| Field | Detail |
|-------|--------|
| **Why it matters** | Extends Phase 3.4 — once `react-helmet` is set up, ensure every page has a unique, keyword-rich `<title>` and `<meta name="description">`. This is foundational for ranking on competitive B2B construction queries. |
| **Files** | All page components in `src/pages/` |
| **What to do** | Add `<Helmet>` blocks to: Home, About, Services, Machines (with per-brand sub-context), MachineDetail (dynamic title from slug/data), Contact, Downloads, NotFound. Each with appropriate keywords. |
| **Effort** | 20 min (after Phase 3.4 setup) |
| **Risk** | Low |
| **Dependencies** | Phase 3.4 (react-helmet installation and HelmetProvider setup). |

---

## Implementation Order (Recommended)

| Order | Phase | Item | Why this order |
|-------|-------|------|----------------|
| 1 | P1.1 | Add favicon | 5 min, visible professionalism |
| 2 | P1.4 | Remove TODOs | 5 min, stops production embarrassment |
| 3 | P1.5 | Delete orphan images | 5 min, cleans up repo |
| 4 | P1.2 | Remove dead `.trust-bar` CSS | 5 min |
| 5 | P1.3 + P3.2 | Consolidate grid pattern together | Merge dead-code removal with consolidation |
| 6 | P1.6 + P4.2 | Canonical + robots/sitemap | Standard SEO trio |
| 7 | P2.5 | Verify LinkedIn URL | Quick check before other content work |
| 8 | P2.1 | Diversify icons | Visual polish, quick win |
| 9 | P2.4 | Shorten hero badge | Text change, quick |
| 10 | P2.3 | Simplify ContactForm messages | Prepare for Phase 3.1 |
| 11 | **P3.1** | **Make ContactForm functional** | **Highest-impact fix on the whole site** |
| 12 | P2.2 | Fix brand logos | After P3.1 (lower priority) |
| 13 | P3.4 + P4.1 + P4.4 | react-helmet + JSON-LD + per-page meta | SEO batch, natural grouping |
| 14 | P3.3 | Unify machine cards | UX consistency |
| 15 | P4.3 | Expand M 38-5 specs | Needs research, can be done last |

---

## Summary

| Phase | Items | Total Effort Estimate |
|-------|-------|----------------------|
| Phase 1 — Quick Wins | 6 | ~30 min |
| Phase 2 — Content/UX | 5 | ~70 min |
| Phase 3 — Architecture | 4 | ~110 min |
| Phase 4 — SEO/Standards | 4 | ~90 min |
| **Total** | **19** | **~5 hours** |

---

*End of proposal.*
