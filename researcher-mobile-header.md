# Mobile Header Overlap Investigation

**Date:** 2026-05-21  
**Investigator:** Subagent

---

## 1. The Problem

On mobile screens (≤ 767px wide), inner pages like About, Services, Machines, Contact, and Downloads have their page title (`h1`) and subtitle partially or fully hidden behind the fixed navigation header.

## 2. Root Cause

The **`.page-hero`** CSS rule at the mobile breakpoint does not account for the fixed header height.

### The culprit — `src/App.css` (lines 2038-2040):

```css
@media (max-width: 767px) {
  .page-hero {
    padding: 3.5rem 0 2rem;
  }
}
```

- `3.5rem` = **56px** on a default 16px base font
- The fixed header is **70px tall** (`.header-inner { height: 70px }`)
- So the page title starts **14px behind the header**
- On devices with a notch (safe-area), it's even worse — the header itself grows taller (via `--safe-top`)

### How the homepage avoids this

In the same file, the homepage's **`.hero`** at the same breakpoint (line 2547):

```css
@media (max-width: 767px) {
  .hero {
    padding-top: calc(70px + var(--safe-top));
  }
}
```

This pushes the hero content exactly below the fixed header (70px) plus any iPhone notch / safe-area inset.

## 3. All Affected Pages

All inner pages use the `.page-hero` class:

| Page             | File                                    | Uses `.page-hero` |
|------------------|-----------------------------------------|------------------|
| About            | `src/pages/About.jsx:9`                | ✅               |
| Services         | `src/pages/Services.jsx:10`            | ✅               |
| Machines         | `src/pages/Machines.jsx:14`            | ✅               |
| Machine Detail   | `src/pages/MachineDetail.jsx:27`       | ✅               |
| Contact          | `src/pages/Contact.jsx:11`             | ✅               |
| Downloads        | `src/pages/Downloads.jsx:24`           | ✅               |

One fix in CSS covers them all.

## 4. `--safe-top` Status

- **Defined** at `:root` level (line 28): `--safe-top: env(safe-area-inset-top, 0px)`
- **Used consistently** in the header (line 220), mobile menu (line 364), menu close button (line 404), and homepage hero (line 2547)
- **Working correctly** — the variable exists and is available for `.page-hero` to use

## 5. The Fix

**File:** `src/App.css`  
**Location:** Lines 2038–2040

**Current code:**
```css
@media (max-width: 767px) {
  .page-hero {
    padding: 3.5rem 0 2rem;
  }
}
```

**Replace with:**
```css
@media (max-width: 767px) {
  .page-hero {
    padding: calc(70px + var(--safe-top)) 0 2rem;
  }
}
```

This mirrors the homepage's approach exactly:
- `70px` matches `.header-inner` height
- `var(--safe-top)` accounts for iPhone notch / Android status bar

## 6. Risks Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Too much whitespace above hero on short-content pages | Low | Low | The `.page-hero` already has decorative gradient background; extra space above looks intentional |
| `--safe-top` not supported in old browsers | Very Low (post-2018) | Low | Falls back to `0px`, still correct (just no notch compensation) |
| Desktop layout affected | None | — | The change is inside `@media (max-width: 767px)` — desktop is untouched |
| 404 page affected | None | — | 404 uses `.not-found` with `min-height: calc(100vh - 70px)`, not `.page-hero` |

## 7. Conclusion

**One CSS change** in `src/App.css` (line 2039) is all that's needed. Replace the `3.5rem` top-padding on `.page-hero` mobile with `calc(70px + var(--safe-top))` to match how the homepage's `.hero` handles it. No JSX changes, no other files.
