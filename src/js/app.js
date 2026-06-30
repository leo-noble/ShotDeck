import { SUBJECTS, getSubject, getChapterByN, getClasses } from '../data/subjects.js';
import { svg, ICO } from './icons.js';
import {
  getWatched, isWatched, toggleWatched, watchedCount, subjectPct, overallProgress,
  isChapterOpen, setChapterOpen, getVolume, setVolume, getSpeed, setSpeed,
  getCollapsed, setCollapsed, getTheme, setTheme, toggleTheme, rgba, setAccent
} from './store.js';

/* ════════════════════════════════════════════════════════════════
   SHORTDECK — Single-page app with hash routing
   One HTML file. Zero generated pages. Light on servers.
   ════════════════════════════════════════════════════════════════ */

// Shot Deck brand — open book with layered pages (study/knowledge)
const BRAND_ICON = svg('<path d="M3 5h6a3 3 0 013 3v11a2 2 0 00-2-2H3zM21 5h-6a3 3 0 00-3 3v11a2 2 0 012-2h7z" stroke-width="1.8" stroke-linejoin="round" fill="none" stroke="currentColor"/>', { sw: 0, fill: 'none', stroke: 'currentColor' });
const GRID_ORDER = ['physics', 'ict', 'biology', 'chemistry', 'math', 'hmath'];
const sorted = () => [...SUBJECTS].sort((a, b) => GRID_ORDER.indexOf(a.key) - GRID_ORDER.indexOf(b.key));
const $ = id => document.getElementById(id);
const go = hash => { location.hash = hash; };

