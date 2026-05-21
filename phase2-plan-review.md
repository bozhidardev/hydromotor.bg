# Phase 2 Review: SEO / Meta / Static Files

**Reviewer:** Subagent (Plan Auditor)
**Date:** 2026-05-21
**Status:** ✅ **APPROVED WITH REQUIRED AMENDMENTS**

---

## 2.1 Per-Page Meta via react-helmet-async

| Criterion | Finding |
|---|---|
| Already in `package.json`? | ❌ **Not present.** Must be installed: `npm install react-helmet-async` |
| Risk of breakage? | ✅ **Low.** Helmet only touches `<head>` — no DOM re-render churn. Well-tested library. |
| Meta descriptions match page content? | ✅ **Yes.** Verified each page's JSX against proposed descriptions below. |
| Unique title + description per page? | ✅ **Yes.** No two pages share the same title or description. |

### Per-page content verification

| Page | Actual content from JSX | Plan's suggested meta | Verdict |
|---|---|---|---|
| **Home** (`Home.jsx`) | Hero (Putzmeister/sales), Machines grid, Services, WhyHydromotor (25+ years), ServiceProcess, ContactMap | Title: "Хидромотор — Официален представител…" / Desc: covers sales, service, Putzmeister, 25+ yrs, 24/7 | ✅ Accurate |
| **About** (`About.jsx`) | Founded 1996, Putzmeister rep since 1998, selling points (25+ yrs, spare parts, workshop) | Title: "За нас — Хидромотор ООД" / Desc: mentions 1996 founding, Putzmeister rep since 1998 | ✅ Accurate |
| **Services** (`Services.jsx`) | Diagnostics, certified engineers (Germany training), spare parts stock, 24h delivery, mobile on-site repair, 24/7 emergency line | Title: "Сервиз — Хидромотор ООД" / Desc: diagnostics, repair, 24/7, certified engineers, spare parts | ✅ Accurate |
| **Machines** (`Machines.jsx`) | Lists Putzmeister (M 38-5, M 62-6, M 36-4) and SANY (20m, 30m, 50m, 60m) | Title includes "Автобетонпомпи Putzmeister и SANY" / Desc references both brands and examples | ✅ Accurate |
| **Machine Detail** (`MachineDetail.jsx`) | Reads `machine.name`, `machine.category`, `machine.description` from `machines.js` | Dynamic: `${machine.name} — ${machine.category} | Хидромотор` with description slice | ✅ Matches data structure |
| **Contact** (`Contact.jsx`) | Address (с. Кривина), phones (02 / 999 75 06, etc.), emails, 24/7 service line, Facebook link | Title: "Контакти — Хидромотор ООД" / Desc: phone, email, address, 24/7, Putzmeister | ✅ Accurate |
| **Downloads** (`Downloads.jsx`) | Maschinenliste 2022 (PDF), МАЙ-МАШИНИ 2020 (PDF) | Title: "Каталози — Хидромотор ООД" / Desc: names both PDFs | ✅ Accurate |

### ⚠️ Issue: Missing Helmet for NotFound component

The plan adds a Helmet fallback inside `MachineDetail.jsx` for invalid slugs — good. But there is **no Helmet block proposed for the standalone `NotFound.jsx` page** (the catch-all `*` route). While less critical, every rendered route should have a unique title for branding consistency.

**Required amendment:** Add a `<Helmet>` block to `src/pages/NotFound.jsx`:

```jsx
<Helmet>
  <title>Страницата не е намерена — Хидромотор</title>
  <meta name="description" content="Страницата, която търсите, не съществува или е преместена." />
</Helmet>
```

---

## 2.2 Canonical Link — ✅ Already Done

`<link rel="canonical" href="https://hydromotor.bg" />` exists in `index.html`. No changes needed.

