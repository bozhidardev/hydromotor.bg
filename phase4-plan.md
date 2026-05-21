# Phase 4 — Brand/Assets/Content Cleanup Plan

## 4.1 Diversify WhyHydromotor Icons

**Current state:** All 4 selling points in `src/components/WhyHydromotor.jsx` use `<IconShield />`.

**Available custom icons in `src/components/Icons.jsx`:**
`IconPhone`, `IconMail`, `IconMapPin`, `IconWrench`, `IconAlertTriangle`, `IconFileText`, `IconTruck`, `IconSearch`, `IconFactory`, `IconHandshake`, `IconPackage`, `IconGraduationCap`, `IconShield`, `IconArrowUp`, `IconChevronDown`, `IconPdf`, `IconBuilding`, `IconFacebook`, `IconLinkedin`

**lucide-react is NOT installed** (not in `package.json`) — cannot use external Lucide icons without adding the dependency.

**Recommended mapping (use existing custom icons only):**

| Selling Point (title) | Icon to use | Reason |
|---|---|---|
| "25+ години продажба на нови и употребявани машини" | **`IconClock`** (create in Icons.jsx) | Best fit for years/experience |
| "Официален представител на Putzmeister" | **`IconHandshake`** (exists) | Partnership / representation |
| "Богат избор резервни части и консумативи на склад" | **`IconPackage`** (exists) | Spare parts / inventory |
| "Отлично оборудван сервиз за диагностика и ремонт" | **`IconWrench`** (exists) | Service / repair |

**Creating IconClock — SVG path:**
Add to `src/components/Icons.jsx`:
```jsx
export function IconClock({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
```

**Action items:**
1. Add `IconClock` to `src/components/Icons.jsx`
2. In `src/components/WhyHydromotor.jsx`:
   - Import `{ IconHandshake, IconPackage, IconWrench, IconClock }`
   - Map each selling point to the appropriate icon (index-based)

---

## 4.2 Fix Brand Identity (Putzmeister logo + SANY logo)

**Current state in `src/pages/Machines.jsx`:**

```jsx
{/* Putzmeister Section */}
<h2 className="brand-title">
  <img src={asset('images/putzmeister-p2.jpg')} alt="Putzmeister" className="brand-logo-img" loading="lazy" />
  Putzmeister
</h2>

{/* SANY Section */}
<h2 className="brand-title">SANY</h2>
```

**Facts:**
- `putzmeister-p2.jpg` is 400×284 px, 72 KB — same dimensions as the other machine photos (`p4.jpg` = 20 KB, `p5.jpg` = 42 KB, `p6.jpg` = 74 KB). It is **a machine photo, not a logo**. Named "p2" likely for a discontinued old Putzmeister model.
- **No official brand logo** exists in `public/images/` for Putzmeister (no SVG or proper logo image).
- SANY section has zero visual branding — just raw text.

