# Shotdeck 🎓

A calm, focused **SSC study hub** — every chapter is its own page with a custom
video player and manual progress tracking. A real, deployable **Vite + vanilla
JS** multi-page project.

> Made for **ACS Future School** · SSC candidates · শেখো নিজের ছন্দে

---

## 🚀 Getting started (read this first!)

Requires **Node 18+**.

```bash
npm install      # 1. install Vite (first time only)
npm run dev      # 2. generate pages + start dev server
```

Then open **http://localhost:5173** in your browser.

> ⚠️ You **must** open the `localhost` URL — do **not** double-click `index.html`.
> ES modules + absolute paths need the dev server.

When you run `npm run dev`, the terminal prints every page it generates:
```
[shotdeck] ✓ 24 pages generated & verified.
✓ Shotdeck: generated 24 pages (verified on disk):
   • physics/index.html
   • physics/chapter-1.html
   ...
```

### Build & preview

```bash
npm run build    # generates pages → optimized static output to /dist
npm run preview  # serve the built site at http://localhost:4173
```

---

## 📂 Where are the physics/chemistry files?

The `/physics`, `/chemistry`, `/biology`, `/math` folders are **generated
automatically** from `src/data/subjects.js` — they are git-ignored and don't
exist until you run `npm run dev` (or `npm run gen`).

- This is intentional: **one source of truth** (the data file), no stale pages.
- The Vite config regenerates them on every `dev`/`build`, so they're always in
  sync with the data. There's also a dev-server fallback that regenerates any
  missing page on the fly — `/physics/` can never 404.

If you don't see them, just run:
```bash
npm run gen      # generates + verifies every page, prints them all
```

---

## ✅ All embedded links are present

Verified against the original embed links — both subjects have **every chapter**
with its exact video ID + playlist:

**Physics** (11 chapters): Ch 1,2,3,4,5,7,8,9,10,12,13 — all embedded with the
YouTube IDs you provided (chapter 1 standalone, ch 2 on its own playlist, the
rest on `PLsRCKEpC3AemytSXqy-dNa8gPkVLfaCA3`).

**Chemistry** (11 chapters): Ch 1–11 — all embedded with the IDs you provided
(chapters with a playlist on `PLsRCKEpC3Aekdmf9Brgdv6pREnKZepHtL`, standalone
ones have none).

All of this lives in **`src/data/subjects.js`** — edit there, then re-run
`npm run dev`.

---

## 🗂️ Project structure

```
shotdeck/
├── index.html                 # landing page shell
├── package.json
├── vite.config.js             # generates pages + multi-page build
├── scripts/generate-pages.mjs # page generator (verified writes)
├── public/favicon.svg
├── src/
│   ├── data/subjects.js       # ⭐ all content + embedded video links
│   ├── styles/main.css        # full theme
│   └── js/
│       ├── icons.js   store.js   player.js   chrome.js
│       ├── landing.js (home)  subject.js (hub)  chapter.js (per-chapter)
└── physics/ chemistry/ …      # ← generated (git-ignored), never edit by hand
```

---

## 🧯 Troubleshooting

| Problem | Fix |
|---|---|
| `vite: command not found` | Run `npm install` first |
| Blank page / "not found" | Use the **localhost URL**, not the file path |
| `physics/` folder missing | Run `npm run dev` or `npm run gen` (generates it) |
| Port in use | Vite auto-picks another — check the terminal |
| Changes not showing | Hard refresh (Ctrl+Shift+R); data lives in `src/data/subjects.js` |

---

## ☁️ Deploying

Static site — host `/dist` anywhere (Vercel, Netlify, GitHub Pages):
- **Build command:** `npm run build`
- **Output dir:** `dist`

---

## 🔧 How multi-page works

`scripts/generate-pages.mjs` reads `src/data/subjects.js` and writes a thin
HTML shell for every subject hub and chapter. Each shell carries
`data-subject` / `data-page` / `data-n` attributes and loads the matching entry
module, which hydrates everything from the shared data. `vite.config.js`
discovers all `.html` files as Rollup entries so each page becomes its own
optimized bundle in `/dist`.

Made with ☕ and CSS custom properties.
