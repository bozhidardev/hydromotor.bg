# Phase 2 Product Review: SEO / Meta / Static Files

**Reviewer:** Subagent (Product Reviewer)
**Date:** 2026-05-21
**Status:** ✅ **PASS WITH NOTES**

---

## 1. react-helmet-async

| Check | Finding |
|---|---|
| In `package.json`? | ✅ `^3.0.0` — present |
| Installed in `node_modules`? | ✅ Verified `npm ls react-helmet-async` shows `react-helmet-async@3.0.0` |
| `HelmetProvider` wraps app? | ✅ In `main.jsx`: `<HelmetProvider><BrowserRouter>...</BrowserRouter></HelmetProvider>` |
| All pages import Helmet? | ✅ Every page component imports `{ Helmet }` from `react-helmet-async` |
| Build succeeds? | ✅ `npm run build` — 64 modules transformed, 0 errors. Dist generated. |

**Verdict: ✅ Pass**

---

## 2. Per-Page Titles

| Page | Title | Unique? |
|---|---|---|
| Home | `Хидромотор — Официален представител на Putzmeister в България | Бетонпомпи и сервиз` | ✅ |
| About | `За нас — Хидромотор ООД | 25+ години опит` | ✅ |
| Services | `Сервиз — Хидромотор ООД | Професионален сервиз за бетонпомпи` | ✅ |
| Contact | `Контакти — Хидромотор ООД | Телефон, адрес, имейл` | ✅ |
| Machines | `Машини — Автобетонпомпи Putzmeister и SANY | Хидромотор` | ✅ |
| MachineDetail | `{machine.name} — {machine.category} | Хидромотор` (dynamic) | ✅ |
| Downloads | `Каталози — Хидромотор | PDF каталози и брошури` | ✅ |
| NotFound | `Страницата не е намерена — Хидромотор` | ✅ |

All titles are unique, descriptive, and in Bulgarian. The MachineDetail page dynamically generates titles from `machines.js` data. The NotFound page (which was flagged as missing in the plan review) now has a proper Helmet block.

**Verdict: ✅ Pass**

---

## 3. Per-Page Meta Descriptions

| Page | Description length | Matches content? |
|---|---|---|
| Home | ~160 chars | ✅ Covers Putzmeister representation, concrete pumps, service, 25+ years |
| About | ~160 chars | ✅ Mentions 1996 founding, Putzmeister since 1998, service |
| Services | ~160 chars | ✅ Diagnostics, certified engineers, spare parts, 24/7 |
| Contact | ~160 chars | ✅ Phone, address, email, 24/7 — all match data |
| Machines | ~155 chars | ✅ Lists Putzmeister + SANY models |
| MachineDetail | machine.description.substring(0,155) | ✅ Dynamic, machine-specific |
| Downloads | ~140 chars | ✅ PDF catalogues named |
| NotFound | ~80 chars | ✅ Short "page not found" |

All descriptions are unique, descriptive, match actual page content, and do not contain fabricated claims.

**Verdict: ✅ Pass**

---

## 4. JSON-LD Structured Data

### Values vs Source of Truth

| Field | JSON-LD Value | Source of Truth | Match? |
|---|---|---|---|
| `@type` | `LocalBusiness` | Plan review amendment applied ✅ | ✅ |
| `name` | `Хидромотор ООД` | `COMPANY.fullName = 'ХИДРОМОТОР ООД'` | ✅ (case normalised) |
| `alternateName` | `Хидромотор` | `COMPANY.shortName = 'Хидромотор'` | ✅ |
| `description` | Putzmeister rep, pumps, service, 24/7 | `COMPANY.description` | ✅ |
| `url` | `https://hydromotor.bg` | Canonical link | ✅ |
| `foundingDate` | `1996` | `COMPANY.founded = 1996` | ✅ |
| `telephone` | `+359 2 999 75 06` | `CONTACT.phones[0] = '02 / 999 75 06'` | ✅ (internationalised) |
| `email` | `office@hydromotor.bg` | `CONTACT.emails[1]` | ✅ |
| `address.streetAddress` | `ул. Искър 53А` | `CONTACT.address` | ✅ |
| `address.addressLocality` | `с. Кривина` | `CONTACT.address` | ✅ |
| `address.postalCode` | `1588` | `CONTACT.address` | ✅ |
| `address.addressCountry` | `BG` | Bulgaria | ✅ |
| `contactPoint.telephone` | `+359 2 999 75 06` | `CONTACT.phones[0]` | ✅ |
| `sameAs` (Facebook) | Full URL | `CONTACT.facebook` | ✅ |
| `sameAs` (LinkedIn) | `https://www.linkedin.com/company/hydromotor` | Consistent with Footer | ✅ |