**Recommended approach (Option C — text-only for both):**
1. Remove the `<img src={asset('images/putzmeister-p2.jpg')} ...>` tag from the Putzmeister section
2. Keep both brand titles as plain text `<h2>` elements — consistent and honest
3. Delete `putzmeister-p2.jpg` from `public/images/` if not used elsewhere (check first — it's not used anywhere else in the codebase currently)

**Alternative (Option A — if you source official logos later):**
- Obtain official Putzmeister and SANY logo SVGs (from brand guidelines or official press kits)
- Place them in `public/images/` (e.g., `putzmeister-logo.svg`, `sany-logo.svg`)
- Add `<img>` tags for both, side by side

---

## 4.3 Verify LinkedIn URL

**Current state:**
- LinkedIn URL is **hardcoded** in `src/components/Footer.jsx`:
  ```jsx
  <a href="https://www.linkedin.com/company/hydromotor" ...>
  ```
- It is **NOT** in `src/data/content.js` — only `CONTACT.facebook` is defined there.
- The Facebook URL is in `content.js` and consumed via `{CONTACT.facebook}`.

**LinkedIn verification:**
- `curl -L` to `https://www.linkedin.com/company/hydromotor` returned **HTTP 999** (LinkedIn rate limiter/bot protection). Cannot confirm via automated check.
- The URL structure `linkedin.com/company/hydromotor` looks plausible but needs **manual verification** by a human.

**Action items:**
1. Recommend adding the LinkedIn URL to `CONTACT` in `src/data/content.js` (e.g., `CONTACT.linkedin`), then reference it in Footer.jsx — consistent with how Facebook is handled.
2. Have a human open `https://www.linkedin.com/company/hydromotor` in a browser to confirm the page exists.

---

## 4.4 Rename Cyrillic PDFs to ASCII-safe

**Current state:**

| File on disk | Reference in `Downloads.jsx` |
|---|---|
| `public/pdfs/Maschinenliste.pdf` | `/pdfs/Maschinenliste.pdf` ✅ |
| `public/pdfs/МАЙ-МАШИНИ.pdf` | `/pdfs/%D0%9C%D0%90%D0%99-%D0%9C%D0%90%D0%A8%D0%98%D0%9D%D0%98.pdf` (URL-encoded Cyrillic) ⚠️ |
| (also present in `dist/pdfs/`) | |

**Recommended rename:**
```
МАЙ-МАШИНИ.pdf  →  maj-mashini-2020.pdf
```

**Action items:**
1. Rename file: `mv public/pdfs/МАЙ-МАШИНИ.pdf public/pdfs/maj-mashini-2020.pdf`
2. Rename file: `mv dist/pdfs/МАЙ-МАШИНИ.pdf dist/pdfs/maj-mashini-2020.pdf` (or rebuild later)
3. Update `src/pages/Downloads.jsx`:
   ```jsx
   file: '/pdfs/maj-mashini-2020.pdf',
   ```
4. `Maschinenliste.pdf` is already ASCII-safe — leave as-is.

---

## 4.5 Expand M 38-5 Specs

**Current state in `src/data/machines.js`:**

| Machine | Number of specs |
|---|---|
| **M 38-5** | **4** (Вертикален обхват, Брой рамене, Сгъване, Тръбопровод) |
| M 36-4 | 10 (includes height, reach, depth, unfolding, pump options, etc.) |
| M 62-6 | 6 |
| SANY models | 6–13 each |

**M 38-5 is clearly under-detailed** compared to the M 36-4 (same brand, one step down).

**Source data availability:**
- Searched the entire codebase — no additional `.txt`, `.html`, `.json`, or other files contain M 38-5 data
- The PDF `Maschinenliste.pdf` might contain specs but cannot be parsed programmatically here
- The old website content was not extracted for this specific model
- **No real source data exists** within the project to pull from

**Recommendation:**
- **Do not invent specs.** Adding fake technical data is dangerous (liability for a machinery company).
- Two paths forward:
  1. **Human provides specs** — someone with access to Putzmeister M 38-5 datasheet or brochure should fill in the missing details
  2. **Extract from PDF** — open `public/pdfs/Maschinenliste.pdf` and check if M 38-5 is listed there (manual)

**If specs become available, the structure should include** (based on M 36-4 pattern):
- Вертикален обхват
- Хоризонтален обхват
- Дълбочина на обхват
- Височина на разгъване
- Тръбопровод
- Опции за помпа
- Макс. крайна цев (end hose)
- etc.

---

## Summary of Changes Needed (code edits required)

| # | File(s) | Change |
|---|---|---|
| 4.1 | `src/components/Icons.jsx` | Add `IconClock` SVG component |
| 4.1 | `src/components/WhyHydromotor.jsx` | Map icons: Clock, Handshake, Package, Wrench |
| 4.2 | `src/pages/Machines.jsx` | Remove `<img>` from Putzmeister title; optionally add SANY logo |
| 4.2 | `public/images/putzmeister-p2.jpg` | Delete if not used elsewhere |
| 4.3 | `src/data/content.js` | Add `CONTACT.linkedin` |
| 4.3 | `src/components/Footer.jsx` | Reference `CONTACT.linkedin` instead of hardcoded URL |
| 4.4 | Shell | `mv public/pdfs/МАЙ-МАШИНИ.pdf public/pdfs/maj-mashini-2020.pdf` |
| 4.4 | `dist/pdfs/МАЙ-МАШИНИ.pdf` | Same rename if rebuilding dist |
| 4.4 | `src/pages/Downloads.jsx` | Update file reference to `/pdfs/maj-mashini-2020.pdf` |
| 4.5 | `src/data/machines.js` | Expand M 38-5 specs only when real source data is provided |
