# Phase 3: Contact Form — Implementation Plan

**Date:** 2026-05-21
**Project:** hydromotor.bg
**Status:** Plan ready (no code edits — plan only)

---

## Recommendation

**Formspree** — works on GitHub Pages, no API keys in frontend, 50 submissions/month free.
**Alternative:** Web3Forms (250/mo) if higher limits are needed — identical setup.

Since both require the user to sign up and get an endpoint:
- Implement the form with a placeholder endpoint URL
- Document exactly what the user needs to do
- The form shows a clear "needs configuration" state if no endpoint is set

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/ContactForm.jsx` | Modify — all form logic changes |
| `.env.example` | Create — template for environment variable |

## Files NOT to Modify

| File | Reason |
|------|--------|
| `src/components/ContactMap.jsx` | Renders `<ContactForm prefix="contact">` — no changes needed |
| `src/pages/Contact.jsx` | Renders `<ContactForm prefix="page">` — no changes needed |
| Any other files | Form is fully self-contained in ContactForm.jsx |

---

## Changes to `src/components/ContactForm.jsx`

### 1. Endpoint configuration constant

Add at the top of the component (outside the function, or inside):

```js
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
```

- If `VITE_FORM_ENDPOINT` is empty, the form shows: *"Формата изисква конфигурация. Моля, свържете се с нас на 0878 553 273."*
- The user needs to set `VITE_FORM_ENDPOINT` in their `.env` file to activate the form
- This way the form works without exposing any key in the code

### 2. State management

Add two new state variables:

```js
const [sending, setSending] = useState(false);
const [errors, setErrors] = useState({});
```

- `sending` — loading state during form submission
- `errors` — per-field validation error messages

### 3. Form validation

Add a `validate()` function that checks:
- **Name** (`name-{prefix}`): required, min 2 characters
- **Contact** (`contact-{prefix}`): required (phone or email)
- **Message** (`message-{prefix}`): required, min 10 characters

Returns an object with field-specific error messages. If no errors, returns empty object.

### 4. `handleSubmit` replacement

Replace the current stub with:

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});

  // Check endpoint is configured
  if (!FORM_ENDPOINT) {
    setFormMessage('Формата изисква конфигурация. Моля, свържете се с нас на 0878 553 273.');
    return;
  }

  // Build form data
  const formData = new FormData(e.target);
  
  setSending(true);
  setFormMessage(null);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });
    
    if (response.ok) {
      setFormMessage({ type: 'success', text: 'Благодарим Ви! Съобщението беше изпратено успешно.' });
      e.target.reset();
    } else {
      setFormMessage({ type: 'error', text: 'Възникна грешка. Моля, опитайте отново или се обадете на 0878 553 273.' });
    }
  } catch {
    setFormMessage({ type: 'error', text: 'Възникна грешка. Моля, опитайте отново или се обадете на 0878 553 273.' });
  } finally {
    setSending(false);
  }
};
```

### 5. Honeypot field (spam protection)

Add before the submit button:

```jsx
<input type="text" name="_gotcha" style={{ display: 'none' }} />
```

This is the standard Formspree honeypot. Bots fill it in, humans don't see it.

### 6. Validation error display

Below each input field, add inline validation:

```jsx
{errors[`name-${prefix}`] && (
  <span className="form-error">{errors[`name-${prefix}`]}</span>
)}
```

Define CSS class `form-error` with red color, small font size (`0.85rem`), top margin.

### 7. Loading state on submit button

When `sending` is true, replace button icon/text with a spinner or "Изпращане...":

```jsx
<button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={sending}>
  {sending ? (
    <>⏳ Изпращане...</>
  ) : (
    <><IconMail size={18} /> Изпрати съобщение</>
  )}
</button>
```

### 8. Form message display — success/error styling

Replace the current `form-notice` div with conditional styling:

```jsx
{formMessage && (
  <div className={`form-message form-message--${formMessage.type}`}>
    {formMessage.text}
  </div>
)}
```

Add CSS classes:
- `.form-message--success` — green background/text (Благодарим Ви...)
- `.form-message--error` — red background/text (Възникна грешка...)

### 9. Remove temporary disclaimer; replace with permanent contact info

**Remove:**

```jsx
<div className="contact-form-disclaimer">
  ⚠️ Формата за момента не е активна. Моля, обадете се на ...
</div>
```

**Replace with** (always visible, not as a warning):

```jsx
<div className="contact-form-alt">
  Или ни се обадете на <a href="tel:+359878553273">0878 553 273</a> или пишете на <a href="mailto:office@hydromotor.bg">office@hydromotor.bg</a>
</div>
```

This keeps alternative contact methods visible without the "form is broken" tone.

### 10. Add `name` and `ref` attributes to form elements

Formspree (and Web3Forms) need the form fields to have `name` attributes matching the field names. Currently the elements use `id` but not `name`. Add:

- `<input name={`name-${prefix}`} ...>`
- `<input name={`contact-${prefix}`} ...>`
- `<textarea name={`message-${prefix}`} ...>`

These are needed for `new FormData(e.target)` to pick them up.

---

## Create `.env.example`

```env
# Formspree endpoint — sign up at https://formspree.io and create a form
# Then paste your form ID here (e.g., https://formspree.io/f/xyzabcde)
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID_HERE
```

---

## User Setup Steps (after code changes)

1. Go to [formspree.io](https://formspree.io) and sign up
2. Create a new form → get endpoint URL (`https://formspree.io/f/xxxxx`)
3. In form settings, set email forwarding → `office@hydromotor.bg`
4. Copy `.env.example` to `.env` and paste the endpoint:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxx
   ```
5. If deploying to GitHub Pages, set the variable in the build/deploy env
6. Test — submit the form, check `office@hydromotor.bg` for the email

---

## Form UX States Summary

| State | What the user sees |
|-------|-------------------|
| **No endpoint (unconfigured)** | "Формата изисква конфигурация..." message, form fields still visible |
| **Idle** | Empty form, submit button enabled |
| **Validation errors** | Red inline text below invalid fields |
| **Sending** | Button shows "⏳ Изпращане..." + disabled |
| **Success** | Green message "Благодарим Ви! Съобщението беше изпратено успешно." + form resets |
| **Error** | Red message "Възникна грешка. Моля, опитайте отново..." |

---

## Estimated Effort

- Code changes: ~45 minutes
- Testing: ~15 minutes
- Total: ~1 hour

---

## Rollback

All changes are isolated to `ContactForm.jsx` and `.env.example`. To revert:
- Restore `ContactForm.jsx` from git
- Delete `.env.example`