### ⚠️ Note: Logo URL Double-Pathing

The JSON-LD logo URL reads:

```
https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png
```

This has a duplicated `/hydromotor.bg` segment. The Vite `base` is `/hydromotor.bg/` which resolves static assets to paths like `/hydromotor.bg/images/...`, but in the JSON-LD the full domain `https://hydromotor.bg` is used as prefix. If the site deploys at the root of `hydromotor.bg`, the logo URL should be `https://hydromotor.bg/images/logo_Hydromotor.png`.

This mirrors the pre-existing deployment path inconsistency (Vite base vs canonical URLs) already flagged in the Phase 2 plan review. It only matters if a search engine crawler tries to fetch the logo URL and gets a 404 — not a blocker, but should be resolved before go-live.

**Verdict: ✅ Pass (with note)**

---

## 5. robots.txt

Located in `public/robots.txt` and copied to `dist/robots.txt` during build.

```
User-agent: *
Allow: /

Sitemap: https://hydromotor.bg/sitemap.xml
```

**Verdict: ✅ Pass**

---

## 6. sitemap.xml

Located in `public/sitemap.xml` and copied to `dist/sitemap.xml` during build.

### Route Coverage

| Route | In Sitemap? | Priority |
|---|---|---|
| `/` | ✅ | 1.0 |
| `/mashini` | ✅ | 0.9 |
| `/mashini/m38-5` | ✅ | 0.7 |
| `/mashini/m62-6` | ✅ | 0.7 |
| `/mashini/m36-4` | ✅ | 0.7 |
| `/mashini/sany-20m` | ✅ | 0.7 |
| `/mashini/sany-30m` | ✅ | 0.7 |
| `/mashini/sany-50m` | ✅ | 0.7 |
| `/mashini/sany-60m` | ✅ | 0.7 |
| `/serviz` | ✅ | 0.8 |
| `/kontakti` | ✅ | 0.8 |
| `/za-nas` | ✅ | 0.6 |
| `/katalozi` | ✅ | 0.5 |

All routes covered. All 7 machine slugs match `machines.js`. Priorities are reasonable. 

Minor: trailing-slash inconsistency — home `/` has a trailing slash, other routes don't. Not a blocker but worth normalising.

**Verdict: ✅ Pass**

---

## 7. No Claims Invented

All page content, titles, and descriptions are derived from:
- `src/data/content.js` (company info, descriptions, contact data)
- `src/data/machines.js` (machine specs and descriptions)
- Business facts (founding 1996, Putzmeister rep since 1998, phone numbers, address)

No fabricated or AI-invented claims detected. All descriptions match actual site content.

**Verdict: ✅ Pass**

---

## 8. No Regression

| Check | Result |
|---|---|
| Build succeeds | ✅ 64 modules, 0 errors, clean build |
| All routes preserved | ✅ Same 7 routes + catch-all as before |
| Components unchanged (no DOM restructuring) | ✅ Helmet only touches `<head>`, no layout/component changes |
| Visual design unaffected | ✅ Routings, Layout, Header, Footer all untouched |

**Verdict: ✅ Pass**

---

## Summary

| Criterion | Verdict |
|---|---|
| react-helmet-async setup | ✅ Pass |
| Per-page unique titles | ✅ Pass |
| Per-page meta descriptions | ✅ Pass |
| JSON-LD accuracy | ✅ Pass (with note on logo URL) |
| robots.txt | ✅ Pass |
| sitemap.xml | ✅ Pass |
| No invented claims | ✅ Pass |
| No regression | ✅ Pass |

### Actionable Notes (not blockers)

1. **JSON-LD logo URL double-path** — `https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png` should likely be `https://hydromotor.bg/images/logo_Hydromotor.png`. Resolve as part of the broader Vite base / canonical URL alignment.
2. **Sitemap trailing-slash inconsistency** — home has `/`, others don't. Minor. Recommend normalising to no-slash for consistency with the rest.
3. **Pre-existing deployment path mismatch** — Vite `base: '/hydromotor.bg/'` vs canonical/sitemap root `https://hydromotor.bg/` should be reconciled before production deployment.

---

## Final Verdict

✅ **PASS WITH NOTES**