/* ─── ROUTER ─── */
window.route = function route() {
  const h = location.hash.replace(/^#/, '') || '/';
  if (h === '/' || !h) return renderLanding();
  const m = h.match(/^\/?([a-z]+)\/?([0-9]+)?$/);
  if (!m) return renderLanding();
  const sub = getSubject(m[1]);
  if (!sub) return renderLanding();
  if (m[2]) return renderChapter(sub.key, m[2]);
  renderSubject(sub.key);
}
window.addEventListener('hashchange', () => { cleanupFullscreen(); window.route(); });

/* ─── LANDING ─── */
function renderLanding() {
  setAccent('#0a84ff');
  document.title = 'ShotDeck';
  const app = $('app'); app.className = ''; app.style.cssText = '';
  const { pct, total, done } = overallProgress();

  app.innerHTML = `<section class="landing"><div class="lnd-wrap">
    <nav class="lnd-nav"><div class="lnd-brand"><div class="lnd-mark">${BRAND_ICON}</div><div><div class="lnd-brand-name">Shot Deck</div><div class="lnd-brand-sub">SSC Study Hub</div></div></div>
    <div class="lnd-nav-right"><div class="lnd-stat"><span class="lnd-stat-num">${pct}%</span><span class="lnd-stat-lbl">${done}/${total} done</span></div><button class="theme-toggle" id="tt">${themeIcon()}</button></div></nav>
    <div class="lnd-hero"><div class="lnd-pill"><b>${total} chapters</b> All SSC subjects, one place</div><h1 class="lnd-title">Master SSC,<br><span class="grad">one chapter at a time.</span></h1><p class="lnd-sub">Premium one-shot classes with a custom video player, progress tracking, and keyboard shortcuts — your entire SSC prep, beautifully organized in one place.</p></div>
    <div class="lnd-sec-head"><span class="lnd-sec-title">Subjects</span><span class="lnd-sec-sub">Pick where you left off</span></div>
    <div class="lnd-grid">${sorted().map(s => {
      const ico = svg(s.icon, { sw: 1.9 });
      if (s.soon) return `<div class="lc lc-soon" style="--c:${s.color}"><div class="lc-top"><div class="lc-ico">${ico}</div><span class="lc-soon-tag">Soon</span></div><div><div class="lc-name">${s.name}</div><div class="lc-bn">${s.bengali}</div></div><div class="lc-bar"><div class="lc-bar-fill" style="width:0%"></div></div></div>`;
      const p = subjectPct(s);
      const target = s.chapters.length === 1 ? `#/${s.key}/${s.chapters[0].n}` : `#/${s.key}`;
      return `<a class="lc" href="${target}" style="--c:${s.color}"><div class="lc-top"><div class="lc-ico">${ico}</div><div class="lc-pct"><div class="n">${p}%</div><div class="l">${s.chapters.length} ch</div></div></div><div><div class="lc-name">${s.name}</div><div class="lc-bn">${s.bengali}</div></div><div class="lc-bar"><div class="lc-bar-fill" style="width:${p}%"></div></div><div class="lc-foot"><span class="lc-chip">${s.chapters.length} chapters</span><span class="lc-go">${p > 0 ? 'Continue' : 'Start'} ${svg(ICO.arrow, { sw: 2 })}</span></div></a>`;
    }).join('')}</div>
    <div class="lnd-foot">Made for <b>ACS Future School</b> · SSC candidates · শেখো নিজের ছন্দে</div></div></section>`;

  $('tt').onclick = () => { toggleTheme(); $('tt').innerHTML = themeIcon(); };
}

function themeIcon() {
  return getTheme() === 'dark'
    ? svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', { sw: 1.9 })
    : svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', { sw: 1.9 });
}

/* ─── SIDEBAR / TOPBAR ─── */
function buildNav(navEl, activeSubject, activeN) {
  navEl.innerHTML = sorted().map(s => {
    const isActive = s.key === activeSubject;
    const hasCh = Array.isArray(s.chapters) && s.chapters.length;
    const isOpen = hasCh ? isChapterOpen(s.key) : false;
    const pct = subjectPct(s), wc = watchedCount(s.key);
    const count = hasCh ? `<span class="s-count ${pct === 100 ? 'full' : ''}">${wc}/${s.chapters.length}</span>` : '';
    const soon = s.soon ? '<span class="s-soon">Soon</span>' : '';
    const chev = hasCh ? `<span class="s-chev ${isOpen ? 'open' : ''}" data-k="${s.key}">${svg(ICO.chev, { sw: 2.2 })}</span>` : '';
    const bar = hasCh ? `<div class="subj-bar"><div class="subj-bar-fill" style="width:${pct}%"></div></div>` : '';
    const drop = hasCh && isOpen ? `<div class="ch-drop open"><div class="ch-drop-inner">${s.chapters.map(ch => {
      const a = isActive && String(ch.n) === String(activeN), w = isWatched(s.key, ch.n);
      return `<a class="ch-link ${a ? 'active' : ''} ${w ? 'watched' : ''}" href="#/${s.key}/${ch.n}"><span class="ch-num">${String(ch.n).padStart(2,'0')}</span><span class="ch-name">${ch.title}</span><span class="ch-status ${a?'live':w?'done':''}">${a?'●':w?svg(ICO.check,{sw:3}):''}</span></a>`;
    }).join('')}</div></div>` : '';
    const playingCh = isActive && activeN ? s.chapters.find(c => String(c.n) === String(activeN)) : null;
    const pinned = playingCh && !isOpen ? `<div class="ch-drop open"><div class="ch-drop-inner"><a class="ch-link active" href="#/${s.key}/${playingCh.n}"><span class="ch-num">${String(playingCh.n).padStart(2,'0')}</span><span class="ch-name">${playingCh.title}</span><span class="ch-status live">●</span></a></div></div>` : '';
    return `<div class="subj-group" style="--c:${s.color}"><div class="subj-row"><a class="subj-btn ${isActive?'active':''}" href="#/${s.key}">${svg(s.icon,{sw:1.8,cls:'s-ico'})}<span class="s-text"><span class="s-name">${s.name}</span><span class="s-bn">${s.bengali}</span></span>${count}${soon}${chev}</a></div>${bar}${drop}${pinned}</div>`;
  }).join('');
  navEl.querySelectorAll('.s-chev').forEach(t => t.onclick = e => { e.preventDefault(); e.stopPropagation(); setChapterOpen(t.dataset.k, !isChapterOpen(t.dataset.k)); buildNav(navEl, activeSubject, activeN); return false; });
}

function mountShell(crumbTitle, activeSubject, activeN) {
  const sub = getSubject(activeSubject);
  if (sub) setAccent(sub.color);
  document.title = 'ShotDeck' + (activeSubject ? ' | ' + getSubject(activeSubject).name : '') + (activeN ? '-' + activeN : '');
  const app = $('app'); app.className = 'app-shell'; app.style.cssText = '';
  app.innerHTML = `<aside class="sidebar"><button class="brand" id="brandT"><span class="brand-mark">${BRAND_ICON}</span><span class="brand-txt"><span class="brand-name">Shot Deck</span><span class="brand-sub">SSC</span></span><span class="brand-chev">${svg('<path d="M15 18l-6-6 6-6"/>',{sw:2})}</span></button><div class="sb-body"><div class="sb-label">Subjects</div><nav id="subjects"></nav></div></aside><div class="main"><header class="topbar"><button class="icon-btn menu-btn" id="menuBtn">${svg(ICO.menu,{sw:2})}</button><button class="icon-btn" id="homeBtn">${svg(ICO.home,{sw:2})}</button><div class="crumb"><a class="crumb-sub" id="crumbSub" href="#/${activeSubject||''}"></a><span class="crumb-sep">/</span><span class="crumb-title" id="crumbTitle">${crumbTitle||''}</span></div><button class="theme-toggle" id="tt">${themeIcon()}</button></header><div class="stage"><div class="stage-inner fade" id="mainArea"></div></div></div>`;
  if (sub) { const cs = $('crumbSub'); cs.style.color = sub.color; cs.innerHTML = `${svg(sub.icon,{sw:1.9})}<span>${sub.name}</span>`; }
  buildNav($('subjects'), activeSubject, activeN);
  if (getCollapsed()) document.body.classList.add('sb-collapsed');
  $('brandT').onclick = () => { const n = !getCollapsed(); setCollapsed(n); document.body.classList.toggle('sb-collapsed', n); };
  $('menuBtn').onclick = () => document.body.classList.toggle('nav-open');
  $('backdrop').onclick = () => document.body.classList.remove('nav-open');
  $('homeBtn').onclick = () => go('/');
  $('tt').onclick = () => { toggleTheme(); $('tt').innerHTML = themeIcon(); };
  return $('mainArea');
}

/* ─── SUBJECT HUB ─── */
function renderSubject(key) {
  const sub = getSubject(key);
  if (!sub) { mountShell('Not found', key, null); return; }
  if (sub.soon) { const ma = mountShell(sub.bengali, key, null); ma.innerHTML = ph(sub); return; }
  if (sub.chapters.length === 1) { go(`/${key}/${sub.chapters[0].n}`); return; }
  const ma = mountShell(sub.bengali, key, null);
  drawHub(ma, sub);
}

function drawHub(ma, sub) {
  const pct = subjectPct(sub);
  ma.innerHTML = `<div class="hub-head" style="--c:${sub.color}"><div class="hub-title"><div class="hub-ico">${svg(sub.icon,{sw:1.8})}</div><div><div class="hub-h1">${sub.name}</div><div class="hub-sub">${sub.bengali} · ${sub.chapters.length} chapters · ${sub.type}</div></div></div><div class="hub-prog"><div class="hub-prog-top"><span class="l">Progress</span><span class="v">${pct}%</span></div><div class="hub-prog-bar"><div class="hub-prog-fill" style="width:${pct}%"></div></div></div></div><div class="hub-list" id="hubList"></div>`;
  drawList(sub);
}

function drawList(sub) {
  $('hubList').innerHTML = sub.chapters.map(ch => {
    const w = isWatched(sub.key, ch.n), cnt = getClasses(ch).length;
    const pill = cnt > 1 ? `<span class="chap-pills"><span class="chap-pill">${cnt} classes</span></span>` : '';
    return `<a class="chap ${w?'done':''}" href="#/${sub.key}/${ch.n}"><div class="chap-num">${String(ch.n).padStart(2,'0')}</div><div class="chap-body"><div class="chap-title">${ch.title}</div><div class="chap-desc">${ch.desc}</div></div>${pill}<span class="chap-go">${svg(ICO.arrow,{sw:2})}</span><button class="mark-btn ${w?'done':''}" data-n="${ch.n}">${w?svg(ICO.check,{sw:2.4})+' Completed':svg(ICO.circle,{sw:2})+' Mark'}</button></a>`;
  }).join('');
  document.querySelectorAll('#hubList .mark-btn').forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); toggleWatched(sub.key, b.dataset.n); drawHub($('mainArea'), sub); buildNav($('subjects'), sub.key, null); });
}

function ph(sub) {
  return `<div class="placeholder"><div class="ph" style="--c:${sub.color}"><div class="ph-ico">${svg('<circle cx="12" cy="12" r="9"/>',{sw:1.7})}</div><div class="ph-title">${sub.name}</div><p class="ph-sub">${sub.bengali} — coming soon.</p></div></div>`;
}

/* ─── CHAPTER ─── */
let curCh = null, curSub = null, curIdx = null, curClasses = [];
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const VOLSVG = {
  high: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  low: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  muted: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};
const QLABELS = { auto:'Auto', tiny:'144p', small:'240p', medium:'360p', large:'480p', hd720:'720p', hd1080:'1080p', highres:'Max' };
const SKIP_BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><text x="12" y="15.5" font-size="7.5" font-weight="800" fill="currentColor" stroke="none" text-anchor="middle">10</text></svg>`;
const SKIP_FWD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/><text x="12" y="15.5" font-size="7.5" font-weight="800" fill="currentColor" stroke="none" text-anchor="middle">10</text></svg>`;

let ytPlayer = null, progressTimer = null, scrubbing = false, pendingRatio = 0, hideTimer = null, pendingPlay = false, lastVol = 100, isMutedState = false, fellBack = false, curVideoId = null, curList = null, fsFallback = false;
const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isMobile = isIos || /Android/.test(navigator.userAgent);

function destroyYT() { if (progressTimer) { clearInterval(progressTimer); progressTimer = null; } if (ytPlayer) { try { ytPlayer.destroy(); } catch {} ytPlayer = null; } scrubbing = false; pendingPlay = false; fellBack = false; isMutedState = false; exitFsFallback(); }
function fmtTime(s) { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60; const mm = h ? String(m).padStart(2,'0') : String(m); return (h ? h+':' : '') + mm + ':' + String(sec).padStart(2,'0'); }

const PLAYER_FRAME = `<div class="video-frame has-poster" id="videoBox"><div class="yt-stage" id="ytStage"></div><img class="vp-poster" id="vpPoster" alt="" referrerpolicy="no-referrer"/><div class="vp-surface" id="vpSurface"></div><div class="vp-spinner"></div><div class="vp-center">${svg(ICO.play,{fill:'currentColor',stroke:'none'})}</div><div class="vp-controls"><div class="vp-progress" id="vpProgress"><div class="vp-track"><div class="vp-buffer" id="vpBuffer"></div><div class="vp-fill" id="vpFill"></div></div><div class="vp-thumb" id="vpThumb"></div><div class="vp-tooltip" id="vpTooltip">0:00</div></div><div class="vp-row"><button class="vp-btn vp-skip" id="vpBack10">${SKIP_BACK}</button><button class="vp-btn vp-play" id="vpPlay">${svg(ICO.play,{fill:'currentColor',stroke:'none'})}</button><button class="vp-btn vp-skip" id="vpFwd10">${SKIP_FWD}</button><div class="vp-vol"><button class="vp-btn" id="vpMute"></button><div class="vp-volbar"><div class="vp-voltrack" id="vpVoltrack"><div class="vp-volfill" id="vpVolfill"></div><div class="vp-volthumb" id="vpVolthumb"></div></div></div></div><span class="vp-time"><span id="vpCurrent">0:00</span><span class="dur"> / <span id="vpDuration">0:00</span></span></span><div class="vp-spacer"></div><div class="vp-menu-wrap"><button class="vp-menu-btn" id="vpSpeed">1× ${svg(ICO.chev,{sw:2})}</button><div class="vp-menu" id="vpSpeedMenu"></div></div><div class="vp-menu-wrap"><button class="vp-menu-btn" id="vpQuality">Auto ${svg(ICO.chev,{sw:2})}</button><div class="vp-menu" id="vpQualityMenu"></div></div><button class="vp-btn" id="vpFs">${svg(ICO.fs,{sw:2})}</button></div></div></div>`;

function renderChapter(key, n) {
  destroyYT();
  const found = getChapterByN(key, n);
  const ma = mountShell(found ? found.chapter.title : 'Chapter', key, n);
  if (!found) { ma.innerHTML = `<div class="placeholder"><div class="ph" style="--c:#888"><div class="ph-title">Not found</div></div></div>`; return; }
  const { subject: sub, chapter: ch, index: i } = found;
  curCh = ch; curSub = sub; curIdx = i; curClasses = getClasses(ch);
  if (sub.chapters && !isChapterOpen(sub.key)) setChapterOpen(sub.key, true);
  buildNav($('subjects'), key, n);
  if (curClasses.length === 1) openClass(0); else renderLessonPicker();
}

function renderLessonPicker() {
  const ma = $('mainArea');
  ma.innerHTML = `<div class="lp"><div class="lp-head"><div class="lp-eyebrow"><span class="ed"></span>${curSub.name} · Chapter ${String(curCh.n).padStart(2,'0')}</div><h1 class="lp-title">${curCh.title}</h1><p class="lp-desc">${curCh.desc}</p><div class="lp-hint">${svg(ICO.layers,{sw:1.9})} <b>${curClasses.length}</b> classes available</div></div><div class="lp-grid">${curClasses.map((c,idx) => `<button class="lpcard" data-i="${idx}"><div class="lpcard-thumb"><img src="https://i.ytimg.com/vi/${c.video}/hqdefault.jpg" referrerpolicy="no-referrer" loading="lazy" alt=""/><span class="lpcard-overlay"></span><span class="lpcard-play">${svg(ICO.play,{fill:'currentColor',stroke:'none'})}</span></div><div class="lpcard-body"><span class="lpcard-label">${c.label}</span><span class="lpcard-cta">Watch ${svg(ICO.arrow,{sw:2})}</span></div></button>`).join('')}</div></div>`;
  document.querySelectorAll('.lpcard').forEach(card => card.onclick = e => { e.preventDefault(); openClass(+card.dataset.i); });
}

function openClass(idx) {
  if (!curClasses[idx]) return;
  cleanupFullscreen();
  const c = curClasses[idx], ma = $('mainArea');
  ma.innerHTML = `<button class="vp-back" id="vpBack">${svg(ICO.arrowLeft,{sw:2})} All classes</button>${PLAYER_FRAME}<div class="lesson" id="lesson"></div>`;
  $('vpBack').onclick = e => { e.preventDefault(); destroyYT(); if (curClasses.length > 1) renderLessonPicker(); else openClass(0); };
  const poster = $('vpPoster');
  poster.onerror = function() { if (this.src.includes('maxres')) { this.src = `https://i.ytimg.com/vi/${c.video}/hqdefault.jpg`; } else { this.onerror = null; } };
  poster.src = `https://i.ytimg.com/vi/${c.video}/maxresdefault.jpg`;
  bindController(); applyVol(); drawLesson(); startPlayer(c.video, c.list);
}

