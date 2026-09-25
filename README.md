# PODDAR — Smart Scrap Buying & Recycling

Official business website for **PODDAR Scrap & Recycling**, Kolkata.
Buys old ACs, refrigerators, electronics, copper, aluminium, iron, steel, wires, batteries and all recyclable materials.

## Quick Info

| Detail | Value |
|---|---|
| Owner | Abhishek Poddar |
| Phone / WhatsApp | 9835627586 |
| Email | poddarabhi68@gmail.com |
| Location | Kolkata, West Bengal |

## Tech

- React 19 + Vite + Tailwind CSS v4
- Single-file production build (`dist/index.html`) — all logos are inlined, so it runs on **any** static host with zero config
- Deployable to GitHub Pages, Netlify, Vercel, or plain cPanel

## Run Locally

```bash
npm install
npm run dev      # development server
npm run build    # production build -> dist/
```

## Deploy to GitHub Pages (Auto)

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Every push to `main` now builds and deploys automatically.
4. Site goes live at `https://<username>.github.io/<repo-name>/`

(You can also deploy from branch: **Settings → Pages → Source → Deploy from a branch → `main` / root**, since `dist/index.html` is committed.)

## Edit Business Details

Everything is in `src/App.tsx` unless noted:

| What | Where |
|---|---|
| WhatsApp number | top of `src/App.tsx` → `const WHATSAPP_NUMBER = "919835627586"` (country code + 10-digit mobile) |
| Phone (tel:) links | search `9835627586` in `src/App.tsx` |
| Email | search `poddarabhi68@gmail.com` in `src/App.tsx` |
| Business address | search `[ADD EXACT ADDRESS HERE]` (Location section + footer) |
| Google Map | `src/App.tsx` → Location section → `iframe` `src` (use a new embed URL from Google Maps → Share → Embed a map) |
| Instagram / Facebook links | `src/App.tsx` → footer, search `instagram.com` and `facebook.com` |
| Logos | `src/assets/poddar-logo.png` (full logo) and `src/assets/poddar-emblem.png` (P mark) — replace the files, rebuild |
| Card photos | `src/App.tsx` → `cardsBuy` / How It Works / Why Choose arrays (public/images folder) |
