/* ============================================
   QURAN KITA — UI Helpers
   js/ui.js
   ============================================ */

'use strict';

const UI = (() => {

  /* ── SURAH GRID ── */
  function renderGrid(list) {
    const grid = document.getElementById('surahGrid');
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state">Surah tidak ditemukan</div>';
      return;
    }
    grid.innerHTML = list.map(([n, nameId, nameAr, ayat, type, arti]) => `
      <a class="surah-card" href="./surah.html?n=${n}" aria-label="Buka ${nameId}">
        <div class="card-num" aria-hidden="true">${n}</div>
        <div class="card-body">
          <div class="card-name">${nameId}</div>
          <div class="card-arti">${arti}</div>
          <div class="card-meta">${type} · ${ayat} ayat</div>
        </div>
        <div class="card-arabic" aria-hidden="true">${nameAr}</div>
      </a>`).join('');
  }

  /* ── AYAT LIST ── */
  function renderAyat(ayat) {
    const wrap = document.getElementById('ayatWrap');
    if (!wrap) return;
    wrap.innerHTML = ayat.map(a => `
      <div class="ayat-row" id="ayat-${a.num}">
        <div class="ayat-num-wrap">
          <div class="ayat-num" aria-label="Ayat ${a.num}">${a.num}</div>
        </div>
        <div class="ayat-arabic" dir="rtl" lang="ar">${a.arabic}</div>
        <div class="ayat-div" role="separator"></div>
        <div class="ayat-terj" lang="id">${a.terjemah}</div>
      </div>`).join('');
  }

  /* ── LOADING STATE ── */
  function showLoading(containerId, msg = 'Memuat…') {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = `
      <div class="loading" role="status" aria-label="${msg}">
        <div class="spinner"></div>
        <span>${msg}</span>
      </div>`;
  }

  function showError(containerId, msg = 'Gagal memuat. Periksa koneksi.') {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = `
      <div class="empty-state" role="alert" style="color:var(--md-sys-color-error)">${msg}</div>`;
  }

  /* ── PLAYER BAR ── */
  function showPlayer(surah, qariName) {
    const player = document.getElementById('player');
    if (player) player.classList.add('visible');
    updatePlayerInfo(surah, qariName);
  }

  function hidePlayer() {
    const player = document.getElementById('player');
    if (player) player.classList.remove('visible');
  }

  function updatePlayerInfo(surah, qariName) {
    const thumb = document.getElementById('plThumb');
    const title = document.getElementById('plTitle');
    const qari  = document.getElementById('plQari');
    if (thumb) thumb.textContent = surah[2].charAt(0) || '☪';
    if (title) title.textContent = surah[1];
    if (qari)  qari.textContent  = qariName || '';
  }

  /* ── SURAH HEADER ── */
  function updateSurahHeader(surah) {
    const name = document.getElementById('hdrName');
    const meta = document.getElementById('hdrMeta');
    if (name) name.textContent = surah[1];
    if (meta) meta.textContent = `${surah[4]} · ${surah[3]} Ayat · Surah ke-${surah[0]}`;
  }

  /* ── BISMILLAH ── */
  function toggleBismillah(surahNum) {
    const el = document.getElementById('bismillahEl');
    if (!el) return;
    el.style.display = (surahNum !== 1 && surahNum !== 9) ? 'block' : 'none';
  }

  /* ── SURAH NAV (prev/next) ── */
  function renderSurahNav(surahNum) {
    const wrap = document.getElementById('surahNav');
    if (!wrap) return;

    const prev = SURAH_DATA.find(s => s[0] === surahNum - 1);
    const next = SURAH_DATA.find(s => s[0] === surahNum + 1);

    wrap.innerHTML = `
      ${prev
        ? `<a class="surah-nav-btn prev" href="./surah.html?n=${prev[0]}" aria-label="Surah sebelumnya: ${prev[1]}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            <div><span class="surah-nav-label">Sebelumnya</span><span class="surah-nav-name">${prev[1]}</span></div>
           </a>`
        : '<div></div>'}
      ${next
        ? `<a class="surah-nav-btn next" href="./surah.html?n=${next[0]}" aria-label="Surah berikutnya: ${next[1]}">
            <div><span class="surah-nav-label">Berikutnya</span><span class="surah-nav-name">${next[1]}</span></div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
           </a>`
        : '<div></div>'}
    `;
  }

  /* ── THEME ── */
  function initTheme() {
    const saved = localStorage.getItem('qk-theme');
    if (saved === 'light') _applyLight();
    else _applyDark();
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains('light');
    if (isLight) _applyDark();
    else _applyLight();
  }

  function _applyDark() {
    document.body.classList.remove('light');
    _setThemeIcon(false);
    _setThemeColor('#150F0B');
    localStorage.setItem('qk-theme', 'dark');
  }

  function _applyLight() {
    document.body.classList.add('light');
    _setThemeIcon(true);
    _setThemeColor('#FFF9EE');
    localStorage.setItem('qk-theme', 'light');
  }

  function _setThemeIcon(isLight) {
    const moon = document.getElementById('iMoon');
    const sun  = document.getElementById('iSun');
    if (moon) moon.style.display = isLight ? 'none'  : 'block';
    if (sun)  sun.style.display  = isLight ? 'block' : 'none';
  }

  function _setThemeColor(color) {
    const meta = document.getElementById('themeColor');
    if (meta) meta.content = color;
  }

  /* ── SCROLL EFFECT (top bar) ── */
  function initScrollEffect() {
    const bar = document.getElementById('topBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      bar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  return {
    renderGrid, renderAyat,
    showLoading, showError,
    showPlayer, hidePlayer, updatePlayerInfo,
    updateSurahHeader, toggleBismillah, renderSurahNav,
    initTheme, toggleTheme, initScrollEffect
  };
})();