> ⚠️ **Note (pre-existing):** The Vite `base` is set to `/hydromotor.bg/` while the canonical URL assumes root-domain deployment (`https://hydromotor.bg`). These are inconsistent. If the site lives at the root of `hydromotor.bg`, the Vite `base` should be `/`. If it's served at a sub-path, the canonical link is wrong. This was introduced in Phase 1 and affects the sitemap URLs too (see 2.5). Phase 2 is internally consistent with Phase 1's canonical choice, but this should be reconciled before production.

---

## 2.3 JSON-LD Structured Data

### Data accuracy check

| Field | Plan's value | Source of truth | Verdict |
|---|---|---|---|
| `name` | `Хидромотор ООД` | `content.js`: `COMPANY.fullName = 'ХИДРОМОТОР ООД'` | ✅ Correct (case diff trivial) |
| `alternateName` | `Хидромотор` | `content.js`: `COMPANY.shortName = 'Хидромотор'` | ✅ Correct |
| `foundingDate` | `1996` | `content.js`: `COMPANY.founded = 1996` | ✅ Correct |
| `telephone` | `+359 2 999 75 06` | `content.js`: `CONTACT.phones[0] = '02 / 999 75 06'` — correctly converted to international | ✅ Correct |
| `email` | `office@hydromotor.bg` | `content.js`: `CONTACT.emails[1] = 'office@hydromotor.bg'` | ✅ Correct |
| `url` | `https://hydromotor.bg` | `index.html` canonical | ✅ Correct |
| `address` | ул. Искър 53А, с. Кривина, София 1588, BG | `CONTACT.address = 'София 1588, с. Кривина, ул. "Искър" 53А'` | ✅ Correct |
| Facebook URL | Full Facebook profile URL | `CONTACT.facebook` in content.js | ✅ Correct |
| LinkedIn URL | `https://www.linkedin.com/company/hydromotor` | Hardcoded in `Footer.jsx` (not in content.js) | ✅ Consistent (same URL) |

### ⚠️ Issue 1: Logo URL is wrong

The plan's sample JSON contains:
```json
"logo": "https://hydromotor.bg/hydromotor.bg/images/logo.png"
```

The **actual logo filename** in `public/images/` is **`logo_Hydromotor.png`**, confirmed in `Header.jsx`:
```jsx
<img src={asset('images/logo_Hydromotor.png')} alt="Хидромотор" />
```

**Required amendment:** Change the logo URL to:
```json
"logo": "https://hydromotor.bg/hydromotor.bg/images/logo_Hydromotor.png"
```

(The plan acknowledges this needs verification but still shows the wrong path — it must be corrected before implementation.)

### ⚠️ Issue 2: `@type` should be `LocalBusiness`, not `Organization`

Schema.org's `LocalBusiness` is a subtype of `Organization` and is **more semantically precise** for an equipment company with:
- A physical service address (с. Кривина)
- On-site repair services
- Physical inventory/stock of spare parts
- Local B2B/B2C operations

**Recommended amendment:** Change `@type` from `"Organization"` to `"LocalBusiness"`:

```json
"@type": "LocalBusiness"
```

This gives search engines better context without losing any properties.

### JSON validity

The JSON shown in the plan is syntactically valid: no trailing commas, proper quoting. ✅

---

## 2.4 robots.txt — ✅ Approved

Standard minimal robots.txt:

```
User-agent: *
Allow: /

Sitemap: https://hydromotor.bg/sitemap.xml
```

No concerns. Note: the sitemap URL should be consistent with the canonical URL choice (see 2.5).

---

## 2.5 sitemap.xml

### Route coverage

| Route | Component | In sitemap? |
|---|---|---|
| `/` | Home | ✅ Yes |
| `/mashini` | MachinesPage | ✅ Yes |
| `/mashini/:slug` (7 machines) | MachineDetail | ✅ Yes (7 URLs) |
| `/serviz` | Services | ✅ Yes |
| `/za-nas` | About | ✅ Yes |
| `/kontakti` | Contact | ✅ Yes |
| `/katalozi` | Downloads | ✅ Yes |
| `*` | NotFound | ❌ Correctly excluded (catch-all) |

