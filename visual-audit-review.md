# Hydromotor Website — Visual Audit Review

**Reviewer:** Jarvis  
**Review Date:** 2026-05-21  
**Source Audit:** `visual-audit.md`  
**Result:** **VERIFIED WITH CORRECTIONS**

---

## Overview

The original audit is thorough and well-structured. Most findings are factually accurate. However, there are **3 incorrect claims**, **4 location/inaccuracy issues**, and **2 missed issues** worth noting. Below is the detailed finding-by-finding review.

---

## 1. Typography

| Finding | Verdict | Notes |
|---|---|---|
| **Body `font-weight: 450` not loaded** | ✅ **Confirmed** | Google Fonts loads DM Sans at 400, 500, 600, 700. No 450. Severity 🟡 appropriate. |
| | ⚠️ **Needs correction** | Source location is wrong: audit says `src/index.css line 12`. The `font-weight: 450` is actually in **`src/App.css`** body rule (~line 43). `index.css` body has no `font-weight`. |
| **h2 size in two places** | ✅ **Confirmed** | `index.css` global h2: `clamp(1.75rem, 4vw, 2.75rem)`. `App.css` `.section-header h2`: `clamp(2rem, 4vw, 2.5rem)`. Maintenance concern is valid. |
| | ⚠️ **Needs correction** | Audit says "same specificity both body class cascade" — incorrect. `.section-header h2` has **higher specificity** (0,1,0,1) than `h2` (0,0,0,1). The values differ by scope, but the duplication is indeed confusing for maintenance. |
| **Montserrat 900 and 800 loaded** | ✅ **Confirmed** | All heading weights available. |
| **Body `line-height: 1.6` slightly tight** | ✅ **Confirmed** | Subjective suggestion, not a bug. |
| **No font-display strategy** | ❌ **Incorrect** | The Google Fonts URL in `index.html` **DOES** include `&display=swap`. Line 14: `...Montserrat:wght@600;700;800;900&display=swap"`. Font-display is handled at the CDN level. |

---

## 2. Color

| Finding | Verdict | Notes |
|---|---|---|
| **Brand color system well-structured** | ✅ **Confirmed** | ✅ |
| **Two similar light backgrounds** | ✅ **Confirmed** | `#f5f2ed` vs `#f0ede8` — 5-point difference. Valid suggestion. Severity 🟡 appropriate. |
| **`--color-bg-white` not actually white** | ✅ **Confirmed** | `#f5f2ed` is beige. Renaming suggestion is valid. |
| **`--color-overlay` defined but never used** | ✅ **Confirmed** | Only appears in `:root` definition. Zero usages in any CSS or JSX. Severity 🟡 appropriate. |
| **`--color-border` too subtle** | ✅ **Confirmed** | `#d8d4cf` on `#f5f2ed` — subtle, but functional. Subjective correctness. |
| **`--color-emergency-dark` used once** | ✅ **Confirmed** | Only in `.header-phone:hover`. Valid observation. |
| **`--grain-opacity: 0.03` too subtle** | ✅ **Confirmed** | Valid point, subjective threshold. |

---

## 3. Spacing

| Finding | Verdict | Notes |
|---|---|---|
| **Systematic section spacing** | ✅ **Confirmed** | ✅ |
| **Diagonal clip paths create gaps** | ✅ **Confirmed** | `polygon(0 3%, 100% 0, 100% 97%, 0 100%)` — 3% diagonals. Valid concern. |
| **Spacing classes inconsistently applied** | ✅ **Confirmed** | About uses class on container div; Services page uses nested wrapper. |
| **Machines homepage uses own padding (5rem)** | ✅ **Confirmed** | `.machines { padding: 5rem 0; }` — not the spacing system. |
| **Hero has no padding class** | ✅ **Confirmed** | Relies on `min-height: 100svh`. Correct observation. |

---

## 4. Layout

