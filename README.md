# Хидромотор ООД — hydromotor.bg

Официален сайт на "Хидромотор" ООД — официален представител на Putzmeister за България от 1998 г. Продажба, сервиз и резервни части за бетонпомпи, тунелни машини и промишлени помпи.

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Routing:** react-router-dom v6
- **Styling:** Pure CSS with CSS custom properties
- **Deploy:** Static site (Vite build)

## Pages / Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Full landing page with all sections |
| `/za-nas` | About | Company info, history, key points |
| `/mashini` | Machines | Full catalog grid (Putzmeister + SANY) |
| `/mashini/:slug` | Machine Detail | Individual product page with specs |
| `/serviz` | Services | Service capabilities and 24/7 contacts |
| `/kontakti` | Contact | Full contact info + map + visual form |
| `/katalozi` | Downloads | PDF catalog downloads |
| `*` | 404 | Not found page |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Asset Sources

All assets extracted from the original [hydromotor.bg](https://hydromotor.bg) website:

- **Images:** `public/images/` — logos, hero backgrounds, product photos, service workshop
- **PDFs:** `public/pdfs/` — Maschinenliste 2022, МАЙ-МАШИНИ 2020 catalog
- **Content:** Extracted from all public pages (home, about, services, contacts, product pages)

## Color Scheme

- **Primary (gold):** `#f9c500` — main accent, buttons, active nav, highlights
- **Primary dark:** `#d4a800` — hover states
- **Emergency badge:** `#cc2936` — 24/7 emergency sticky bar and phone badges only
- **Background dark:** `#0f0f0f` / `#1a1a1a` — header, footer, hero, dark sections
- **Background light:** `#f5f2ed` / `#f0ede8` — warm off-white, never pure white
- **Text:** `#1a1a1a` / `#3a3a3a` / `#6b6b6b`

The gold accent (#f9c500) is the Hydromotor brand color and matches the original site's accent color.

## Assets Still Needed from Client

- High-resolution logo (current is 145×141 px PNG)
- Newer photos of the office/workshop
- Customer testimonials (none existed on old site)
- Team/staff photos (none on old site)
- Project/installation photos
- Video content (none on old site)

## Notes

- **No backend:** Fully static site. No database, auth, or server-side logic.
- **Content:** Only includes text confirmed from the original site. No invented testimonials, counts, or logos.

## Deployment Notes

### SPA Routing (Blank Page Prevention)

This site uses `BrowserRouter` from react-router-dom, which relies on the browser's History API. When deployed statically, **direct navigation** to routes like `/mashini`, `/serviz`, or `/kontakti` may result in a **blank page (404)** unless the server is configured to serve `index.html` for all routes.

**Required server configuration:**

- **NGINX:** `try_files $uri /index.html;`
- **Netlify:** Create `_redirects` file in the `dist/` folder with: `/* /index.html 200`
- **Vercel:** Already handled by default (uses SPA rewrites)
- **Apache:** Use `FallbackResource /index.html` in `.htaccess`

### Dev Server Notes

Rarely, the Vite dev server may show a brief blank/flash-of-empty on initial HMR reconnect. A simple page refresh resolves this. This is a known Vite behavior and not a code issue.

## Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) to send submissions via email — no backend required.

### Setup

1. Go to [Web3Forms](https://web3forms.com/)
2. Verify the Hydromotor email address
3. Copy the access key
4. Create a `.env` file in the project root (use `.env.example` as reference):
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
5. Restart the dev server
6. Test the contact form by submitting a test message

For production deployment, add the same `VITE_WEB3FORMS_ACCESS_KEY` environment variable in your hosting platform.

> ⚠️ Never commit the actual access key. Only `.env.example` with a placeholder should be committed.

## License

© Хидромотор ООД. All rights reserved.
