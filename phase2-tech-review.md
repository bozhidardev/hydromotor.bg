# Phase 2 Technical Review — SEO / Meta / Static Files

**Project:** hydromotor.bg  
**Reviewer:** Subagent (auto)  
**Date:** 2026-05-21  
**Verdict:** ✅ **PASS WITH NOTES**

---

## 2.1 react-helmet-async

| Check | Status |
|---|---|
| `package.json` lists `react-helmet-async` | ✅ `"react-helmet-async": "^3.0.0"` present |
| `src/main.jsx` wraps app in `<HelmetProvider>` | ✅ `<HelmetProvider>` wraps `<BrowserRouter>` |
| `src/pages/Home.jsx` — Helmet import + block | ✅ |
| `src/pages/About.jsx` — Helmet import + block | ✅ |
| `src/pages/Services.jsx` — Helmet import + block | ✅ |
| `src/pages/Machines.jsx` — Helmet import + block | ✅ |
| `src/pages/MachineDetail.jsx` — Helmet (normal + 404) | ✅ Both branches have `<Helmet>` blocks |
| `src/pages/Contact.jsx` — Helmet import + block | ✅ |
| `src/pages/Downloads.jsx` — Helmet import + block | ✅ |
| `src/pages/NotFound.jsx` — Helmet import + block | ✅ |
| No duplicate `<title>` in `index.html` | ✅ Global fallback title exists — standard SPA pattern; Helmet overrides it client-side. No issue. |

**Result: PASS** — All pages have proper Helmet coverage.

---

## 2.2 Canonical

Already verified in Phase 1. `index.html` includes:

```html
<link rel="canonical" href="https://hydromotor.bg" />
```

**Note:** Since `vite.config.js` sets `base: '/hydromotor.bg/'`, the canonical pointing to root (`https://hydromotor.bg`) while the app actually lives at `https://hydromotor.bg/hydromotor.bg/` is inconsistent. If the domain already resolves to the app, this is fine. If the app is at a sub-path, the canonical should match the sub-path. Verify deployment setup.

**Result: PASS** (with the above caveat noted).

---

## 2.3 JSON-LD

| Check | Status |
|---|---|
| Block present in `index.html` | ✅ `<script type="application/ld+json">` exists |
| `@type` is `LocalBusiness` | ✅ Correct (per plan review) |
| Logo filename is `logo_Hydromotor.png` | ✅ Correct (not `logo.png`) |
| JSON is valid (no trailing commas, proper escaping) | ✅ Well-formed |

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Хидромотор ООД",
  "logo": "https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png",
  ...
}
```

**⚠️ Note:** The logo URL path is `https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png` — note the double `hydromotor.bg/hydromotor.bg`. This is technically consistent with `base: '/hydromotor.bg/'` in vite config, but if the site is expected to be served at the domain root, this URL will 404. Verify the actual deployment path. Consider making the logo URL use `%BASE_URL%` or a dynamic asset helper.

**Result: PASS** (with advisory note on logo URL).

---

## 2.4 robots.txt

| Check | Status |
|---|---|
| Exists at `public/robots.txt` | ✅ |
| Content correct | ✅ |

```
User-agent: *
Allow: /

Sitemap: https://hydromotor.bg/sitemap.xml
```

**Result: PASS**

---

## 2.5 sitemap.xml

| Check | Status |
|---|---|
| Exists at `public/sitemap.xml` | ✅ |
| XML well-formed | ✅ |
| All 7 machine slugs match `src/data/machines.js` | ✅ |

Machine slugs in sitemap:
- `m38-5` ✅
- `m62-6` ✅
- `m36-4` ✅
- `sany-20m` ✅
- `sany-30m` ✅
- `sany-50m` ✅
- `sany-60m` ✅

Total URLs: 13 (1 home + 1 machines listing + 7 machine details + 1 services + 1 contact + 1 about + 1 downloads) ✅

**Note:** `sitemap.xml` lives at `public/sitemap.xml` and robots.txt references `https://hydromotor.bg/sitemap.xml`. Since `base` is `/hydromotor.bg/`, during Vite build the sitemap will be at `https://hydromotor.bg/hydromotor.bg/sitemap.xml`. The robots.txt sitemap URL should reflect the actual deployment path. Update if needed.

**Result: PASS** (with advisory note on sitemap URL path).

---

## 2.6 Per-Page Meta

| Page | Title | Description | Status |
|---|---|---|---|
| Home | `Хидромотор — Официален представител на Putzmeister в България \| Бетонпомпи и сервиз` | Matches page content. Mentions Putzmeister, sales, service, 25+ years. | ✅ |
| About (za-nas) | `За нас — Хидромотор ООД \| 25+ години опит` | Matches page content — founded 1996, Putzmeister since 1998, service/parts. | ✅ |
| Services (serviz) | `Сервиз — Хидромотор ООД \| Професионален сервиз за бетонпомпи` | Matches page — diagnostics, repairs, certified engineers, 24/7 emergency. | ✅ |
| Machines (mashini) | `Машини — Автобетонпомпи Putzmeister и SANY \| Хидромотор` | Matches page content — lists brands, sales, service, parts. | ✅ |
| MachineDetail | `{machine.name} — {machine.category} \| Хидромотор` (dynamic) | Uses `machine.description.substring(0, 155)` — dynamically generated, relevant. | ✅ ⚠️ |
| Contact (kontakti) | `Контакти — Хидромотор ООД \| Телефон, адрес, имейл` | Matches page — phone, address, email, 24/7 service. | ✅ |
| Downloads (katalozi) | `Каталози — Хидромотор \| PDF каталози и брошури` | Matches page — PDF catalogs, brochures. | ✅ |
| NotFound | `Страницата не е намерена — Хидромотор` | Matches 404 context. | ✅ |

All titles are unique and descriptive. No duplicates. ✅

**⚠️ Note (MachineDetail):** The meta description uses `machine.description.substring(0, 155)`. While functional, substring truncation can cut mid-word or mid-sentence (e.g., "характеристи" instead of "характеристики"). Consider using a proper truncation function that respects word boundaries, or write explicit short descriptions for each machine.

**Result: PASS** (with advisory on MachineDetail description truncation).

---

## Build

```
vite v5.4.21 building for production...
✓ 64 modules transformed.
✓ built in 958ms
```

**Result: ✅ PASS — 0 errors, 0 warnings.**

---

## Summary

| Section | Verdict |
|---|---|
| 2.1 react-helmet-async | ✅ PASS |
| 2.2 Canonical | ✅ PASS (minor advisory) |
| 2.3 JSON-LD | ✅ PASS (minor advisory) |
| 2.4 robots.txt | ✅ PASS |
| 2.5 sitemap.xml | ✅ PASS (minor advisory) |
| 2.6 Per-page meta | ✅ PASS (minor advisory) |
| Build | ✅ PASS |

## Overall: ✅ **PASS WITH NOTES**

### Advisories (non-blocking)

1. **Deployment path consistency:** `vite.config.js` sets `base: '/hydromotor.bg/'` but canonical, JSON-LD logo URL, and sitemap reference point to root `https://hydromotor.bg`. If the app is deployed at the sub-path, these URLs should use `/hydromotor.bg/` prefix. If deployed at root, `base` should be `/`. Verify and align.

2. **Logo URL in JSON-LD:** Currently `https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png`. The double path may 404 depending on deployment. Consider using a dynamic helper or `%BASE_URL%`.

3. **MachineDetail meta description:** `machine.description.substring(0, 155)` can cut words abruptly. Use a word-boundary-aware truncation for cleaner snippets.
