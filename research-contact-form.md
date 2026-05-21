# Contact Form Email Sending — Research & Recommendations

**Project:** hydromotor.bg  
**Task:** Make the contact form actually send emails  
**Current state:** Form shows a "temporarily inactive" message — no email sending implemented  
**Target address:** `office@hydromotor.bg` (from `src/data/content.js`, `CONTACT.emails[1]`)  
**Form fields:** име, телефон/имейл, съобщение  
**Stack:** React/Vite SPA → GitHub Pages (currently) → unknown future host  
**Language:** Bulgarian (BG)

---

## Current Form Implementation

**File:** `src/components/ContactForm.jsx`

- Uses `prefix` prop for unique IDs (supports two instances: homepage + contact page)
- Fields: `name-{prefix}`, `contact-{prefix}` (phone or email), `message-{prefix}`
- Has a disclaimer about the form being inactive
- Currently `handleSubmit` just sets a notice message telling the user to call
- Uses `IconMail` component styled as a button with "Изпрати съобщение" text

**Form instances:**
1. `ContactMap.jsx` — renders `<ContactForm prefix="contact" />` on the homepage
2. `Contact.jsx` — renders `<ContactForm prefix="page" />` on the /contacts page

---

## Option 1: Formspree

**How it works:**  
Set the form's `action` attribute to a Formspree endpoint URL (e.g., `https://formspree.io/f/xyzabcde`). Form submissions POST to Formspree, which forwards them to your configured email address. No client-side JS needed beyond standard HTML form submission.

**Setup steps:**
1. Sign up at formspree.io
2. Create a new form, get the endpoint URL
3. Set up email forwarding to `office@hydromotor.bg`
4. Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the `<form>` element
5. Add hidden `<input type="text" name="_gotcha" style="display:none">` for spam honeypot
6. Use `useEffect` or `fetch` to handle the response (success/error) instead of default redirect

**What gets exposed in frontend code:**  
Only the Formspree endpoint URL — no API keys, no secrets. The URL is a public form ID and is designed to be exposed.

**Free tier limits:**  
- 50 submissions/month
- 1 form
- Branded redirect page on free tier (can be bypassed with AJAX submission)

**Spam protection:**  
- Built-in honeypot (`_gotcha` field)
- reCAPTCHA on paid plans
- Manual spam filtering in dashboard

**Pros:**
- ✅ No backend server needed
- ✅ No API keys in code
- ✅ Works on any static host (GitHub Pages, Netlify, etc.)
- ✅ Dead simple — just an action attribute
- ✅ Bulgarian-friendly (interface is in English but emails arrive as-is)
- ✅ You can set custom redirect URL or handle with JS

**Cons:**
- ❌ 50/month free limit — a few daily submissions could hit this
- ❌ Third-party dependency (if Formspree goes down, form breaks)
- ❌ Branded redirect on free tier if using default submission
- ❌ No attachments on free tier

**Best for:**  
✅ **Strong candidate.** Simple, works with any host, no secrets exposed. The 50/mo limit is the main constraint — fine for a small business with modest traffic, but could be tight during campaigns.

---

## Option 2: Netlify Forms

**How it works:**  
Netlify automatically intercepts form POST submissions on Netlify-hosted sites. You add `netlify` attribute to the `<form>` tag, Netlify detects and handles it server-side, forwarding to your email.

**Setup steps:**
1. Host the site on Netlify (not currently the case — currently GitHub Pages)
2. Add `data-netlify="true"` to the `<form>` element
3. Add hidden `<input type="hidden" name="form-name" value="contact" />`
4. Configure email notification in Netlify dashboard → Forms → Notifications
5. Redeploy

**What gets exposed in frontend code:**  
Nothing sensitive — just standard HTML form attributes. No API keys.

**Free tier limits:**  
- 100 submissions/month
- 1 site (on Hobby plan)

**Spam protection:**  
- Built-in honeypot field
- Optional reCAPTCHA integration
- Spam filter in Netlify dashboard

**Pros:**
- ✅ Zero backend code
- ✅ Native Netlify integration — just HTML attributes
- ✅ No API keys in frontend
- ✅ Built-in notifications and spam filtering
- ✅ Works well with React SPA when form has the netlify attribute

