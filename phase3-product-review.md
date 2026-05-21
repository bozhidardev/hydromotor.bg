# Phase 3 — Contact Form: Product Review

**Reviewer:** Subagent (Product Reviewer)  
**Date:** 2026-05-21  
**Files examined:**
- `src/components/ContactForm.jsx`
- `src/pages/Contact.jsx`
- `src/components/ContactMap.jsx`
- `src/components/MobileCtaBar.jsx`
- `src/data/content.js`
- `src/App.css` (form-related styles)
- `.env` (VITE_FORM_ENDPOINT config)

---

## Verdict: PASS WITH NOTES

The contact form is clean, professional, and well-constructed. It handles both configured and unconfigured states gracefully. Below is a detailed breakdown.

---

### ✅ What works well

**1. Dual-state rendering**
The component checks `VITE_FORM_ENDPOINT` and renders two distinct modes:
- **Configured:** Full interactive form with validation, submit button, success/error feedback
- **Unconfigured:** Clean fallback with a warning message and prominent emergency phone button

Both states look intentional and professional — no broken UI.

**2. Professional form layout**
- Fields have `<label>` elements linked via `htmlFor`/`id` (good a11y)
- Descriptive placeholders guide the user
- CTA button has a mail icon + clear text: "Изпрати съобщение"
- Phone fallback `<a href="tel:…">` visible below the submit button in configured state

**3. Validation (Bulgarian, helpful messages)**
| Field | Rule | Error message |
|---|---|---|
| Име | min 2 chars | "Моля, въведете име (минимум 2 символа)." |
| Телефон/имейл | non-empty | "Моля, въведете телефон или имейл за връзка." |
| Съобщение | min 10 chars | "Моля, въведете съобщение (минимум 10 символа)." |

Errors appear inline per-field with `form-error` styling (red). Inputs get red border via `.input-error` class.

**4. Success/error UX**
- Success: green background (`form-message--success`) with ✅ checkmark
- Error: red background (`form-message--error`) with ❌ cross
- Error messages include the fallback phone number as a fallback suggestion

**5. Spam protection**
Honeypot field (`_gotcha`) is present, hidden with `display:none` and `tabIndex={-1}`.

**6. Phone fallback is prominent**
- In sidebar contact list (multiple phones + service 24/7 phones)
- Below the form: "Или се обадете: 0878 553 273 (24/7)"
- In unconfigured fallback: an `.btn-emergency` styled button with phone icon
- In MobileCtaBar: sticky CTA with phone number
- Footer: phone numbers present

**7. CSS quality**
Form styles are well-structured, use CSS custom properties, have proper focus states with box-shadow rings, and consistent border-radius/padding.

**8. All text is in Bulgarian**
Labels, placeholders, validation messages, success/error text — everything is in correct Bulgarian. No untranslated English strings.

---

### ⚠️ Notes / Issues to address

**1. ⚠️ CRITICAL: Placeholder endpoint in `.env`**
The `.env` file contains:
```
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID_HERE
```
This is a **truthy** string — so the component renders in "configured" mode and displays the full interactive form. But the endpoint is a placeholder, so **every submitted form will fail** (404 from Formspree). Users will see an error message instead of actually contacting you.

**Fix:** Either:
- Remove `VITE_FORM_ENDPOINT` from `.env` entirely (empty string → clean fallback with warning + phone), **or**
- Replace with a real Formspree endpoint, **or**
- Keep `.env.example` as the template and leave `.env` without the key for dev

**2. Minor: Formspree-specific fields**
The `_gotcha` (honeypot) and `_subject` fields are Formspree conventions. If a different form backend is used later (e.g., something like Formspree alternatives, custom API), those fields won't work. Consider abstracting or documenting the required payload format. Low priority.

**3. Minor: Loading state UX**
The button shows "Изпращане..." (sending) while the request is in flight, which is good — but the form doesn't disable inputs during submission. A fast double-click is prevented by the button being disabled, but field values could still be changed. Low priority — hardly an issue in practice.

**4. Info: Color variables usage**
The component uses raw hex colors in the phone fallback link (`color: 'var(--color-emergency)'`) — this is fine but double-check that `--color-emergency` is defined in the CSS variables. It appears in `.btn-emergency` and `.form-error` styling, so it likely is.

---

### Summary

| Criterion | Rating |
|---|---|
| First impression (no form-not-active warning unless intended) | ✅ Good |
| Form looks professional | ✅ Yes |
| Phone fallback visible | ✅ Yes (multiple places) |
| Success/error UX clear | ✅ Green/red, clear messages |
| Validation feedback | ✅ Per-field, Bulgarian |
| Messages in Bulgarian | ✅ All text |
| No broken/visual-only feeling | ✅ Polished |
| **Critical issues** | **1 (placeholder endpoint)** |

**PASS WITH NOTES** — The form component itself is excellent. The only blocker-level concern is the placeholder Formspree endpoint in `.env`, which makes the form appear functional while guaranteeing submission failure. This is a deployment/configuration issue rather than a code issue, but it's important to flag.
