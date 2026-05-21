# Mobile Hero / CTA / Trust Bar Cleanup — Plan

## 1. Fix CTA Button Overflow on Mobile

### Root Cause

On 360px screens:
- `hero-inner` has `padding: 0 1.5rem` → 48px horizontal = **312px** available
- `.hero-actions` gap at mobile = `0.85rem` ≈ 13.6px
- Two buttons at `flex: 1; max-width: 220px` → each gets **~149px** (at 360px, max-width doesn't kick in)
- Each button has `padding: 0.9rem 1.5rem` = **48px** horizontal padding
- Text area per button = **~101px**
- "ПОИСКАЙ ОФЕРТА" at `font-size: 0.82rem` + `letter-spacing: 0.04em` + uppercase needs **~130px** → **overflows by ~29px**

### Solution

**Reduce button padding on mobile only** — primary fix, simplest, keeps buttons side-by-side which is visually stronger.

Target the existing `@media (min-width: 360px)` block in App.css (around line 873) and add a complementary block:

```css
/* Inside existing @media (min-width: 360px) — tighten padding */
.hero-actions .btn {
  padding: 0.7rem 1rem;       /* was: 0.9rem 1.5rem */
  font-size: 0.75rem;         /* was: 0.82rem — smaller allows full text */
}
```

**Check:**
- `padding: 0.7rem 1rem` = 32px total → leaves **117px** for text at 360px
- "ПОИСКАЙ ОФЕРТА" at reduced `font-size: 0.75rem` ≈ needs **~100-105px** → fits with ~12px margin
- "24/7 СЕРВИЗ" is shorter → fits comfortably
- Touch target: `0.7rem × 2 + 0.9rem × 2` = `~22.4px + ~28.8px` ≈ **51px height** ✅ above 44px min

**Secondary safeguard** — prevent edge-case overflow at <340px screens:
```css
@media (max-width: 359px) {
  .hero-actions {
    flex-direction: column;    /* was already max-width: 100% */
  }
}
```
This already exists; just leave as-is.

### Files affected
- `src/App.css` — `.hero-actions .btn` padding reduction inside `@media (min-width: 360px)`

---

## 2. Simplify CTA Hierarchy

### Current state
3 CTA touchpoints visible simultaneously after scroll:
| Element | Type | When visible |
|---|---|---|
| Hero CTAs (2) | `.hero-actions` | always above fold |
| Mobile sticky bar | `.mobile-cta-bar` | after hero scrolled past |
| Back-to-top | `.back-to-top` | after 400px scroll |

### Recommendation: **Option A — keep as-is, just fix overflow**

**Rationale:**
- Hero CTAs serve different purposes: "Поискай оферта" (lead gen) vs "24/7 СЕРВИЗ" (emergency phone)
- The sticky bar is slim (44px height) and only appears when hero is out of view → it's a navigation aid, not an aggressive CTA
- Back-to-top is utility, not CTA — different visual weight and position
- Three elements at different scroll states is common pattern; isn't overwhelming
- Removing/reducing the sticky bar would lose the always-accessible 24/7 touchpoint

**No changes needed** for CTA hierarchy. Just fix the overflow (step 1).

---

## 3. Trust Bar — Convert Disappearing Grid to Horizontal Scroll

### Current behavior (broken)

| Viewport | Grid cols | Items visible via grid | Items hidden (display:none) |
|---|---|---|---|
| ≥1025px | 5 | 5 | 0 |
| 768–1024px | 3 | 3 | 2 (items 4, 5) |
| 481–767px | 3 | 3 | 2 (items 4, 5) |
| ≤480px | 2 | 2 | 3 (items 3, 4, 5) |

Items silently vanish — poor UX and feels broken on scroll.

### Solution

Replace CSS grid with a horizontal scroll container at all sizes, keeping the 5-column grid on desktop as the default but using overflow-x: auto / scroll on mobile. Mirror the `.trust-bar` / `.trust-bar-track` pattern already used by the standalone TrustBar component elsewhere.

#### Implementation

**App.css — replace hero trust bar grid:**

1. **Remove** the grid-based layout from `.hero-trust-bar`:
   - Remove `grid-template-columns: repeat(5, 1fr)` from the base rule
   - Remove all `grid-template-columns` overrides in media queries
   - Remove `:nth-child(4)`, `:nth-child(5)` display:none rules

2. **Change to flexbox scroll:**

```css
.hero-trust-bar {
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;           /* Firefox */
  -ms-overflow-style: none;        /* IE/Edge */
  gap: 0;
  -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
  padding: 1.25rem 1.5rem;
  background: rgba(12, 12, 12, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
}

.hero-trust-bar::-webkit-scrollbar {
  display: none;
}
```

3. **Wrap content in a flex track** (or keep items as flex children — items already exist):

```css
/* Option A: Keep items as direct flex children */
.hero-trust-item {
  flex: 0 0 auto;                 /* don't shrink, don't grow */
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.5rem 1.25rem;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;            /* prevent text wrapping */
}

.hero-trust-item:last-child {
  border-right: none;
}
```

4. **Add fade edge** (same pattern as `.trust-bar::after`):

```css
.hero-trust-bar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, rgba(12, 12, 12, 0.95));
  pointer-events: none;
  z-index: 1;
}

@media (min-width: 768px) {
  .hero-trust-bar::after {
    display: none;
  }
  .hero-trust-bar {
    overflow-x: visible;          /* no scrolling on desktop */
    justify-content: space-between;
  }
  .hero-trust-item {
    flex: 1;                      /* spread evenly on desktop */
    justify-content: center;
  }
}
```

5. **Remove all `:nth-child` display:none rules** from the mobile media queries (both `@media (max-width: 767px)` and `@media (max-width: 480px)` sections).

6. **Tighten padding on mobile** (keep existing):

```css
@media (max-width: 767px) {
  .hero-trust-bar {
    padding: 1rem;                /* was already set — keep it */
  }
}

@media (max-width: 480px) {
  .hero-trust-bar {
    padding: 0.75rem;             /* was already set — keep it */
  }
}
```

### Files affected
- `src/App.css` — `.hero-trust-bar` layout, media query overrides, fade edge, nth-child removals

---

## 4. Mobile Hero Spacing — Fine-Tune Vertical Rhythm

### Current values (mobile)

At `@media (max-width: 480px)`:
| Element | Margin-bottom | Notes |
|---|---|---|
| `.hero-badge` | `margin-bottom: 1.25rem` | (from base rule — _not_ overridden at 480px) |
| `h1` | `margin-bottom: 0.5rem` | (overridden at 480px — was 0.75rem) |
| `.hero-subtitle` | `margin-bottom: 0.5rem` | (overridden at 480px — was 0.75rem) |
| `.hero-body` | `margin-bottom: 1.25rem` | (overridden at 480px — was 2.25rem) |
| `.hero-actions` gap | `gap: 0.6rem` | (overridden at 480px) |

**Issue**: vertical rhythm feels slightly uneven because:
- Hero badge → h1 gap is large (1.25rem) while all other gaps are tighter
- No clear visual hierarchy of spacing — badge should be closer to h1

### Proposed adjustments

```css
@media (max-width: 480px) {
  .hero-badge {
    margin-bottom: 0.75rem;      /* was: 1.25rem (inherited from base) — tighten to match rhythm */
  }

  .hero h1 {
    margin-bottom: 0.4rem;       /* was: 0.5rem — slightly tighter */
  }

  .hero-subtitle {
    margin-bottom: 0.35rem;      /* was: 0.5rem — tighter to h1 */
  }

  .hero-body {
    margin-bottom: 1.25rem;      /* keep as-is — this is the final separator before CTAs */
    font-size: 0.9rem;           /* keep as-is */
  }

  .hero-actions {
    gap: 0.6rem;                 /* keep as-is */
  }
}
```

And at `@media (max-width: 767px)` (tablet), same adjustments for consistency:

```css
@media (max-width: 767px) {
  .hero-badge {
    margin-bottom: 0.85rem;      /* was: 1.25rem */
  }

  .hero h1 {
    margin-bottom: 0.5rem;       /* explicit at tablet too */
  }

  .hero-subtitle {
    margin-bottom: 0.5rem;       /* explicit at tablet too */
  }
}
```

**Spacing map after fix (480px):**
```
Badge ──0.75rem──
H1     ──0.4rem──
Subtitle ──0.35rem──
Body   ──1.25rem──
CTAs   ──(gap 0.6rem)──
```

The badge→h1 gap is now visually consistent with h1→subtitle gap (both small, intentional). The body→CTAs gap is larger (1.25rem) as the breathing room before action.

### Files affected
- `src/App.css` — add `margin-bottom` overrides for `.hero-badge`, `h1`, `.hero-subtitle` in mobile media queries

---

## 5. Safe Area Verification

### Findings

| Component | `env(safe-area-inset-bottom)` status |
|---|---|
| `MobileCtaBar` (`.mobile-cta-bar`) | ✅ **Done** — `padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px))` |
| `BackToTop` (`.back-to-top`) | ✅ **Done** on mobile — `bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px))` |
| Header (`.header`) | ✅ **Done** — `padding-top: var(--safe-top)` |

No changes needed.

---

## Summary of Changes

### `src/App.css`

| Area | What to do |
|---|---|
| `.hero-actions .btn` in `@media (min-width: 360px)` | Reduce padding to `0.7rem 1rem`, font-size to `0.75rem` |
| `.hero-trust-bar` base rule | Replace grid with flexbox + overflow-x: auto |
| `.hero-trust-item` base rule | Add `flex: 0 0 auto; white-space: nowrap` |
| `.hero-trust-bar::after` (new) | Add fade edge (hidden on desktop) |
| `@media (max-width: 767px)` in hero section | Remove `grid-template-columns: repeat(3, 1fr)` on `.hero-trust-bar`, remove `:nth-child(4),(5)` display:none |
| `@media (max-width: 480px)` in hero section | Remove `grid-template-columns: repeat(2, 1fr)` on `.hero-trust-bar`, remove `:nth-child(3)` display:none |
| `@media (max-width: 480px)` hero spacing | Tighten `.hero-badge` margin-bottom to `0.75rem`, `h1` to `0.4rem`, `.hero-subtitle` to `0.35rem` |
| `@media (max-width: 767px)` hero spacing | Tighten `.hero-badge` margin-bottom to `0.85rem`, explicit margins for `h1` and `.hero-subtitle` |

### No changes

| File | Reason |
|---|---|
| `src/components/Hero.jsx` | Structure fine; layout is CSS-driven |
| `src/components/MobileCtaBar.jsx` | Works fine; safe area already handled |
| `src/components/BackToTop.jsx` | Works fine; safe area already handled |
| `src/components/Header.jsx` | No changes needed |
| `src/data/assets.js` | No changes needed |
| Mobile menu phone CTA | Already removed in previous fix |
| Desktop layout | Unchanged (all changes scoped to `@media (max-width: …)`) |

### Build verification

Run `npm run build` after changes. All changes are CSS-only (no JSX/imports changed), so no build errors expected.