function drawLesson() {
  const w = isWatched(curSub.key, curCh.n);
  const prev = curSub.chapters[curIdx - 1], next = curSub.chapters[curIdx + 1];
  const mb = w ? `<button class="mark-btn done" id="markBtn">${svg(ICO.check,{sw:2.4})} Completed</button>` : `<button class="mark-btn" id="markBtn">${svg(ICO.circle,{sw:2})} Mark complete</button>`;
  const pager = `<div class="pager">${prev?`<a href="#/${curSub.key}/${prev.n}"><span class="p-lbl">← Previous</span><span class="p-name">${String(prev.n).padStart(2,'0')}. ${prev.title}</span></a>`:'<span></span>'}${next?`<a class="next" href="#/${curSub.key}/${next.n}"><span class="p-lbl">Next →</span><span class="p-name">${String(next.n).padStart(2,'0')}. ${next.title}</span></a>`:'<span></span>'}</div>`;
  $('lesson').innerHTML = `<div class="lesson-top"><div class="lesson-body"><div class="lesson-eyebrow"><span class="ed"></span>${curSub.name} · Chapter ${String(curCh.n).padStart(2,'0')}</div><h1 class="lesson-title">${curCh.title}</h1><p class="lesson-desc">${curCh.desc}</p></div>${mb}</div><div class="facts"><div class="fact">${svg(ICO.user,{sw:1.9})}<span class="k">Channel</span><span class="v">${curSub.channel}</span></div><div class="fact-divider"></div><div class="fact">${svg(ICO.layers,{sw:1.9})}<span class="k">Type</span><span class="v">${curSub.type}</span></div><div class="fact-divider"></div><div class="fact">${svg(ICO.target,{sw:1.9})}<span class="k">Batch</span><span class="v">${curSub.batch}</span></div></div>${pager}`;
  $('markBtn').onclick = () => { toggleWatched(curSub.key, curCh.n); drawLesson(); buildNav($('subjects'), curSub.key, curCh.n); };
}