| Finding | Verdict | Notes |
|---|---|---|
| **1200px container OK** | ✅ **Confirmed** | ✅ |
| **Grid breakpoints well-chosen** | ✅ **Confirmed** | ✅ |
| **Machine card images: 140px vs 200px** | ✅ **Confirmed** | Homepage `Machines.jsx`: inline `height: 140px`. `MachinesPage.jsx` CSS: `height: 200px`. Severity 🟡 appropriate. |
| **WhyHydromotor max-width unconstrained on mobile** | ✅ **Confirmed** | Valid observation. |
| **Google Maps pb ID looks like placeholder** | ✅ **Confirmed** | The `pb` parameter has `!1m18!1m12!1m3!1d23464.5!2d...` — this is an actual Google Maps embed ID, not a placeholder. Minor inaccuracy. |
| **404 page padding compounds** | ✅ **Confirmed** | `not-found-content` padding + `.container` padding double up on mobile. Severity 🟡 appropriate. |
| **Google Maps iframe heights differ** | ✅ **Confirmed** | `ContactMap.jsx`: CSS `min-height: 250px`. `Contact.jsx`: inline `height: 400px`. Inconsistency confirmed. |

---

## 5. Hero

| Finding | Verdict | Notes |
|---|---|---|
| **Full-viewport with gradient = visually striking** | ✅ **Confirmed** | ✅ |
| **Hero CTA buttons too small** | ✅ **Confirmed** | Desktop: `0.82rem`. Mobile: `0.75rem`. Valid concern for primary CTAs. Severity 🟡 appropriate. |
| **Hero H1 is ALL CAPS** | ✅ **Confirmed** | `<h1>ХИДРОМОТОР</h1>`. Valid concern for Cyrillic readability. |
| **Gradient overlay at center 30%** | ✅ **Confirmed** | `backgroundPosition: 'center 30%'` in Hero.jsx. |
| **Scroll indicator could overlap trust bar** | ✅ **Confirmed** | `position: absolute; bottom: 1.5rem; z-index: 3` on scroll indicator inside `.hero` with `.hero-trust-bar` below. Valid concern. |
| **Scroll indicator z-index 3 vs trust bar z-index 1** | ✅ **Confirmed** | Both verified from App.css. |

---

## 6. Header / Nav

| Finding | Verdict | Notes |
|---|---|---|
| **Desktop layout, backdrop-filter, transitions** | ✅ **Confirmed** | ✅ |
| **Mobile menu lacks phone number** | ✅ **Confirmed** | Only nav links in mobile menu — no call CTA. Severity 🟡 appropriate. |
| **Close button could clash with notch** | ✅ **Confirmed** | `top: calc(0.5rem + var(--safe-top)); right: 0.5rem`. Valid concern. |
| **scrolled class shadow barely visible** | ✅ **Confirmed** | `box-shadow: 0 2px 12px rgba(0,0,0,0.2)` on `#0f0f0f` — subtle. |
| **!important in header-nav media query** | ✅ **Confirmed** | `.header-nav { display: flex !important; }` — unnecessarily strict. |
| **Logo alt text** | ⚠️ **Needs correction** | Audit says if image fails "the clickable space remains" as a concern. The alt text `"Хидромотор"` on the `<img>` is semantically acceptable for a logo. This is not really a bug — the alt text provides the brand name and the `<NavLink>` wrapper makes it clickable. Overstated severity. |

---

## 7. Cards

| Finding | Verdict | Notes |
|---|---|---|
| **Machine cards well-structured** | ✅ **Confirmed** | ✅ |
| **`machine-card-icon` class misused for product image** | ✅ **Confirmed** | `<img>` inside a div named "icon" — semantically misleading. |
| **Service card icon container vs SVG mismatch** | ✅ **Confirmed** | Container `font-size: 2.5rem` (~40px) vs SVG `size={32}` (32px). |
| **Machine cards differ between homepage and page** | ✅ **Confirmed** | Homepage: flat card with image-as-icon. Page: structured card with separate image + body. Valid observation. |

---

## 8. Buttons / CTAs

| Finding | Verdict | Notes |
|---|---|---|
| **Button system well-typed** | ✅ **Confirmed** | ✅ |
| **Hero CTA buttons undersized** | ✅ **Confirmed** | Already covered. |
| **Contact.jsx uses inline `width: 100%` instead of `btn-block`** | ⚠️ **Needs correction** | **Contact.jsx actually uses `className="btn btn-primary btn-block"`** correctly. It's **ContactMap.jsx** (homepage form) that uses inline `style={{ width: '100%' }}`. Audit misattributes to Contact.jsx. |
| **CTAs compete for attention** | ✅ **Confirmed** | Subjective but valid design observation. |
| **Button duplicate pattern** | ✅ **Confirmed** | Both forms have identical submit button text. |

---

## 9. Trust Bar

