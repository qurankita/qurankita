/* ============================================
   QURAN KITA — App Controller
   js/app.js
   ============================================ */

'use strict';

/* ── INIT HOME PAGE ── */
function initHome() {
  UI.initTheme();
  UI.initScrollEffect();
  UI.renderGrid(SURAH_DATA);

  const inp = document.getElementById('searchInp');
  if (inp) {
    inp.addEventListener('input', () => {
      const q = inp.value.toLowerCase().trim();
      if (!q) { UI.renderGrid(SURAH_DATA); return; }
      const filtered = SURAH_DATA.filter(([n, id, ar, , , arti]) =>
        id.toLowerCase().includes(q) ||
        ar.includes(q) ||
        arti.toLowerCase().includes(q) ||
        String(n).includes(q)
      );
      UI.renderGrid(filtered);
    });
  }

  // Scroll to surah list
  const btnList = document.getElementById('btnSurahList');
  if (btnList) {
    btnList.addEventListener('click', () => {
      document.getElementById('surahSection')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ── INIT SURAH PAGE ── */
async function initSurah() {
  UI.initTheme();
  UI.initScrollEffect();

  // Ambil nomor surah dari URL ?n=1
  const params    = new URLSearchParams(window.location.search);
  const surahNum  = parseInt(params.get('n')) || 1;
  const surah     = getSurah(surahNum);

  if (!surah) {
    window.location.href = './index.html';
    return;
  }

  // Render header & bismillah
  UI.updateSurahHeader(surah);
  UI.toggleBismillah(surahNum);
  UI.renderSurahNav(surahNum);

  // Set judul halaman
  document.title = `${surah[1]} — QuranKita.id`;

  // Isi dropdown qari
  const qariSel = document.getElementById('qariSel');

  // Load ayat dari API
  UI.showLoading('ayatWrap', 'Memuat ayat…');
  try {
    const res  = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-uthmani,id.indonesian`
    );
    const { data } = await res.json();
    const [arabEd, terjEd] = data;

    const ayat = arabEd.ayahs.map((a, i) => {
      let arabic   = a.text;
      let terjemah = terjEd.ayahs[i].text;
      // Hapus bismillah di ayat 1 (kecuali Al-Fatihah & At-Taubah)
     if (surahNum !== 1 && surahNum !== 9 && a.numberInSurah === 1) {
  // Hapus semua variasi bismillah di awal teks Arab
  arabic = arabic.replace(/^[\u0600-\u06FF\s\u064B-\u065F]+?(?=[\u0627\u0623\u0625\u0644\u0628\u062A\u062C\u062D])/u, '');
  arabic = arabic.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ.{10,40}يمِ\s*/u, '');
  arabic = arabic.trim();
  // Hapus bismillah terjemah
  terjemah = terjemah.replace(
    /^Dengan nama Allah[^\.]*\.\s*/i, ''
  );
  terjemah = terjemah.trim();
}
      return { num: a.numberInSurah, arabic, terjemah };
    });

    // Simpan untuk fungsi share
    _shareAyatList = ayat;
    _shareSurahName = surah[1];

    UI.renderAyat(ayat, surah[1]);
  } catch {
    UI.showError('ayatWrap', 'Gagal memuat ayat. Periksa koneksi internet Anda.');
    return;
  }

  /* ── PLAYER SETUP ── */
  function getSelectedQari() {
    return qariSel ? qariSel.value : 'mishary';
  }

  function getQariName() {
    const q = QARI_LIST.find(q => q.id === getSelectedQari());
    return q ? q.name : '';
  }

  // Tombol Putar
  const btnPlay = document.getElementById('btnPutar');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      AudioPlayer.play(surahNum, getSelectedQari());
      UI.showPlayer(surah, getQariName());
    });
  }

  // Ganti qari
  if (qariSel) {
    qariSel.addEventListener('change', () => {
      if (AudioPlayer.isPlaying()) {
        AudioPlayer.play(surahNum, getSelectedQari());
        UI.updatePlayerInfo(surah, getQariName());
      }
    });
  }

  // Play/Pause di player bar
  const btnPlayBar = document.getElementById('btnPlay');
  if (btnPlayBar) {
    btnPlayBar.addEventListener('click', () => {
      if (AudioPlayer.isPlaying()) {
        AudioPlayer.pause();
      } else {
        AudioPlayer.play(surahNum, getSelectedQari());
        UI.showPlayer(surah, getQariName());
      }
    });
  }

  // Seek
  const pTrack = document.getElementById('pTrack');
  if (pTrack) {
    pTrack.addEventListener('click', (e) => AudioPlayer.seek(e));
  }

  // Volume
  const volSlider = document.getElementById('volSlider');
  if (volSlider) {
    volSlider.addEventListener('input', () => {
      AudioPlayer.setVolume(parseFloat(volSlider.value));
    });
  }

  // Audio selesai
  AudioPlayer.onEnded(() => {
    const nextSurah = getSurah(surahNum + 1);
    if (nextSurah) {
      // Auto lanjut ke surah berikutnya
      window.location.href = `./surah.html?n=${surahNum + 1}&autoplay=1`;
    }
  });

  // Autoplay jika dari navigasi otomatis
  const autoplay = params.get('autoplay');
  if (autoplay === '1') {
    AudioPlayer.play(surahNum, getSelectedQari());
    UI.showPlayer(surah, getQariName());
  }

  // Theme toggle
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => UI.toggleTheme());
  }
}

/* ── THEME TOGGLE (Home) ── */
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => UI.toggleTheme());
}

/* ── SHARE FUNCTIONS (global, dipanggil dari HTML) ── */
let _shareAyatList = [];
let _shareSurahName = '';

function shareAyat(num) {
  const ayat = _shareAyatList.find(a => a.num === num);
  if (!ayat) return;
  UI.showShareModal(ayat, _shareSurahName);
}

function closeShareModal() {
  const modal = document.getElementById('shareModal');
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => modal.remove(), 250);
}

function shareToWhatsapp(encoded) {
  window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener');
}

function shareToX(encoded) {
  window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank', 'noopener');
}

function copyAyat(encoded) {
  const text = decodeURIComponent(encoded);
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btnCopy');
    if (!btn) return;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      Tersalin!`;
    btn.style.background = 'var(--md-sys-color-tertiary-container)';
    btn.style.color = 'var(--md-sys-color-on-tertiary-container)';
    setTimeout(() => closeShareModal(), 1200);
  }).catch(() => {
    // Fallback untuk browser lama
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    closeShareModal();
  });
}
