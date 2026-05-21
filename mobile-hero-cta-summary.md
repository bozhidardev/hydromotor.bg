# Mobile Hero / CTA / Trust Bar Cleanup — Summary

**Date:** 2026-05-21  
**File changed:** `src/App.css` only  
**Build:** ✅ Passes with 0 errors

## Changes Made

### 1. CTA Button Overflow Fix
- **`@media (min-width: 360px)`** — `.hero-actions .btn`:
  - `padding: 0.9rem 1.5rem` → `padding: 0.7rem 1rem`
  - `font-size: 0.82rem` → `font-size: 0.75rem`
- **Result:** "ПОИСКАЙ ОФЕРТА" now fits on 360px screens without overflow (~105px text fits within 117px available)

### 2. Trust Bar — Grid → Horizontal Scroll
- **`.hero-trust-bar` base:** Removed `display: grid` + `grid-template-columns: repeat(5, 1fr)`. Replaced with `display: flex; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;`
- **`.hero-trust-item` base:** Added `flex: 0 0 auto; white-space: nowrap;` to prevent shrinking/wrapping
- **`.hero-trust-bar::-webkit-scrollbar`:** Added `{ display: none; }`
- **Fade edge:** Moved golden bottom stripe from `::after` → `::before`. Added right-side fade edge on `::after` (48px gradient, matches `.trust-bar` pattern, hidden on desktop)

### 3. Mobile Media Queries Cleanup
- **Removed `grid-template-columns` overrides** in 767px and 480px media queries
- **Removed all `:nth-child` display:none rules** — no items silently disappear anymore
- **Removed entire `@media (max-width: 1024px)` block** (only contained grid override)

### 4. Vertical Spacing Tightening
- **`@media (max-width: 767px)`:**
  - `.hero-badge { margin-bottom: 0.85rem; }` (was 1.25rem inherited)
  - Explicit `.hero h1` and `.hero-subtitle` margin-bottom
- **`@media (max-width: 480px)`:**
  - `.hero-badge { margin-bottom: 0.75rem; }`
  - `.hero h1 { margin-bottom: 0.4rem; }` (was 0.5rem)
  - `.hero-subtitle { margin-bottom: 0.35rem; }` (was 0.5rem)

### 5. Desktop Trust Bar
- **Added `@media (min-width: 768px)`** block:
  - `.hero-trust-bar`: `overflow-x: visible; justify-content: space-around;`
  - `.hero-trust-item`: `flex: 1; justify-content: center;` (spreads evenly)
  - `.hero-trust-bar::after { display: none; }` (no fade edge on desktop)
