# Coder-worker Summary: Scroll-to-Top Fix

## Status: ✅ PASS

## Change Applied
- **File:** `src/components/ScrollToTop.jsx`
- **Before:** `window.scrollTo(0, 0);`
- **After:** `window.scrollTo({ top: 0, left: 0, behavior: 'auto' });`

## Verification
- ✅ `git diff` confirms the change (1 line modified)
- ✅ `npm run build` passed with **0 errors** (60 modules, 825ms)

## Notes
The fix was already applied in the working tree (committed/ready). No further changes needed.