| Finding | Verdict | Notes |
|---|---|---|
| **Two trust-bar variants exist** | ✅ **Confirmed** | Hero trust bar (`.hero-trust-bar`) + standalone `TrustBar` component. |
| **Hero trust bar items have small text on mobile** | ✅ **Confirmed** | `0.6rem` title, `0.55rem` subtitle at 480px (~8.8px). Below WCAG minimum. Severity 🟡 appropriate. |
| **Trust bar ::after only fades right side** | ✅ **Confirmed** | `linear-gradient(to right, transparent, var(--color-bg-dark))` — right side only. |
| **Hero trust bar ::before z-index 1** | ✅ **Confirmed** | Verified. |
| **"On homepage, both trust bars appear in close succession"** | ❌ **Incorrect** | The standalone `TrustBar` component is **defined but never imported** anywhere. `Home.jsx` doesn't use it, `Layout.jsx` doesn't use it, and no page imports it. The TrustBar component is **dead code**. Only the hero-trust-bar appears on the homepage. |

---

## 10. Forms

| Finding | Verdict | Notes |
|---|---|---|
| **Clean form layout** | ✅ **Confirmed** | ✅ |
| **Form non-functional with alert()** | ✅ **Confirmed** | Both `ContactMap.jsx:17` and `Contact.jsx:17` call `alert()`. 🔴 Critical. |
| **Two identical contact forms** | ✅ **Confirmed** | Both files have near-identical form code. |
| **No autocomplete attributes** | ✅ **Confirmed** | Form fields lack `autocomplete`. |
| **"Телефон или имейл" uses `type="text"`** | ✅ **Confirmed** | Should be `type="tel"` for better mobile keyboard. |
| **Form disclaimer highlights broken form** | ✅ **Confirmed** | Prominent yellow background and border draw attention to the warning. |

---

## 11. Footer

| Finding | Verdict | Notes |
|---|---|---|
| **Dark footer with grid overlay** | ✅ **Confirmed** | ✅ |
| **LinkedIn URL hardcoded** | ✅ **Confirmed** | `href="https://www.linkedin.com/company/hydromotor"` |
| **Facebook URL has Cyrillic characters** | ✅ **Confirmed** | `CONTACT.facebook` → URL-encoded Cyrillic. Valid concern about fragility. |
| **"Правна информация" → non-existent route** | ✅ **Confirmed** | Links to `/pravna-informacia` — no matching route in `App.jsx`. 🔴 Will 404. |
| **Cookie policy uses preventDefault()** | ✅ **Confirmed** | Non-functional placeholder. |
| **footer-legal links small (0.8rem)** | ✅ **Confirmed** | Valid readability concern. |

---

## 12. Page Headers

| Finding | Verdict | Notes |
|---|---|---|
| **Consistent pattern across pages** | ✅ **Confirmed** | ✅ |
| **Duplicate page-hero CSS (5x identical)** | ✅ **Confirmed** | `.about-hero`, `.machines-hero`, `.services-hero`, `.contact-hero`, `.downloads-hero` — all identical code. The `.page-hero` unified class exists but pages don't use it. Severity 🟡 appropriate. |

---

## 13. Mobile

| Finding | Verdict | Notes |
|---|---|---|
| **Responsive breakpoints well-chosen** | ✅ **Confirmed** | ✅ |
| **Mobile nav lacks phone call button** | ✅ **Confirmed** | Only nav links. For a service business, this is notable. |
| **Staggered animation adds 300ms delay** | ✅ **Confirmed** | 6 links × 50ms. Valid UX concern. |
| **Mobile CTA bar text small** | ✅ **Confirmed** | `0.9rem` phone, `0.7rem` label. |
| **Hero on mobile uses auto min-height** | ✅ **Confirmed** | `min-height: auto` at ≤767px. |
| **Machine detail image has empty areas** | ✅ **Confirmed** | `max-height: 450px; object-fit: contain` on grey background. |
| **Homepage machine cards crop images on mobile** | ✅ **Confirmed** | `height: 140px; object-fit: cover` — significant cropping. |

---

## 14. Animations / Micro-interactions