**Cons:**
- ❌ **Only works on Netlify** — currently on GitHub Pages, so this would require switching hosts
- ❌ Requires `netlify.toml` or dashboard configuration for SPA rewrites
- ❌ Migrating from GitHub Pages to Netlify is straightforward but still a migration
- ❌ React SPA forms need special handling (Netlify doesn't process JS-rendered forms via POST by default — needs `data-netlify="true"` on the form and sometimes robots.txt tweaks)

**Best for:**  
❌ Not ideal right now (requires host migration first). Keep in mind as a **fallback option** if/when moving to Netlify.

---

## Option 3: EmailJS

**How it works:**  
Client-side JavaScript sends a POST request to the EmailJS API from the browser. You configure an email template in the EmailJS dashboard that maps form fields to email content. The API call includes a "public key" (designed to be exposed).

**Setup steps:**
1. Sign up at emailjs.com
2. Connect an email service (Gmail, Outlook, or custom SMTP like the `office@hydromotor.bg` mailbox)
3. Create an email template with variables: `{{name}}`, `{{contact}}`, `{{message}}`
4. Install `@emailjs/browser` npm package
5. In `handleSubmit`, call `emailjs.sendForm('service_id', 'template_id', formRef, 'public_key')`
6. Handle success/error states

**What gets exposed in frontend code:**  
- Service ID (public, designed for frontend)
- Template ID (public)
- **Public Key** — intentionally designed for client-side use, but still an API key that could be abused by scraping it from the source

**Free tier limits:**  
- 200 emails/month
- 2 email templates
- 1 service connection

**Spam protection:**  
- Built-in rate limiting (200/mo)
- CAPTCHA integration (paid feature)
- Spam filter per template

**Pros:**
- ✅ Works on any host (including GitHub Pages)
- ✅ NPM package makes integration clean with React
- ✅ 200/month free — generous enough
- ✅ Can use any SMTP service (including the office email's SMTP)
- ✅ Templates are customizable
- ✅ Bulgarian-friendly (you control template content)

**Cons:**
- ❌ **Public key IS exposed** — though "intentionally," it means anyone could send 200 emails/month abusing your account
- ❌ Third-party dependency
- ❌ More complex setup than Formspree (SDK, templates, etc.)
- ❌ React integration requires managing form refs and async state
- ❌ If the public key gets abused, your monthly quota drains

**Best for:**  
✅ Good option if you want to stay on GitHub Pages and need more than 50 submissions/month. The public key exposure is a calculated risk.

---

## Option 4: Resend + Vercel Serverless Function

**How it works:**  
Deploy a serverless function on Vercel that accepts form submissions and sends emails via the Resend API. The function has environment variables for the Resend API key. The frontend POSTs to the serverless function URL.

**Setup steps:**
1. Sign up at resend.com and vercel.com
2. Create a Vercel project with the hydromotor site
3. Add a `api/contact.js` (or `/api/contact.ts`) serverless function:
   ```js
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   export default async function handler(req, res) {
     const { name, contact, message } = req.body;
     await resend.emails.send({
       from: 'Hydromotor Contact <contact@hydromotor.bg>',
       to: 'office@hydromotor.bg',
       subject: `Ново запитване от ${name}`,
       html: `<p><strong>Име:</strong> ${name}</p>
              <p><strong>Телефон/Имейл:</strong> ${contact}</p>
              <p><strong>Съобщение:</strong></p><p>${message}</p>`
     });
     res.status(200).json({ success: true });
   }
   ```
4. Set `RESEND_API_KEY` as a Vercel environment variable
5. In the React form, POST to `VERCEL_URL/api/contact`
6. Handle success/error in the React component

**What gets exposed in frontend code:**  
Only the Vercel function URL — no API keys, no secrets.

**Free tier limits:**  
- **Resend:** 100 emails/day (3,000/month)
- **Vercel Hobby:** 100 GB-hours, 100 serverless function invocations/day (10s timeout)

**Spam protection:**  
- Honeypot field (implement yourself)
- Rate limiting by IP (implement yourself in the function)
- reCAPTCHA integration possible

**Pros:**
- ✅ Most professional solution
- ✅ No secrets in frontend code
- ✅ High email limits (100/day)
- ✅ Full control over email content and formatting
- ✅ Can add server-side validation, rate limiting, logging
- ✅ Resend has great deliverability
- ✅ Works with custom domain (`contact@hydromotor.bg`)

**Cons:**
- ❌ Requires migrating from GitHub Pages to Vercel (or adding Vercel functions separately)
- ❌ More complex — introduces a backend component (even if "serverless")
- ❌ Serverless cold starts add latency
- ❌ Vercel Hobby has invocation limits (100/day)
- ❌ Overkill for a simple contact form on a small business site

**Best for:**
❌ Overkill for the current project. Excellent solution if the site already hosted on Vercel, but adds unnecessary complexity for a simple contact form.

---

## Option 5: Web3Forms / FormBucket / Getform

**How it works:**  
Identical concept to Formspree: set the form `action` to their endpoint URL. They capture the submission and forward it as an email.

**Setup steps (Web3Forms example):**
1. Sign up at web3forms.com (or formbucket.com / getform.io)
2. Get your access key / endpoint URL
3. Add `action="https://api.web3forms.com/submit"` and hidden `<input type="hidden" name="access_key" value="YOUR_KEY">`
4. Configure email forwarding to `office@hydromotor.bg`
5. Handle response with JavaScript for a smooth UX

**What gets exposed in frontend code:**  
The access key / endpoint URL — designed to be exposed, similar to Formspree.

**Free tier limits:**
| Service | Free limit |
|---------|-----------|
| Web3Forms | 250/month |
| FormBucket | 100/month |
| Getform | 50/month |

**Spam protection:**  
- Web3Forms: honeypot, reCAPTCHA (paid), IP blocking
- FormBucket: honeypot, reCAPTCHA (paid)
- Getform: honeypot, reCAPTCHA (free)

**Pros:**
- ✅ No backend needed
- ✅ Higher free limits than Formspree (Web3Forms: 250/mo)
- ✅ Works on any static host
- ✅ Simple setup (similar to Formspree)

**Cons:**
- ❌ Yet another third-party dependency
- ❌ Different services have different quirks/limits
- ❌ Some have branded emails or redirects on free tier

**Best for:**
✅ Strong alternative to Formspree, especially Web3Forms at 250/mo. Similar simplicity but higher limits.

---

## Option 6: Simple Backend (Node.js + Nodemailer)

**How it works:**  
Deploy a minimal Node.js Express (or similar) server somewhere (a cheap VPS, Railway, Render, Fly.io, etc.). The server has an endpoint that accepts POST requests and sends emails via Nodemailer using SMTP credentials of the `office@hydromotor.bg` mailbox.

**Setup steps:**
1. Create `server.js`:
   ```js
   const express = require('express');
   const nodemailer = require('nodemailer');
   require('dotenv').config();
   const app = express();
   app.use(express.json());

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
   });

   app.post('/api/contact', async (req, res) => {
     const { name, contact, message } = req.body;
     await transporter.sendMail({
       from: process.env.SMTP_USER,
       to: 'office@hydromotor.bg',
       subject: `Ново запитване от ${name}`,
       html: `<p><strong>Име:</strong> ${name}</p>...`
     });
     res.json({ success: true });
   });

   app.listen(process.env.PORT || 3000);
   ```
2. Deploy to Railway/Render/Fly.io or a VPS
3. Set SMTP env vars in the hosting dashboard
4. Update React form to POST to the deployed API URL

**What gets exposed in frontend code:**  
Only the backend API URL — no SMTP credentials, no API keys.

**Free tier limits:**  
- Hosting-dependent (Railway: $5/mo after trial, Render: free with cold starts, Fly.io: free tier with limits)
- SMTP: limited only by your email provider's sending limits

**Spam protection:**  
- You control everything: honeypot, rate limiting, CAPTCHA, CORS, IP whitelisting

**Pros:**
- ✅ Full control — no third-party dependency for form processing
- ✅ No secrets in frontend
- ✅ Unlimited emails (within SMTP limits)
- ✅ Can add any server-side logic you want
- ✅ Completely customizable

**Cons:**
- ❌ Requires maintaining a server (even if small)
- ❌ Must handle SMTP credentials securely
- ❌ Adds deployment complexity
- ❌ Additional cost (even if minimal)
- ❌ Cold starts on free hosting tiers
- ❌ Overkill for a small business contact form

**Best for:**
❌ Overkill. This is like bringing a tank to a knife fight. Only consider if you already have a server running for other purposes.

---

## Recommendation: Tiered Approach

### 🥇 First choice: Formspree (immediate, minimal setup)

**Why:**
- Works TODAY on GitHub Pages — zero migration needed
- Simple HTML attribute change in ContactForm.jsx
- No API keys in code
- 50 submissions/month is sufficient for a small business contact form (1-2 inquiries/day)
- If they exceed 50/mo, they're growing and can justify paid ($10/mo for 1k submissions)

**Implementation effort:** ~30 minutes

### 🥈 Second choice: Web3Forms (if higher free limit needed)

**Why:**
- Same simplicity as Formspree
- 250 submissions/month free — 5x Formspree's limit
- Also works on any host
- Bulgarian-friendly content (you control the messages)

**Implementation effort:** ~30 minutes

### 🥉 When migrating to new hosting

**If moving to Netlify:** Use **Netlify Forms** (option 2) — zero extra services, native integration.  
**If moving to Vercel:** Consider **Resend + serverless function** (option 4) for professional setup.  
**If staying on a generic host:** Keep Formspree or Web3Forms — they just work.

### ❌ Not recommended

- **EmailJS** — Exposing a public key is unnecessary risk when better alternatives exist
- **Custom backend (Nodemailer)** — Overkill unless you already have infrastructure
- **Resend + Vercel** — Great but complex for this project's needs

---

## Implementation Plan Summary

**Short-term (current GitHub Pages):**
1. Pick Formspree or Web3Forms
2. Sign up, create form endpoint
3. Update `handleSubmit` in `ContactForm.jsx` to POST to the endpoint with `fetch()` and handle response (`setFormMessage` with success/error)
4. Add honeypot hidden field for spam
5. Remove the "temporarily inactive" disclaimer
6. Deploy

**Long-term (when moving hosts):**
- Re-evaluate based on new host capabilities
- Netlify → native Netlify Forms
- Vercel → serverless function
- Other → keep using the same Formspree/Web3Forms endpoint

---

## Files to modify

1. **`src/components/ContactForm.jsx`** — Main changes:
   - Replace `handleSubmit` stub with actual API call
   - Add `action` / method attributes or use `fetch`
   - Remove "form is inactive" disclaimer
   - Add honeypot hidden field
   - Handle success/error states via `formMessage`
   - Add loading state during submission

2. **`.env`** (create) — If using a service that needs it:
   - Not needed for Formspree/Web3Forms (no keys)
   - For EmailJS: store service/template/public key references

3. **No changes needed** to `ContactMap.jsx` or `Contact.jsx` — they already render the form correctly.

---

## Budget Considerations

| Option | Free tier | Paid upgrade |
|--------|-----------|-------------|
| Formspree | 50/mo | $10/mo (1k sub) |
| Web3Forms | 250/mo | $5/mo (1k sub) |
| Netlify Forms | 100/mo | $19/mo (1k sub) |
| EmailJS | 200/mo | $19/mo (2k sub) |
| Resend+VC | 100/day* | ~$20/mo tier |

*Resend 100 emails/day; Vercel Hobby is free with limits

All are affordable even on paid tiers. A business that can afford a contact form can afford $5-10/mo.

---

## Conclusion

**Go with Formspree** for immediate implementation — simplest, fastest, zero risk.  
**Or Web3Forms** if you want a higher free ceiling with the same simplicity.

Both take < 1 hour to implement, work with the current GitHub Pages deployment, and migrate seamlessly to any future host.

Both keep the code clean, keep secrets out of the frontend, and handle the Bulgarian text perfectly (you control the email content).