/* ─── PLAYER LOGIC ─── */
// Lazy-load the YouTube IFrame API only when a video is actually opened.
// This keeps it off the critical render path so a slow/blocked youtube CDN
// can never blank the page (the original <script src=iframe_api> was render-blocking).
let ytApiLoading = false;
function loadYTApi(cb) {
  if (window.YT && window.YT.Player) return cb();
  window.onYouTubeIframeAPIReady = cb;
  if (!ytApiLoading) {
    ytApiLoading = true;
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    // If the script fails to load, surface a friendly fallback instead of hanging forever.
    s.onerror = () => {
      ytApiLoading = false;
      if (curVideoId) {
        $('videoBox')?.classList.add('is-fallback');
        $('ytStage').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${curVideoId}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&controls=0&disablekb=1&fs=0&cc_load_policy=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      }
    };
    document.head.appendChild(s);
  }
}

function startPlayer(videoId, list) {
  curVideoId = videoId; curList = list; fellBack = false;
  loadYTApi(function create() {
    if (!(window.YT && window.YT.Player)) return setTimeout(create, 120);
    const pv = { controls: 0, modestbranding: 1, rel: 0, playsinline: 1, iv_load_policy: 3, fs: 0, disablekb: 1, cc_load_policy: 0 };
    const opts = { width: '100%', height: '100%', playerVars: pv, videoId: videoId || undefined, host: 'https://www.youtube-nocookie.com', events: { onReady, onStateChange, onPlaybackRateChange: () => updateSpeed(), onError: onErr } };
    if (!videoId && list) { pv.listType = 'playlist'; pv.list = list; }
    $('ytStage').innerHTML = '<div id="ytMount"></div>';
    ytPlayer = new YT.Player('ytMount', opts);
  });
}
function onErr() { if (fellBack) return; fellBack = true; if (ytPlayer) { try { ytPlayer.destroy(); } catch {} ytPlayer = null; } if (progressTimer) { clearInterval(progressTimer); progressTimer = null; } $('videoBox')?.classList.add('is-fallback'); $('ytStage').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${curVideoId}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&controls=0&disablekb=1&fs=0&cc_load_policy=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`; }
function onReady() { if (!ytPlayer || fellBack) return; lastVol = getVolume(); isMutedState = false; ytPlayer.setVolume(lastVol); const sp = getSpeed(); if (sp !== 1) try { ytPlayer.setPlaybackRate(sp); } catch {} applyVol(); buildSpeed(); updateSpeed(); buildQuality(); updateQualityBtn(); startLoop(); if (pendingPlay) { pendingPlay = false; markStarted(); ytPlayer.playVideo(); } }
function onStateChange(e) { if (fellBack) return; const box = $('videoBox'); if (!box || !window.YT) return; const playing = e.data === YT.PlayerState.PLAYING, buffering = e.data === YT.PlayerState.BUFFERING; if (playing) markStarted(); box.classList.toggle('playing', playing); box.classList.toggle('buffering', buffering); updatePlayIcon(playing); if (playing) scheduleHide(); }
function markStarted() { const b = $('videoBox'); if (b) { b.classList.add('started'); b.classList.remove('has-poster'); } }
function setProgressUI(p) { const f = $('vpFill'), th = $('vpThumb'); if (f) f.style.width = p + '%'; if (th) th.style.left = p + '%'; }
function updatePlayIcon(playing) { const b = $('vpPlay'); if (b) b.innerHTML = svg(playing ? ICO.pause : ICO.play, { fill: 'currentColor', stroke: 'none' }); }
function applyVol() { const fill = $('vpVolfill'), th = $('vpVolthumb'), btn = $('vpMute'); const shown = isMutedState ? 0 : lastVol; if (fill) fill.style.width = shown + '%'; if (th) th.style.left = shown + '%'; if (btn) btn.innerHTML = (isMutedState || shown === 0) ? VOLSVG.muted : (shown < 50 ? VOLSVG.low : VOLSVG.high); }
function buildSpeed() { const m = $('vpSpeedMenu'); if (!m) return; m.innerHTML = SPEEDS.map(r => `<button class="vp-menu-item ${r === getSpeed() ? 'active' : ''}" data-r="${r}"><span>${r}×</span>${svg(ICO.check,{sw:2.4,cls:'vp-menu-check',fill:'none'})}</button>`).join(''); m.querySelectorAll('.vp-menu-item').forEach(b => b.onclick = e => { e.stopPropagation(); const r = +b.dataset.r; setSpeed(r); if (ytPlayer && !fellBack) ytPlayer.setPlaybackRate(r); updateSpeed(); }); }
function updateSpeed() { const cur = ytPlayer && !fellBack ? ytPlayer.getPlaybackRate?.() : getSpeed(); const b = $('vpSpeed'); if (b) b.innerHTML = `${cur}× ${svg(ICO.chev,{sw:2})}`; $('vpSpeedMenu')?.querySelectorAll('.vp-menu-item').forEach(b => b.classList.toggle('active', +b.dataset.r === cur)); }
function buildQuality() { const menu = $('vpQualityMenu'); if (!menu) return; let levels = ['auto','hd1080','hd720','large','medium','small','tiny']; if (ytPlayer && !fellBack) { try { const av = ytPlayer.getAvailableQualityLevels?.(); if (av?.length) { const s = new Set(av); levels = ['auto', ...['hd1080','hd720','large','medium','small','tiny'].filter(q => s.has(q))]; } } catch {} } menu.innerHTML = levels.map(q => `<button class="vp-menu-item ${q==='auto'?'active':''}" data-q="${q}"><span>${QLABELS[q]||q}</span>${svg(ICO.check,{sw:2.4,cls:'vp-menu-check',fill:'none'})}</button>`).join(''); menu.querySelectorAll('.vp-menu-item').forEach(b => b.onclick = e => { e.stopPropagation(); const q = b.dataset.q; $('vpQualityMenu').querySelectorAll('.vp-menu-item').forEach(x => x.classList.toggle('active', x.dataset.q === q)); $('vpQuality').innerHTML = `${QLABELS[q]||q} ${svg(ICO.chev,{sw:2})}`; if (ytPlayer && !fellBack) try { ytPlayer.setPlaybackQuality(q); } catch {} }); }
function updateQualityBtn() { const b = $('vpQuality'); if (b) b.innerHTML = `Auto ${svg(ICO.chev,{sw:2})}`; }
function startLoop() { if (progressTimer) clearInterval(progressTimer); progressTimer = setInterval(() => { if (!ytPlayer || fellBack || scrubbing) return; const c = ytPlayer.getCurrentTime() || 0, d = ytPlayer.getDuration() || 0; setProgressUI(d ? (c/d)*100 : 0); $('vpCurrent').textContent = fmtTime(c); $('vpDuration').textContent = fmtTime(d); $('vpBuffer').style.width = ((ytPlayer.getVideoLoadedFraction?.()||0)*100) + '%'; }, 250); }
function showUI() { const b = $('videoBox'); if (b) { b.classList.add('show-ui'); b.classList.remove('hide-ui'); } }
function scheduleHide() { const b = $('videoBox'); if (!b) return; clearTimeout(hideTimer); hideTimer = setTimeout(() => { if (b.classList.contains('playing')) { b.classList.remove('show-ui'); b.classList.add('hide-ui'); } }, 4000); }
function togglePlay() { if (fellBack) return; if (!ytPlayer?.playVideo) { markStarted(); pendingPlay = true; return; } if (ytPlayer.getPlayerState() === 1) ytPlayer.pauseVideo(); else { markStarted(); ytPlayer.playVideo(); } }
function seekBy(d) { if (!ytPlayer?.seekTo || fellBack) return; const dur = ytPlayer.getDuration() || 0; let t = (ytPlayer.getCurrentTime()||0) + d; t = Math.max(0, dur ? Math.min(t,dur) : t); ytPlayer.seekTo(t,true); setProgressUI(dur?(t/dur)*100:0); $('vpCurrent').textContent = fmtTime(t); showUI(); scheduleHide(); }
function toggleMute() { if (!ytPlayer || fellBack) return; if (isMutedState) { isMutedState = false; const r = lastVol > 0 ? lastVol : 100; try { ytPlayer.unMute(); ytPlayer.setVolume(r); } catch {} setVolume(r); } else { try { const c = ytPlayer.getVolume() ?? 100; if (c > 0) lastVol = c; ytPlayer.mute(); } catch {} isMutedState = true; } applyVol(); }
function setVolX(r) { const v = Math.round(Math.max(0, Math.min(1, r)) * 100); if (v > 0) { lastVol = v; isMutedState = false; try { if (ytPlayer && !fellBack) { ytPlayer.setVolume(v); ytPlayer.unMute(); } } catch {} } else { isMutedState = true; try { if (ytPlayer && !fellBack) ytPlayer.mute(); } catch {} } setVolume(v || 0); applyVol(); }
function isFsActive() { return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || fsFallback); }

function updateFsBtn() {
  const btn = $('vpFs');
  if (btn) btn.innerHTML = svg(isFsActive() ? ICO.fsExit : ICO.fs, { sw: 2 });
}

function enterFsFallback(b) {
  if (!b) return;
  fsFallback = true;
  b.classList.add('fs-fallback');
  document.body.classList.add('fs-fallback-active');
  updateFsBtn();
  if (screen.orientation?.lock) screen.orientation.lock('landscape').catch(()=>{});
  showUI(); scheduleHide();
}

function exitFsFallback() {
  if (fsFallback) {
    fsFallback = false;
    const b = $('videoBox');
    if (b) b.classList.remove('fs-fallback');
    document.body.classList.remove('fs-fallback-active');
    updateFsBtn();
    if (screen.orientation?.unlock) screen.orientation.unlock().catch(()=>{});
  }
}

function toggleFS() {
  const b = $('videoBox');
  if (!b) return;

  // --- EXIT paths ---
  if (isFsActive()) {
    cleanupFullscreen();
    return;
  }

  // --- ENTER: native API first ---
  const rq = b.requestFullscreen || b.webkitRequestFullscreen || b.mozRequestFullScreen || b.msRequestFullscreen;
  if (rq) {
    Promise.resolve(rq.call(b)).catch(() => {
      // If native fails (e.g. mobile Safari) use fallback
      enterFsFallback(b);
    });
    return;
  }

  // No native API at all (e.g. some older browsers / iOS)
  enterFsFallback(b);

  // Re-apply volume UI to ensure it stays consistent after potential layout shift
  applyVol();
}

/* Exit whatever fullscreen mode is active (native + fallback) */
function cleanupFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  exitFsFallback();
}

function bindController() {
  const surface = $('vpSurface'), box = $('videoBox');
  let ct = null;
  // Touch double-tap state for mobile fullscreen
  let lastTapTime = 0, tapTimer = null;

  /* ── Surface click/tap: single tap → toggle play, double tap → fullscreen ── */
  function handleTap(e) {
    const now = Date.now();
    const isDoubleTap = (now - lastTapTime) < 320;
    lastTapTime = now;

    if (isDoubleTap) {
      // Double tap → fullscreen
      clearTimeout(ct); clearTimeout(tapTimer); ct = null;
      e.preventDefault();
      toggleFS();
      return;
    }

    // Single tap → show UI, then after delay toggle play (unless 2nd tap comes)
    showUI(); scheduleHide();
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
      // Could be a single tap → toggle play
      togglePlay();
      tapTimer = null;
    }, 280);
  }

  surface.onclick = e => {
    if (ct) { clearTimeout(ct); ct = null; return; }
    handleTap(e);
  };
  // Mobile: use touchend for more reliable detection
  let touchStartTime = 0;
  surface.addEventListener('touchstart', e => {
    touchStartTime = Date.now();
    showUI();
  }, { passive: true });
  surface.addEventListener('touchend', e => {
    // Only count as tap if it was a short touch (< 300ms), not a long-press or drag
    if (Date.now() - touchStartTime > 300) return;
    handleTap(e);
  }, { passive: true });
  // Desktop dblclick still works as backup
  surface.ondblclick = e => { if (ct) { clearTimeout(ct); ct = null; } e.preventDefault(); toggleFS(); };

  box.onmousemove = () => { showUI(); scheduleHide(); }; box.onmouseenter = showUI; box.onmouseleave = () => { if (box.classList.contains('playing')) box.classList.add('hide-ui'); };
  $('vpPlay').onclick = e => { e.stopPropagation(); togglePlay(); };
  $('vpBack10').onclick = e => { e.stopPropagation(); seekBy(-10); };
  $('vpFwd10').onclick = e => { e.stopPropagation(); seekBy(10); };
  $('vpMute').onclick = e => { e.stopPropagation(); toggleMute(); };
  const vt = $('vpVoltrack'); let drag = false; const apply = x => { const r = vt.getBoundingClientRect(); setVolX((x-r.left)/r.width); }; vt.onpointerdown = e => { drag = true; vt.setPointerCapture(e.pointerId); apply(e.clientX); }; vt.onpointermove = e => { if (drag) apply(e.clientX); };   vt.onpointerup = () => drag = false;
  // Make vol bar always visible on mobile (touch devices)
  if ('ontouchstart' in window) {
    const volbar = document.querySelector('.vp-volbar');
    if (volbar) volbar.style.width = '72px';
  }
  const bar = $('vpProgress'); const rat = x => { const r = bar.getBoundingClientRect(); return Math.max(0, Math.min(1,(x-r.left)/r.width)); }; const prev = x => { pendingRatio = rat(x); setProgressUI(pendingRatio*100); const d = ytPlayer?ytPlayer.getDuration()||0:0; $('vpCurrent').textContent = fmtTime(pendingRatio*d); }; const tip = x => { const r = rat(x), t = $('vpTooltip'), d = ytPlayer?ytPlayer.getDuration()||0:0; if (t) { t.textContent = fmtTime(r*d); t.style.left = r*100+'%'; t.style.opacity = 1; } };
  bar.onpointerdown = e => { scrubbing = true; bar.classList.add('scrubbing'); bar.setPointerCapture(e.pointerId); prev(e.clientX); }; bar.onpointermove = e => { tip(e.clientX); if (scrubbing) prev(e.clientX); }; bar.onpointerup = () => { if (!scrubbing) return; scrubbing = false; bar.classList.remove('scrubbing'); if (ytPlayer && !fellBack) ytPlayer.seekTo(pendingRatio*(ytPlayer.getDuration()||0),true); }; bar.onpointerleave = () => { const t = $('vpTooltip'); if (t) t.style.opacity = 0; };
  const sb = $('vpSpeed'), sm = $('vpSpeedMenu'); sb.onclick = e => { e.stopPropagation(); sm.classList.toggle('open'); };
  const qb = $('vpQuality'), qm = $('vpQualityMenu'); if (qb && qm) qb.onclick = e => { e.stopPropagation(); qm.classList.toggle('open'); sm.classList.remove('open'); };
  document.addEventListener('click', e => { if (!e.target.closest('.vp-menu-wrap')) { sm.classList.remove('open'); qm?.classList.remove('open'); } });
  document.addEventListener('touchstart', e => { if (!e.target.closest('.vp-menu-wrap')) { sm.classList.remove('open'); qm?.classList.remove('open'); } }, { passive: true });
  $('vpFs').onclick = e => { e.stopPropagation(); toggleFS(); };

  // Fullscreen change events — update button icon and clean up state
  const fsEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
  fsEvents.forEach(ev => document.addEventListener(ev, () => {
    updateFsBtn();
    if (isFsActive()) { showUI(); scheduleHide(); }
    else { exitFsFallback(); }
  }));

  // On window resize (e.g. rotation), keep UI visible
  window.addEventListener('resize', () => { if (isFsActive()) showUI(); });

  // Orientation change — re-show UI on mobile rotation
  if (screen.orientation) {
    screen.orientation.addEventListener('change', () => { showUI(); scheduleHide(); });
  }

  document.onkeydown = e => {
    const tag = (e.target.tagName||'').toLowerCase(); if (tag === 'input' || tag === 'textarea') return;
    switch (e.key) {
      case 'Escape': if (isFsActive()) { e.preventDefault(); toggleFS(); } return;
      case 'f': case 'F': e.preventDefault(); toggleFS(); return;
      case 'm': case 'M': if (!ytPlayer || fellBack) return; e.preventDefault(); toggleMute(); return;
      case ' ': case 'Spacebar': if (!ytPlayer || fellBack) return; e.preventDefault(); togglePlay(); return;
      case 'ArrowLeft': if (!ytPlayer || fellBack) return; e.preventDefault(); seekBy(-10); return;
      case 'ArrowRight': if (!ytPlayer || fellBack) return; e.preventDefault(); seekBy(10); return;
      case 'ArrowUp': if (!ytPlayer || fellBack) return; e.preventDefault(); setVolX(Math.min(100,lastVol+10)/100); return;
      case 'ArrowDown': if (!ytPlayer || fellBack) return; e.preventDefault(); setVolX(Math.max(0,lastVol-10)/100); return;
    }
  };
}

window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || (() => {});
route();

/* ─── 3D TILT on cards (landing + lesson picker) ─── */
function initTilt() {
  document.querySelectorAll('.lc:not(.lc-soon), .lpcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = ((e.clientY - cy) / r.height) * -8;
      const ry = ((e.clientX - cx) / r.width) * 8;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── SCROLL PROGRESS BAR ─── */
function updateScrollProgress() {
  const el = document.getElementById('scrollProgress');
  if (!el) return;
  let scroller = document.querySelector('.stage');
  if (!scroller) scroller = document.querySelector('.landing');
  if (!scroller) return;
  const max = scroller.scrollHeight - scroller.clientHeight;
  const pct = max > 0 ? (scroller.scrollTop / max) * 100 : 0;
  el.style.width = pct + '%';
}

/* ─── INIT TILT + SCROLL after each route ─── */
const _origRoute = window.route;
window.route = function() {
  _origRoute();
  setTimeout(() => {
    initTilt();
    const scroller = document.querySelector('.stage') || document.querySelector('.landing');
    if (scroller) {
      scroller.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();
    }
  }, 100);
};

/* ─── PAGE FADE-IN on load ───
   Reveal as soon as the DOM is ready. Never gate this on window.load —
   a slow external resource (or a freshly-installed PWA with no network)
   could otherwise keep the body at opacity:0 = blank page. */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity .4s ease';
function revealPage() {
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  revealPage();
} else {
  document.addEventListener('DOMContentLoaded', revealPage, { once: true });
  // Belt-and-suspenders: if DOMContentLoaded already fired, force-reveal on load.
  window.addEventListener('load', () => setTimeout(revealPage, 0), { once: true });
}

/* ─── SERVICE WORKER (PWA: installable + offline app shell) ─── */
// Register in secure contexts only (https, or localhost over http).
// Skip in `vite dev` — its own HMR client takes over there.
const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
if ('serviceWorker' in navigator && isSecure && !import.meta.env?.DEV) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
