/**
 * Generates one HTML shell per subject hub and per chapter from the shared data
 * module. Each shell carries data-* attributes and loads the matching entry
 * module; content is hydrated client-side from src/data/subjects.js (single
 * source of truth for content AND for which YouTube videos are embedded).
 *
 * Robustness: every write is followed by an fs-exists check, and the function
 * returns a detailed report (written / failed). It never throws — failures are
 * collected so Vite can still start.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SUBJECTS, slugify } from '../src/data/subjects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const HEAD = (title, extraMeta = '') => `<!doctype html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="darkreader-lock" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta name="theme-color" content="#0b0b0f" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230a84ff'/%3E%3Cstop offset='.5' stop-color='%235e5ce6'/%3E%3Cstop offset='1' stop-color='%23bf5af2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='url(%23g)'/%3E%3Cpath d='M38 32c0-3 3-5 6-3l28 18c2 2 2 4 0 6L44 71c-3 2-6 0-6-3z' fill='%23fff'/%3E%3C/svg%3E" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.cdnfonts.com" crossorigin />
  <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://www.youtube.com/iframe_api"></script>
  <link rel="stylesheet" href="/src/styles/main.css" />
  ${extraMeta}
  <script>(function(){try{var t=localStorage.getItem('shotdeck:theme');if(t!=='dark'&&t!=='light'){t=(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();</script>
</head>`;

function writeAndVerify(projectRoot, rel, html) {
  const full = path.join(projectRoot, rel);
  try {
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, html.trim() + '\n');
    if (fs.existsSync(full)) return { ok: true, rel, size: fs.statSync(full).size };
    return { ok: false, rel, err: 'file missing after write' };
  } catch (e) {
    return { ok: false, rel, err: e.message };
  }
}

/** Write every subject hub + chapter page. Idempotent. Returns a report. */
export function generatePages(projectRoot = root) {
  const written = [];
  const failed = [];

  for (const s of SUBJECTS) {
    // subject hub → /<key>/index.html
    const hub = writeAndVerify(
      projectRoot,
      `${s.key}/index.html`,
      `${HEAD(`${s.name} — ${s.bengali} | Shotdeck`, `<meta name="description" content="${s.name} (${s.bengali}) — one-shot classes for SSC on Shotdeck." />`)}
<body data-subject="${s.key}" data-page="subject">
  <div id="app"></div>
  <script type="module" src="/src/js/subject.js"></script>
</body>
</html>`
    );
    (hub.ok ? written : failed).push(hub);

    // per-chapter pages → /<key>/chapter-<n>.html
    if (Array.isArray(s.chapters)) {
      for (const ch of s.chapters) {
        const desc = (ch.desc || '').replace(/"/g, '&quot;');
        const r = writeAndVerify(
          projectRoot,
          `${s.key}/${slugify(ch.n)}.html`,
          `${HEAD(`${s.name} — অধ্যায় ${ch.n} · ${ch.title} | Shotdeck`, `<meta name="description" content="${desc}" />`)}
<body data-subject="${s.key}" data-page="chapter" data-n="${ch.n}">
  <div id="app"></div>
  <script type="module" src="/src/js/chapter.js"></script>
</body>
</html>`
        );
        (r.ok ? written : failed).push(r);
      }
    }
  }
  return { written, failed };
}

/** True if a given subject's hub page exists on disk. */
export function pageExists(projectRoot, rel) {
  return fs.existsSync(path.join(projectRoot, rel));
}

/* When run directly (`node scripts/generate-pages.mjs`), generate + verify + report. */
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const { written, failed } = generatePages();
  console.log(`\n✓ Shotdeck: generated ${written.length} pages (verified on disk):`);
  written.forEach((w) => console.log(`   • ${w.rel}  (${w.size} bytes)`));
  if (failed.length) {
    console.error(`\n⚠ ${failed.length} pages FAILED:`);
    failed.forEach((f) => console.error(`   ✗ ${f.rel}  → ${f.err}`));
  }
  console.log('');
}
