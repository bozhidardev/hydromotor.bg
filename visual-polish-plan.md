# Visual Polish + Consistency Plan — hydromotor.bg

**Project:** React/Vite SPA — Official Putzmeister distributor in Bulgaria  
**Identity:** Black/gold (#f9c500) industrial B2B machinery  
**Design tone:** Premium industrial, dark charcoal, serious, client-ready

---

## 1. Current Style Inconsistencies Found

After reading all source files (App.css + 16 components/pages), here are the concrete inconsistencies:

### 1.1 Page Hero/Header Inconsistency

| Page | CSS class | h1 size | Subtitle style | Gold accent line |
|------|-----------|---------|----------------|------------------|
| About | `.about-hero` | `clamp(2,4vw,3rem)` | **Gold text** via `.about-hero-subtitle { color: #f9c500 }` | ✅ |
| Machines | `.machines-hero` | `clamp(2,4vw,3rem)` | White `<p>` — no colored subtitle | ✅ |
| Services | `.services-hero` | `clamp(2,4vw,3rem)` | White `<p>` — no colored subtitle | ✅ |
| Contact | `.contact-hero` | `clamp(2,4vw,3rem)` | White `<p>` — no colored subtitle | ✅ |
| Downloads | `.downloads-hero` | `clamp(2,4vw,3rem)` | White `<p>` — no colored subtitle | ✅ |
| MachineDetail | `.machine-detail-hero` | `clamp(1.75,3.5vw,2.5rem)` — different! | category text not a subtitle | ✅ |

**Problem:** About page is the only one with gold subtitle text. MachineDetail has a smaller h1. No consistent pattern.

### 1.2 Page Background Styling

The "Visual Polish" section of App.css adds radial-gradient backgrounds + gold-tinted borders to:
- `.about-page`, `.machines-page`, `.services-page`, `.downloads-page` ✅

**But NOT to:**
- `.contact-page` — missing background radial gradient
- Machine detail pages — no matching treatment

### 1.3 Section Spacing

| What | Desktop spacing | Mobile spacing |
|------|----------------|----------------|
| `.section-light-spacing` | 5rem | 3rem |
| `.section-dark-spacing` | 4rem | 2.5rem |
| `.machines` (homepage) | 5rem (hardcoded, not using class) | 3rem |
| `.services` (homepage) | 5rem (hardcoded) | 3rem |
| `.why-hydromotor` (homepage) | 5rem (hardcoded) | 3rem |
| `.contact-map` (homepage) | 5rem (hardcoded) | 3rem |
| `.about-content` | 4rem → **4.5rem** (overridden in Visual Polish) | — |
| `.services-content` | 4rem → **4.5rem** (overridden) | — |
| `.machines-page` | pb: 4rem | — |
| `.service-process` | 4rem (hardcoded as its own class) | 2.5rem |

**Problem:** Mix of hardcoded paddings and CSS-class-based paddings. Some sections not using the system classes.

### 1.4 Card & Visual Styling

**Visual Polish section** adds gold-tinted borders and backgrounds to inner-page elements, but NOT to:
- Homepage `.machine-card` (in `Machines.jsx`) — not gold-tinted
- Homepage `.service-card` — not gold-tinted
- `.why-point` — not gold-tinted
- Contact form — no gold border treatment

These homepage section components look comparatively plain vs. inner pages.

### 1.5 Trust Bar on Mobile

- `.trust-bar` (separate component) exists in CSS but doesn't appear to be used in any component
- `.hero-trust-bar` is used inside Hero component
- Mobile hero trust bar shows 2 columns at <480px, hiding icons on smallest screens — inconsistent with desktop layout

### 1.6 Button/Link Mix

- Home machine cards use `.machine-card-link` ("Научи повече →") — not a `<button>` or `.btn`
- Services homepage section uses `.btn-outline` for "Виж всички услуги →"
- Some CTAs are real `<a>` tags, some are `<Link>`, some are `<button>`

---

## 2. Why Mobile Hero Text Is Cut Off

### Root cause analysis

The hero layout on mobile:

```
┌─────────────────────┐
│  HEADER (70px + safe-top) │  ≈80px+
├─────────────────────┤
│                     │
│   hero-inner        │  min-height: 60dvh (@<768px)
│   padding:          │             50dvh (@<480px)
│   4rem top          │
│   1.5rem sides      │
│   2rem bottom       │
│                     │
│   Content:          │
│   ─ badge           │
│   ─ h1 "ХИДРОМОТОР" │  clamp(3rem, 6vw, 5rem) → ~48px
│   ─ subtitle (1.2rem)│
│   ─ body text       │
│   ─ 2 stacked full- │
│     width buttons   │
│                     │
├─────────────────────┤
│  hero-trust-bar     │  padding + 2-col grid
├─────────────────────┤
│  scroll-indicator   │  (hidden on mobile)
└─────────────────────┘
```

**On iPhone SE (375×667):** 100dvh = 667px. Subtract header ~80px. Then hero-inner at 50dvh = ~334px. With 4rem (64px) top padding and 2rem (32px) bottom padding, available content area = ~238px. The content needs roughly:
- Badge: ~30px
- h1 (48px line-h 1.0): 48px
- Subtitle (19px + margin): ~30px
- Body text: ~80px  
- Two stacked buttons (48px each + 0.85rem gap): ~110px

**Total needed: ~298px but available is ~238px** → text gets clipped at the bottom.

**On iPhone 14 (390×844):** Same calculation with 50dvh = ~422px, minus padding = ~326px — marginal, still tight.

**The gradient overlay** on mobile switches to `180deg` vertical gradient, which is correct, but it doesn't compensate for the space issue.

### Secondary issue: Background image crop
Hero image uses `background-position: center 30%` — on mobile portrait this crops the subject oddly because the aspect ratio changes completely.

---

## 3. CTA Hierarchy Decision

### Current CTA Count (worst case on mobile):
1. **Header mobile menu** → phone + label
2. **Hero** → "ПОИСКАЙ ОФЕРТА" + "24/7 СЕРВИЗ" (full-width stacked)
3. **Mobile CTA bar** → phone + "Запитване" (appears after scrolling past hero)
4. **Footer** → phone, 24/7, email links

**That's 2-6 competing CTAs visible at once.** Too many.

### Proposed CTA Hierarchy

#### Desktop:
| Position | CTA | Style | Notes |
|----------|-----|-------|-------|
| Header right | Compact phone + label | `.header-phone-desktop` | ✅ **Keep as-is** — clean, non-intrusive |
| Hero | "Поискай оферта" (primary) | `btn-primary` | ✅ **Keep** |
| Hero | "Сервиз" (secondary) | `btn-outline-light` | ✅ **Keep** — change text to "24/7 Сервиз" |
| Machine cards | "Виж детайли →" | `.machine-card-link` | ✅ **Keep** — card-level CTA |
| Footer | Contact info | Normal links | ✅ **Keep** |

#### Mobile (<768px):
| Position | CTA | Style | Notes |
|----------|-----|-------|-------|
| Header (hamburger) | — | — | No CTA; just menu toggle |
| Mobile menu bottom | Compact phone CTA | `.header-phone-mobile` | ✅ **Keep** — single phone CTA in drawer |
| Hero | "Поискай оферта" (primary) | `btn-primary btn-block` | ✅ **Keep** — one primary action |
| Hero | "24/7 Сервиз" | `btn-outline-light btn-block` | ✅ **Keep** — but make it a text link or smaller btn on mobile |
| ~~Mobile CTA bar~~ | ~~phone + запитване~~ | ❌ **Remove or replace** | |

**Decision on Mobile CTA bar:**
- **Remove the double-button layout.** Replace with a single, slim floating button that appears on scroll — just a phone icon + number, subtle.
- Alternatively, **remove entirely** — hero already has CTAs, mobile menu has a phone link.
- **Recommended:** Replace with a slim `position: fixed` bar at bottom that only shows the phone number with a small icon, no "Запитване" button. This preserves accessibility without duplication.

Or simply **remove the MobileCtaBar component** — the user can scroll up to hero CTAs or open the mobile menu for the phone link. This is the cleanest solution.

#### CTA Styling Rules:
- **Gold buttons** (`btn-primary`) = primary action (quote request, main CTA)
- **Outline buttons** = secondary action (explore, learn more)
- **Emergency red** = ONLY for 24/7 phone/hotline (currently red is used on header phone)
- **No more than 2 CTAs visible at once** in the hero/viewport
- **Mobile = 1 primary + 1 optional secondary** (not stacked if possible)

---

## 4. Page Header / Style Consistency Rules

### Unified Page Hero (All Inner Pages)

```css
.page-hero {
  padding: 5rem 0 3rem;
  background: linear-gradient(135deg, var(--color-bg-dark), var(--color-bg-dark-alt));
  text-align: center;
  position: relative;
}
.page-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 20%, var(--color-primary) 80%, transparent 100%);
}
.page-hero h1 {
  color: var(--color-text-white);
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.75rem;
}
.page-hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}
```

**Rules:**
1. Every inner page uses the same `.page-hero` class (consolidate the 6 separate hero classes)
2. h1 = white, `clamp(2rem, 4vw, 3rem)`
3. Subtitle = white/gray `rgba(255,255,255,0.7)`, never gold
4. Gold #f9c500 only for: underlines, badges, icons, active nav, accent elements, not full headings
5. MachineDetail page hero gets same treatment (currently has a different h1 size)
6. All pages include the gold gradient bottom line

### Gold Color Usage Rules:
- ✅ Gold for: accent underline, `.machine-card-brand` badge, process step numbers, contact icons, spec chips, trust-bar icons, footer accent lines, hover states, active nav link, scroll-to-top button
- ✅ Gold for: bullet icons in feature lists, star/check icons if any
- ❌ NOT gold for: full heading text (keep headings white on dark, dark on light)
- ❌ NOT gold for: body text, descriptions, labels

---

## 5. Typography / Color / Spacing Design System

### 5.1 Typography

| Element | Font | Size | Weight | Line Height | Color |
|---------|------|------|--------|-------------|-------|
| Hero h1 | Montserrat | `clamp(3rem,6vw,5rem)` | 900 | 1.0 | White |
| Page hero h1 | Montserrat | `clamp(2rem,4vw,3rem)` | 800 | 1.15 | White |
| Section h2 | Montserrat | `clamp(2rem,4vw,2.5rem)` | 800 | 1.2 | Dark (#1a1a1a) |
| Section h2 (dark bg) | Montserrat | `clamp(2rem,4vw,2.5rem)` | 800 | 1.2 | White |
| Card h3 | Montserrat | 1.25rem | 700 | 1.3 | Dark |
| Body | DM Sans | 1.0625rem | 450 | 1.6 | #3a3a3a |
| Small text | DM Sans | 0.9rem | 450 | 1.5 | #6b6b6b |

### 5.2 Color Palette (Keep Existing CSS Variables)

- `--color-primary: #f9c500` — Gold accent
- `--color-primary-dark: #d4a800` — Gold hover
- `--color-emergency: #cc2936` — Red (24/7 hotline only)
- `--color-bg-dark: #0f0f0f` — Darkest
- `--color-bg-dark-alt: #1a1a1a` — Dark alt
- `--color-bg-light: #f0ede8` — Light section bg
- `--color-bg-white: #f5f2ed` — White/warm

### 5.3 Spacing System

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Page hero top | 5rem | 5rem | 3.5rem |
| Page hero bottom | 3rem | 3rem | 2rem |
| Light section | 5rem | 4rem | 3rem |
| Dark section | 4rem | 3rem | 2.5rem |
| Section gap bottom | 3rem | 2.5rem | 2rem |
| Container padding | 0 1.25rem | 0 1.25rem | 0 1rem |
| Card to card gap | 1.5rem | 1.5rem | 1rem |

**Rule:** Use CSS class system (`.section-light-spacing`, `.section-dark-spacing`) everywhere instead of hardcoded padding values.

### 5.4 Component Treatment Rules

| Component | Border | Hover effect | Shadow | Background |
|-----------|--------|-------------|--------|------------|
| Machine card (home) | `1px solid #d8d4cf` | translateY(-4px) + gold top bar | `--shadow-sm` → `--shadow-lg` | `--color-bg-white` |
| Service card (home) | `1px solid #d8d4cf` | translateY(-4px) + gold shadow | `--shadow-sm` → `--shadow-lg` | `--color-bg-light` |
| Why point | `1px solid #d8d4cf` | border to gold | `--shadow-sm` → gold glow | `--color-bg-white` |
| Machine card (page) | gold-tinted | translateY(-2px) | gold-tinged | gradient white |
| Download card | gold-tinted | translateY(-2px) | `--shadow-sm` → `--shadow-md` | gold gradient |
| Contact form | `1px solid #d8d4cf` | — | `--shadow-sm` | `--color-bg-light` |
| Service card (page) | `gold 4px left` | translateY(-4px) | gold shadow | `--color-bg-light` |

**Goal:** Make the homepage cards feel more premium and consistent with the gold-tinted inner pages. Add subtle gold accents to homepage cards without making them jarring.

---

## 6. Files/Components Affected

### CSS — `src/App.css`

1. **Consolidate page hero CSS** — Replace `.about-hero`, `.machines-hero`, `.services-hero`, `.contact-hero`, `.downloads-hero`, `.machine-detail-hero` with a single `.page-hero` class + variations
2. **Add `.contact-page`** to the visual polish section (radial gradient bg + gold tint)
3. **Add `machine-detail-page`** styling to visual polish
4. **Fix mobile hero sizing** — Better responsive layout for iPhone
5. **Add gold-tinted styling** to homepage cards (.machine-card on homepage, .service-card .why-point)
6. **Simplify mobile CTA bar** — slim single-button version
7. **Fix `.about-hero-subtitle`** — remove gold color, make consistent
8. **Consolidate section spacing** — Use the CSS classes instead of hardcoded paddings
9. **Mobile trust bar** — Improve for very small screens

### Components

| File | Changes |
|------|---------|
| `Hero.jsx` | Mobile responsive adjustments, CTA simplification, hero image overlay |
| `Header.jsx` | Minor — no functional change needed |
| `MobileCtaBar.jsx` | **Simplify** — single slim phone CTA or remove component |
| `Machines.jsx` (homepage) | Add gold-tinted card styling, inline image → use class |
| `Services.jsx` (homepage) | Gold accent improvements |
| `WhyHydromotor.jsx` | Add gold accent to why-point icons |

### Pages

| File | Changes |
|------|---------|
| `About.jsx` | Use unified `.page-hero` class, remove gold subtitle |
| `Machines.jsx` (page) | Use unified `.page-hero` class |
| `Services.jsx` (page) | Use unified `.page-hero` class |
| `Contact.jsx` | Use unified `.page-hero` class |
| `Downloads.jsx` | Use unified `.page-hero` class |
| `MachineDetail.jsx` | Use unified `.page-hero` class |
| `Home.jsx` | No changes |

---

## 7. Implementation Order

### Phase 1 — CSS Foundation (App.css)
1. Create unified `.page-hero` class
2. Fix mobile hero sizing (iPhone-safe)
3. Consolidate section spacing (use classes everywhere)
4. Add `.contact-page` and machine detail to visual polish
5. Add gold-tinted styling for homepage cards

### Phase 2 — CTA Cleanup
6. Simplify/remove `MobileCtaBar.jsx`
7. Fix hero CTA stacking on mobile
8. Standardize CTA button text/links

### Phase 3 — Page Consistency
9. Update all page components to use `.page-hero`
10. Fix About page gold subtitle
11. Standardize all page heroes

### Phase 4 — Polish
12. Add gold accent icons to WhyHydromotor
13. Improve homepage card borders/accents
14. Fix trust bar on small mobile
15. Overall review pass

---

## 8. Testing Checklist

- [ ] **Build passes** — `npm run build` with no errors
- [ ] **Desktop layout** — No regressions at ≥1024px
- [ ] **Tablet layout** — 768-1023px: hero, pages, grid
- [ ] **iPhone SE** — 375×667: hero text fully readable, no clipping
- [ ] **iPhone 14** — 390×844: hero text fully readable, no clipping
- [ ] **iPhone 14 Max** — 430×932: looks intentional
- [ ] **Android small** — 360×760: hero text readable
- [ ] **Mobile landscape** — Good, not broken
- [ ] **All page headers** — Same design treatment
- [ ] **CTA count per viewport** — ≤2 competing CTAs on mobile
- [ ] **Mobile menu** — Opens/closes, phone CTA visible
- [ ] **Mobile CTA bar** — Positioned correctly with safe-area
- [ ] **Scroll behavior** — Back to top works, no overlaps
- [ ] **Color contrast** — White text on dark backgrounds readable
- [ ] **Touch targets** — All buttons ≥44px
- [ ] **Font loading** — Montserrat + DM Sans load correctly
- [ ] **Image behavior** — Hero background crops properly on mobile
- [ ] **Gold color usage** — Consistent, not overused
- [ ] **Hover states** — Work on desktop, no sticky hover on mobile

---

*Plan prepared by subagent. Next: implement phases 1-4 as separate execution steps.*
