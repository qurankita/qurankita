/* ============================================
   QURAN KITA — Audio Engine
   js/audio.js
   ============================================ */

'use strict';

const AudioPlayer = (() => {
  const audio = new Audio();
  audio.crossOrigin = 'anonymous';

  let _surahNum = null;
  let _qariId   = 'mishary';
  let _playing  = false;
  let _paused   = false;

  /* ── INTERNAL ── */
  function _updateProgress() {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    const fill = document.getElementById('pFill');
    const cur  = document.getElementById('pCur');
    const dur  = document.getElementById('pDur');
    if (fill) fill.style.width = pct + '%';
    if (cur)  cur.textContent  = _fmt(audio.currentTime);
    if (dur)  dur.textContent  = _fmt(audio.duration);
  }

  function _fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  function _setupMediaSession(surah) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title:  surah[1],
      artist: surah[3] + ' · ' + surah[4],
      album:  'QuranKita.id — Quran Terjemah Suara'
    });
    navigator.mediaSession.setActionHandler('play',  () => resume());
    navigator.mediaSession.setActionHandler('pause', () => pause());
  }

  function _updatePlayBtn(playing) {
    const iPlay  = document.getElementById('iPlay');
    const iPause = document.getElementById('iPause');
    if (iPlay)  iPlay.style.display  = playing ? 'none'  : 'block';
    if (iPause) iPause.style.display = playing ? 'block' : 'none';
  }

  /* ── PUBLIC API ── */
  function load(surahNum, qariId) {
    _surahNum = surahNum;
    _qariId   = qariId || _qariId;
    _playing  = false;
    _paused   = false;

    const url = getAudioUrl(_qariId, _surahNum);
    audio.src = url;
    audio.load();

    const surah = getSurah(surahNum);
    if (surah) _setupMediaSession(surah);
  }

  function play(surahNum, qariId) {
    if (surahNum && surahNum !== _surahNum) {
      load(surahNum, qariId);
    } else if (qariId && qariId !== _qariId) {
      const time = audio.currentTime;
      load(_surahNum, qariId);
      audio.currentTime = time;
    }
    audio.play().then(() => {
      _playing = true;
      _paused  = false;
      _updatePlayBtn(true);
    }).catch(console.warn);
  }

  function pause() {
    audio.pause();
    _playing = false;
    _paused  = true;
    _updatePlayBtn(false);
  }

  function resume() {
    audio.play().then(() => {
      _playing = true;
      _paused  = false;
      _updatePlayBtn(true);
    }).catch(console.warn);
  }

  function toggle() {
    if (_playing && !_paused) pause();
    else if (_paused) resume();
    else if (_surahNum) play(_surahNum, _qariId);
  }

  function stop() {
    audio.pause();
    audio.src = '';
    _playing  = false;
    _paused   = false;
    _surahNum = null;
    _updatePlayBtn(false);
    const fill = document.getElementById('pFill');
    const cur  = document.getElementById('pCur');
    const dur  = document.getElementById('pDur');
    if (fill) fill.style.width  = '0%';
    if (cur)  cur.textContent   = '0:00';
    if (dur)  dur.textContent   = '0:00';
  }

  function seek(e) {
    if (!audio.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  }

  function setVolume(v) { audio.volume = v; }
  function isPlaying()  { return _playing && !_paused; }
  function getQari()    { return _qariId; }
  function getSurahNum(){ return _surahNum; }

  function onEnded(cb)  { audio.addEventListener('ended', cb); }
  function onError(cb)  { audio.addEventListener('error', cb); }

  /* ── PROGRESS TRACKING ── */
  audio.addEventListener('timeupdate', _updateProgress);

  return { load, play, pause, resume, toggle, stop, seek, setVolume, isPlaying, getQari, getSurahNum, onEnded, onError };
})();
