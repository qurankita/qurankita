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
  function renderAyat(ayat, surahName) {
    const wrap = document.getElementById('ayatWrap');
    if (!wrap) return;
    wrap.innerHTML = ayat.map(a => `
      <div class="ayat-row" id="ayat-${a.num}">
        <div class="ayat-num-wrap">
          <div class="ayat-num" aria-label="Ayat ${a.num}">${a.num}</div>
          <button class="share-btn" onclick="shareAyat(${a.num})" aria-label="Bagikan ayat ${a.num}" title="Bagikan ayat ini">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
        <div class="ayat-arabic" dir="rtl" lang="ar">${a.arabic}</div>
        <div class="ayat-div" role="separator"></div>
        <div class="ayat-terj" lang="id">${a.terjemah}</div>
      </div>`).join('');
  }

  /* ── SHARE MODAL ── */
  function showShareModal(ayat, surahName) {
    // Hapus modal lama jika ada
    document.getElementById('shareModal')?.remove();

    const text = buildShareText(ayat, surahName);
    const encoded = encodeURIComponent(text);

    const modal = document.createElement('div');
    modal.id = 'shareModal';
    modal.className = 'share-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Bagikan ayat');
    modal.innerHTML = `
      <div class="share-modal-backdrop" onclick="closeShareModal()"></div>
      <div class="share-modal-box">
        <div class="share-modal-header">
          <span class="share-modal-title">Bagikan Ayat</span>
          <button class="share-modal-close" onclick="closeShareModal()" aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="share-preview">${text.replace(/\n/g, '<br>')}</div>
        <div class="share-actions">
          <button class="share-action-btn whatsapp" onclick="shareToWhatsapp('${encoded}')" aria-label="Bagikan ke WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
          <button class="share-action-btn twitter" onclick="shareToX('${encoded}')" aria-label="Bagikan ke X">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            X (Twitter)
          </button>
          <button class="share-action-btn copy" onclick="copyAyat('${encoded}')" id="btnCopy" aria-label="Salin teks">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Salin Teks
          </button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('open'));
  }

  function buildShareText(ayat, surahName) {
    return `🌙 ﷽\n\n${ayat.arabic}\n\n✨ ${ayat.terjemah}\n\n📖 QS. ${surahName} : ${ayat.num}\n🔗 QuranKita.id`;
  }

  return {
    renderGrid, renderAyat,
    showLoading, showError,
    showPlayer, hidePlayer, updatePlayerInfo,
    updateSurahHeader, toggleBismillah, renderSurahNav,
    initTheme, toggleTheme, initScrollEffect,
    showShareModal, buildShareText
  };

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
