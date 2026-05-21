# Phase 3 Plan Review — Contact Form Implementation

**Reviewer:** Jarvis 🧠  
**Date:** 2026-05-21  
**Plan reviewed:** `phase3-plan.md`  
**Supporting docs:** `research-contact-form.md`, `ContactForm.jsx` (current), `ContactMap.jsx`, `Contact.jsx`, `App.css`

---

## Verdict: APPROVED WITH REQUIRED AMENDMENTS ⚠️

The plan is well-researched, sound in architecture, and correctly scoped. Two concrete issues need fixing before or during implementation (see **Required Amendments** below).

---

## Review by Criterion

### 1. Security ✅

| Check | Status | Notes |
|-------|--------|-------|
| API keys/secrets in frontend? | ✅ CLEAN | Uses `VITE_FORM_ENDPOINT` env var; Formspree URLs are designed to be public |
| Honeypot field? | ✅ PRESENT | `_gotcha` field with `display: 'none'` — standard Formspree practice |
| Credentials committed? | ✅ CLEAN | `.env` not tracked, `.env.example` has placeholder; no secrets in code |
| Env var structure safe? | ✅ CLEAN | `VITE_FORM_ENDPOINT` is a Vite convention; only a URL, not a secret key |

### 2. Form UX States ✅ (with minor note)

| State | Present? | Notes |
|-------|----------|-------|
| Idle | ✅ | Empty form, submit button enabled |
| Validation errors | ✅ | Inline red text per field (described in plan) |
| Sending/loading | ✅ | Button shows "⏳ Изпращане..." + `disabled` |
| Success | ✅ | Green message, form resets |
| Error (fetch/server) | ✅ | Red message with phone fallback |
| No endpoint configured | ✅ | Shows message on submit attempt |

**⚠️ Minor note:** The plan's "no endpoint" state keeps form fields visible — they're submittable, which produces the error on first click. Acceptable but slightly confusing UX. Consider showing a non-intrusive warning banner on render when `FORM_ENDPOINT` is empty so the user knows before they attempt submit.

### 3. Fallback Contact Info ✅

| Check | Status | Notes |
|-------|--------|-------|
| Phone always visible? | ✅ | New permanent `contact-form-alt` block |
| No "broken form" tone? | ✅ | Old ⚠️ disclaimer removed; neutral alternative contact text |
| Both phone + email shown? | ✅ | `tel:+359878553273` and `mailto:office@hydromotor.bg` |

### 4. Files Changed ✅ (scope confirmed)

| File | Action | Status |
|------|--------|--------|
| `src/components/ContactForm.jsx` | Modify | ✅ Only file with logic changes |
| `.env.example` | Create | ⚠️ Doesn't exist yet (expected — plan stage) |
| `src/components/ContactMap.jsx` | **Not modified** | ✅ Confirmed unchanged by reading |
| `src/pages/Contact.jsx` | **Not modified** | ✅ Confirmed unchanged by reading |
| Any other files | **Not modified** | ✅ Scope is correct |

### 5. Error Handling ✅

| Scenario | Handled? | What happens |
|----------|----------|-------------|
| Network failure (fetch throws) | ✅ | `catch` block → red message "Възникна грешка..." + phone |
| Formspree returns error status | ✅ | `!response.ok` → same red message |
| `VITE_FORM_ENDPOINT` not set | ✅ | Early return before fetch → configuration message |
| Form validation fails | ✅ | Returns early with inline field errors, no API call |
| Double-submit during send | ✅ | Button `disabled={sending}` prevents this |

### 6. Configuration Documentation ✅ (with note)

| Check | Status | Notes |
|-------|--------|-------|
| `.env.example` template clear? | ✅ | Shows exact URL format with `YOUR_FORM_ID_HERE` placeholder |
| Setup steps documented? | ✅ | 6 clear steps from signup to test |
| Non-developer friendly? | ⚠️ | Mostly — could add a note about where `.env` goes relative to `package.json` (Vite project root) |

---

## ⚠️ Required Amendments

### Amendment 1: Fix `formMessage` type mismatch for no-endpoint state

**What's wrong:**  
The plan's `handleSubmit` has a type inconsistency:

- When `FORM_ENDPOINT` is empty → `setFormMessage('Формата изисква...')` (sets a **plain string**)
- When fetch succeeds/fails → `setFormMessage({ type: 'success'|'error', text: '...' })` (sets an **object**)

The render code expects an object with `.type` and `.text` properties:
```jsx
<div className={`form-message form-message--${formMessage.type}`}>
  {formMessage.text}
</div>
```

With a plain string, this produces `<div class="form-message form-message--undefined">` — broken styling and wrong semantics.

**Fix:** Change the no-endpoint case to use the same object structure:

```js
setFormMessage({ type: 'warning', text: 'Формата изисква конфигурация. Моля, свържете се с нас на 0878 553 273.' });
```

This also means adding a `.form-message--warning` CSS class (see Amendment 2).

### Amendment 2: Add CSS for new message/success/error classes

**What's missing:**  
The plan introduces these new CSS classes but doesn't specify where they go:

1. `.form-error` — for inline validation errors below fields
2. `.form-message--success` — green success banner
3. `.form-message--error` — red error banner
4. `.form-message--warning` — amber/yellow for the no-endpoint state (if Amendment 1 is adopted)
5. `.contact-form-alt` — for the permanent phone/email fallback block

These need to be added to `src/App.css` (where existing `.form-notice` and `.contact-form-disclaimer` live). The plan should explicitly mention this, or the implementer must add them.

**Suggested CSS (for reference):**
```css
.form-message {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  line-height: 1.5;
  font-weight: 500;
}

.form-message--success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message--error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-message--warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.form-error {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.contact-form-alt {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-align: center;
  padding: 0.5rem;
}
```

---

## Optional Improvements (not blockers)

1. **`name` attribute placement:** The plan mentions adding `name` attributes to inputs — ensure these match the `validate()` keys exactly (e.g., `name={`name-${prefix}`}` checks against `errors[`name-${prefix}`]`).

2. **Web3Forms alternative note:** The `.env.example` only references Formspree. If the user picks Web3Forms, the endpoint format differs (`https://api.web3forms.com/submit` plus an `access_key` hidden input). Consider noting the alternative in the `.env.example` comments.

3. **Form accessibility:** The `disabled` button during sending should ideally have `aria-busy="true"` on the form for screen readers. Minor, but good practice.

4. **No-enpoint render-time warning:** Consider also showing a persistent (non-intrusive) message on render when `FORM_ENDPOINT` is empty, rather than only on submit attempt. This is a UX polish item.

---

## Summary

| Aspect | Rating |
|--------|--------|
| Architecture | ✅ Sound |
| Security | ✅ Strong |
| UX States | ✅ Comprehensive |
| Error Handling | ✅ Robust (with minor fix needed) |
| Scope | ✅ Well-contained |
| Documentation | ✅ Clear (amendments minor) |
| **Overall** | **APPROVED WITH REQUIRED AMENDMENTS** ⚠️ |

Fix the two required amendments during implementation (or update the plan to address them), and this is ready to build. Good work — the research phase clearly paid off.