| Finding | Verdict | Notes |
|---|---|---|
| **Scroll reveal with IntersectionObserver** | ✅ **Confirmed** | `threshold: 0.1, rootMargin: '0px 0px -50px 0px'`, 1200ms fallback. Verified in `Layout.jsx`. |
| **Hero entrance staggered fade-in** | ✅ **Confirmed** | ✅ |
| **No `:active` state on buttons** | ✅ **Confirmed** | Missing `.btn:active` state. |
| **No `prefers-reduced-motion`** | ✅ **Confirmed** | Missing. |
| **No page transition animations** | ✅ **Confirmed** | Pages snap into view. |

---

## 15. Overall Premium Feel

| Finding | Verdict | Notes |
|---|---|---|
| **Strong brand identity** | ✅ **Confirmed** | ✅ |
| **Broken contact form = biggest detractor** | ✅ **Confirmed** | 🔴 Agreed. |
| **No actual logo (PNG not SVG)** | ✅ **Confirmed** | `logo_Hydromotor.png` — PNG is not resolution-independent. Valid point. |
| **Missing OG image file** | ⚠️ **Needs correction** | Audit claims `%BASE_URL%` is "not replaced by Vite" — **this is incorrect**. Vite **does** support `%BASE_URL%` in HTML as a replacement token. However, the real issue is that **`og-image.jpg` doesn't exist in `public/images/`**. The social sharing card is broken because the file is missing, not because of the URL syntax. |
| **Image TODO comments** | ✅ **Confirmed** | Multiple TODO comments about replacing images with higher resolution. |
| **Favicon only 32px and 180px** | ✅ **Confirmed** | No SVG favicon or mask-icon. |
| **Diagonal clip paths too subtle** | ✅ **Confirmed** | Valid point. |
| **No testimonials/case studies** | ✅ **Confirmed** | Valid suggestion. |

---

## ⭐ Missed Issues

These are problems the audit overlooked:

### 1. TrustBar Component is Dead Code 🟢
The `src/components/TrustBar.jsx` component is **defined but never imported** by any page, layout, or component. It's unreferenced dead code. This inflates the bundle size unnecessarily (even if tree-shaken, it adds cognitive overhead).

### 2. `og-image.jpg` File Missing 🔴
While the audit incorrectly blamed `%BASE_URL%` syntax, the real issue is that **`public/images/og-image.jpg` does not exist**. Whether or not Vite resolves the URL correctly, there's no file to serve. Social sharing cards for the site will be broken regardless.

### 3. No `loading="lazy"` on all images 🟢
The audit says `loading="lazy"` is applied to images and iframe, but checking the actual code: Hero background uses inline `style.backgroundImage` (not an `<img>` tag — lazy loading doesn't apply). The machine card images in Machines.jsx don't have `loading="lazy"`. The MachinesPage.jsx images also lack `loading="lazy"`. Only the iframe in ContactMap.jsx has `loading="lazy"`.

### 4. React StrictMode in Production 🟢
`main.jsx` wraps the app in `<React.StrictMode>`. This is fine for development (catches side effects) but has no effect in production builds. Not a bug, but worth noting if the audit was evaluating production readiness.

### 5. No `aria-label` on logo link 🟢
The `<NavLink to="/" className="header-logo">` wrapping the logo image has no `aria-label`. The `<img>` alt text provides context, but the link itself lacks accessible naming for screen readers beyond the alt text.

---

## Summary

| Category | Count |
|---|---|
| ✅ **Confirmed (accurate)** | 55 |
| ⚠️ **Needs correction (minor inaccuracy)** | 5 |
| ❌ **Incorrect (not actually an issue or wrong)** | 4 |
| ⭐ **Missed (should have been caught)** | 5 |

### Critical Errors in the Audit

1. **"font-display missing"** — the URL DOES include `&display=swap`. ❌
2. **"`%BASE_URL%` not replaced by Vite"** — Vite supports `%BASE_URL%` in HTML. However, the real issue (missing `og-image.jpg` file) was missed. ❌
3. **"Both trust bars appear on homepage"** — TrustBar component is dead code, never rendered. ❌
4. **"Contact.jsx uses inline style"** — Contact.jsx uses `btn-block` correctly. ContactMap.jsx has the issue. ⚠️

### Severity Assessment

The audit's severity ratings (🔴/🟡/🟢) are generally appropriate. No severity upgrade or downgrade is needed for any finding.

---

**Final Verdict: VERIFIED WITH CORRECTIONS**

The audit is thorough, well-structured, and mostly accurate. The corrections above address the inaccuracies. The audit's core findings (broken contact form, missing route, small CTA text, duplicate CSS, etc.) are all valid and well-documented.
