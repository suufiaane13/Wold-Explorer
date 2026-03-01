import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { currentTrack } from '../utils/musicData';
import { useTheme } from '../contexts/ThemeContext';

const fmt = (s) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const a = ref.current;
    if (!a || !currentTrack?.src) return;
    a.src = currentTrack.src;
    a.volume = muted ? 0 : vol;
    a.loop = true;
    a.load();
  }, []);

  useEffect(() => { if (ref.current) ref.current.volume = muted ? 0 : vol; }, [vol, muted]);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    if (playing && ready) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, ready]);

  const toggle = () => {
    const a = ref.current;
    if (!a || !currentTrack?.src) return;
    if (playing) { a.pause(); setPlaying(false); }
    else a.play().then(() => { setPlaying(true); setError(false); }).catch(() => { setPlaying(false); setError(true); });
  };

  const onVolume = (v) => { const n = v / 100; setVol(n); setMuted(n === 0); };
  const toggleMute = () => muted ? onVolume(50) : onVolume(0);

  const seek = (e) => {
    const a = ref.current;
    if (!a || !Number.isFinite(a.duration)) return;
    const t = (Number(e.target.value) / 1000) * a.duration;
    a.currentTime = t;
    setTime(t);
  };

  const pct = dur > 0 ? Math.min(1000, (time / dur) * 1000) : 0;

  if (!currentTrack?.src) return null;

  const c = isDark ? 'text-white-50' : 'text-muted';

  return (
    <>
      <audio
        ref={ref}
        preload="metadata"
        loop
        onCanPlay={() => { setReady(true); setError(false); }}
        onError={() => { setReady(false); setError(true); }}
        onTimeUpdate={() => ref.current && setTime(ref.current.currentTime)}
        onLoadedMetadata={() => ref.current && setDur(ref.current.duration)}
        onDurationChange={() => ref.current && setDur(ref.current.duration)}
      />

      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className={`mp-bar ${isDark ? 'mp-dark' : 'mp-light'}`}
      >
        {/* ===== DESKTOP (≥768) : 1 ligne ===== */}
        <div className="mp-desktop">
          {/* Piste */}
          <div className="mp-track">
            <div className={`mp-icon ${isDark ? 'mp-icon-dark' : ''}`}>
              <Music size={16} className="text-primary" />
            </div>
            <div className="mp-meta">
              <span className="mp-title">{currentTrack.title}</span>
              <span className={`mp-artist ${c}`}>{currentTrack.artist}</span>
              {error && <span className="mp-error">Introuvable</span>}
            </div>
          </div>

          {/* Play/Pause */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            disabled={!currentTrack.src}
            className="mp-play"
            aria-label={playing ? 'Pause' : 'Lecture'}
          >
            {playing ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
          </motion.button>

          {/* Volume + Progress */}
          <div className="mp-right">
            <button type="button" onClick={toggleMute} className={`mp-vol-btn ${isDark ? 'text-light' : 'text-dark'}`} aria-label="Volume">
              {muted || vol === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input type="range" min="0" max="100" value={Math.round(vol * 100)} onChange={e => onVolume(+e.target.value)} className="mp-vol-range" aria-label="Volume" />

            <span className={`mp-time ${c}`}>{fmt(time)}</span>
            <input type="range" min="0" max="1000" step="1" value={pct} onChange={seek} className="mp-progress" aria-label="Position" />
            <span className={`mp-time ${c}`}>{fmt(dur)}</span>
          </div>
        </div>

        {/* ===== MOBILE (<768) : 2 lignes ===== */}
        <div className="mp-mobile">
          {/* Ligne 1 : piste + play + volume */}
          <div className="mp-mob-row1">
            <div className="mp-track">
              <div className={`mp-icon ${isDark ? 'mp-icon-dark' : ''}`}>
                <Music size={16} className="text-primary" />
              </div>
              <div className="mp-meta">
                <span className="mp-title">{currentTrack.title}</span>
                <span className={`mp-artist ${c}`}>{currentTrack.artist}</span>
                {error && <span className="mp-error">Introuvable</span>}
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              disabled={!currentTrack.src}
              className="mp-play mp-play-mob"
              aria-label={playing ? 'Pause' : 'Lecture'}
            >
              {playing ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
            </motion.button>

            <div className="mp-mob-vol">
              <button type="button" onClick={toggleMute} className={`mp-vol-btn ${isDark ? 'text-light' : 'text-dark'}`} aria-label="Volume">
                {muted || vol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input type="range" min="0" max="100" value={Math.round(vol * 100)} onChange={e => onVolume(+e.target.value)} className="mp-vol-range mp-vol-mob" aria-label="Volume" />
            </div>
          </div>

          {/* Ligne 2 : barre de progression pleine largeur */}
          <div className="mp-mob-row2">
            <span className={`mp-time ${c}`}>{fmt(time)}</span>
            <input type="range" min="0" max="1000" step="1" value={pct} onChange={seek} className="mp-progress mp-progress-mob" aria-label="Position" />
            <span className={`mp-time ${c}`}>{fmt(dur)}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;