All routes covered. ✅

### Machine slugs match `machines.js`

| Plan sitemap slug | `machines.js` slug | Match |
|---|---|---|
| `m38-5` | `m38-5` | ✅ |
| `m62-6` | `m62-6` | ✅ |
| `m36-4` | `m36-4` | ✅ |
| `sany-20m` | `sany-20m` | ✅ |
| `sany-30m` | `sany-30m` | ✅ |
| `sany-50m` | `sany-50m` | ✅ |
| `sany-60m` | `sany-60m` | ✅ |

All match. ✅

### Priority values

| Page | Priority | Reasonable? |
|---|---|---|
| Home | 1.0 | ✅ Highest — main landing page |
| Machines | 0.9 | ✅ Key content, product catalog |
| Services | 0.8 | ✅ Important service offer |
| Contact | 0.8 | ✅ Important conversion page |
| Machine details | 0.7 | ✅ Individual product pages |
| About | 0.6 | ✅ Supporting page |
| Downloads | 0.5 | ✅ Low-priority archive |

Reasonable distribution. ✅

### Missing `<lastmod>`

Not included in the plan. Optional — search engines may ignore it for static SPAs anyway. Not a blocker.

### ⚠️ Deployment path concern (same as 2.2)

The sitemap uses `https://hydromotor.bg/` as the root, while Vite `base` is `/hydromotor.bg/`. If the deployment resolves to `https://hydromotor.bg/hydromotor.bg/mashini/...`, the sitemap URLs would 404. This is a pre-existing Phase 1 inconsistency and should be resolved holistically, but Phase 2's sitemap follows the Phase 1 canonical link convention.

---

## 2.6 Verification Checklist

| Check | In plan? | Adequate? |
|---|---|---|
| `npm run build` + inspect output HTML | ✅ Yes | ✅ |
| Verify `robots.txt` returns 200 | ✅ Yes | ✅ |
| Verify `sitemap.xml` returns 200 | ✅ Yes | ✅ |
| Test machine detail unique titles | ✅ Yes | ✅ |
| Validate structured data (Schema.org / Rich Results) | ✅ Yes | ✅ |

**Suggestion:** Add a check for trailing-slash consistency in sitemap URLs. Currently the sitemap has home as `https://hydromotor.bg/` (with slash) and all others without trailing slash (`https://hydromotor.bg/mashini`). Either convention is fine, but they should be consistent.

---

## Safety & Risk Assessment

| Concern | Assessment |
|---|---|
| Secrets exposed? | ✅ None. JSON-LD is public data. |
| Environment variables needed? | ✅ None. All data from codebase constants. |
| Route/rendering breakage risk? | ✅ Very low. Helmet only affects `<head>`. |
| SEO penalty from mistakes? | ⚠️ Minor. Wrong logo URL in JSON-LD is low-impact but should be fixed. |

---

## Required Amendments Summary

1. **Correct logo URL in JSON-LD:** `images/logo.png` → `images/logo_Hydromotor.png`
2. **Change `@type` from `Organization` to `LocalBusiness`** for better semantic accuracy
3. **Add `<Helmet>` block to standalone `NotFound.jsx`** page (the `*` route catch-all)
4. **Resolve deployment path inconsistency** between Vite `base: '/hydromotor.bg/'` and the canonical/sitemap URLs (`https://hydromotor.bg/...`) — either change Vite base or adjust canonical + sitemap. This is pre-existing from Phase 1 but critical to fix before go-live.

---

## Verdict

✅ **APPROVED WITH REQUIRED AMENDMENTS**

The plan is solid overall — well-researched, data sources are mostly accurate, and execution order is logical. The three data issues (logo filename, `@type`, missing NotFound Helmet) and one architectural concern (deployment path inconsistency) should be resolved before merging.
