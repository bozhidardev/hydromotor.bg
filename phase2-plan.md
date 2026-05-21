# Phase 2: SEO / Meta / Static Files — Plan

> No code edits. Install & create only.

---

## 2.1 Per-Page Meta Descriptions with react-helmet-async

**Current state:** All pages share one generic `<title>` and `<meta name="description">` from `index.html`.

**Solution:** Install `react-helmet-async` and add `<Helmet>` blocks per page.

### Installation

```bash
npm install react-helmet-async
```

### Changes Required

#### `src/main.jsx` — Wrap with `HelmetProvider`

```jsx
import { HelmetProvider } from 'react-helmet-async';

// wrapper:
<HelmetProvider>
  <BrowserRouter basename="/hydromotor.bg">
    ...
  </BrowserRouter>
</HelmetProvider>
```

#### Per-Page Helmet Blocks

| Page | Route | Suggested `<title>` | Suggested `<meta name="description">` |
|---|---|---|---|
| **Home** | `/` | `Хидромотор — Официален представител на Putzmeister в България` | Продажба и сервиз на бетонпомпи Putzmeister и SANY. 25+ години опит, 24/7 аварийна поддръжка. Резервни части и ремонт на място в цяла България. |
| **About** | `/za-nas` | `За нас — Хидромотор ООД` | Фирма Хидромотор ООД е основана през 1996 г. Официален представител на Putzmeister за България от 1998 г. Професионален сервиз и поддръжка на строителна техника. |
| **Services** | `/serviz` | `Сервиз — Хидромотор ООД` | Професионален сервиз за диагностика и ремонт на бетонпомпи и строителна техника. 24/7 аварийна помощ, сертифицирани инженери, резервни части на склад. |
| **Machines** | `/mashini` | `Машини — Автобетонпомпи Putzmeister и SANY | Хидромотор` | Автобетонпомпи Putzmeister (M 38-5, M 62-6, M 36-4) и SANY (20–60 м). Голям избор нови и употребявани машини за всякакви строителни задачи. |
| **Machine Detail** | `/mashini/:slug` | `${machine.name} — ${machine.category} | Хидромотор` (dynamic) | `${machine.description.slice(0,155)}...` — dynamic description per machine |
| **Contact** | `/kontakti` | `Контакти — Хидромотор ООД` | Свържете се с Хидромотор — телефон, имейл, адрес в София (с. Кривина). 24/7 сервизна линия. Официален представител на Putzmeister в България. |
| **Downloads** | `/katalozi` | `Каталози — Хидромотор ООД` | Изтеглете актуални каталози и списъци на машини — Maschinenliste 2022 и каталог на машините 2020. |

##### MachineDetail dynamic Helmet example

```jsx
import { Helmet } from 'react-helmet-async';

// inside the component when machine is found:
<Helmet>
  <title>{machine.name} — {machine.category} | Хидромотор</title>
  <meta name="description" content={`${machine.name} — ${machine.description.slice(0, 150)}`} />
</Helmet>
```

##### NotFound fallback in MachineDetail

```jsx
<Helmet>
  <title>Машината не е намерена — Хидромотор</title>
  <meta name="description" content="Търсената машина не съществува. Разгледайте наличните автобетонпомпи Putzmeister и SANY." />
</Helmet>
```

---

## 2.2 Canonical Link ✅ Already done in Phase 1

`<link rel="canonical" href="https://hydromotor.bg" />` exists in `index.html`.

---

## 2.3 JSON-LD Structured Data (Organization Schema)

**Where to put it:** `index.html` — inside `<head>`, after the canonical link.

**Data gathered from codebase:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Хидромотор ООД",
  "alternateName": "Хидромотор",
  "description": "Официален представител на Putzmeister за България. Продажба на бетонпомпи, тунелни машини, индустриални помпи. Професионален сервиз и 24/7 аварийна помощ.",
  "url": "https://hydromotor.bg",
  "logo": "https://hydromotor.bg/hydromotor.bg/images/logo.png",
  "foundingDate": "1996",
  "telephone": "+359 2 999 75 06",
  "email": "office@hydromotor.bg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Искър 53А, с. Кривина",
    "addressLocality": "София",
    "postalCode": "1588",
    "addressCountry": "BG"
  },
  "sameAs": [
    "https://www.facebook.com/%D0%A5%D0%B8%D0%B4%D1%80%D0%BE%D0%BC%D0%BE%D1%82%D0%BE%D1%80-%D0%9E%D0%9E%D0%94-955410091164089/",
    "https://www.linkedin.com/company/hydromotor"
  ]
}
```

**Implementation:** Add as a `<script type="application/ld+json">` block in `index.html`'s `<head>` — no dependency required.

**Logistics:** Verify logo URL once built. Current logo loading is via `<img src="…">` in components — locate the actual logo filename (likely in `public/images/` or via `asset()` helper). The Vite `%BASE_URL%` in `index.html` resolves to `/hydromotor.bg/` so the full URL would be `https://hydromotor.bg/hydromotor.bg/images/logo-…`.

**Telephone format:** Current phone `02 / 999 75 06` → schema expects `+359 2 999 75 06` (or `+35929997506`). Use international format.

---

## 2.4 robots.txt

**File:** `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://hydromotor.bg/sitemap.xml
```

---

## 2.5 sitemap.xml

**File:** `public/sitemap.xml`

All known routes (based on `App.jsx` routing & machine slugs):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hydromotor.bg/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/m38-5</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/m62-6</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/m36-4</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/sany-20m</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/sany-30m</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/sany-50m</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/mashini/sany-60m</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/serviz</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/za-nas</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/kontakti</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://hydromotor.bg/katalozi</loc>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

## 2.6 Verify Page Titles / Meta

Post-install checklist:

1. Build the site: `npm run build`
2. Inspect output HTML files — confirm each route has its own `<title>` and `<meta name="description">`
3. Verify `robots.txt` returns `200` at `https://hydromotor.bg/robots.txt`
4. Verify `sitemap.xml` returns `200` at `https://hydromotor.bg/sitemap.xml`
5. Test one or two machine detail pages render unique titles
6. Validate structured data with Google's Rich Results Test or Schema.org validator

---

## Execution Order

1. `npm install react-helmet-async`
2. Edit `src/main.jsx` — add `HelmetProvider`
3. Add `<Helmet>` to each page component
4. Add JSON-LD to `index.html`
5. Create `public/robots.txt`
6. Create `public/sitemap.xml`
7. Build & verify
