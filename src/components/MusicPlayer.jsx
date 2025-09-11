import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { musicPlaylist } from '../utils/musicData';
import { useTheme } from '../contexts/ThemeContext';

const MusicPlayer = () => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  // Charger l'API YouTube
  useEffect(() => {
    // Vérifier si l'API YouTube est déjà chargée
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Charger l'API YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Callback global pour l'API YouTube
    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const initializePlayer = () => {
    if (!window.YT || !window.YT.Player) return;

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: musicPlaylist[0].youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          setIsPlayerReady(true);
          playerRef.current.setVolume(volume);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            nextTrack();
          }
        }
      }
    });
  };

  const togglePlay = () => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % musicPlaylist.length;
    setCurrentTrack(nextIndex);
    loadTrack(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? musicPlaylist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    loadTrack(prevIndex);
  };

  const loadTrack = (trackIndex) => {
    if (!isPlayerReady || !playerRef.current) return;

    const track = musicPlaylist[trackIndex];
    playerRef.current.loadVideoById(track.youtubeId);
    
    if (isPlaying) {
      setTimeout(() => {
        playerRef.current.playVideo();
      }, 100);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (isPlayerReady && playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(50);
    } else {
      handleVolumeChange(0);
    }
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    loadTrack(index);
    setIsExpanded(false);
  };

  const currentSong = musicPlaylist[currentTrack];

  return (
    <>
      {/* YouTube Player caché */}
      <div id="youtube-player" style={{ display: 'none' }}></div>

      {/* Lecteur de musique */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`position-fixed bottom-0 start-0 end-0 ${isDark ? 'bg-dark text-white' : 'bg-light text-dark border-top'} shadow-lg`}
        style={{ zIndex: 1030 }}
      >
        {/* Playlist étendue */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`border-bottom ${isDark ? 'border-secondary' : 'border-light-subtle'}`}
            >
              <div className="container py-3">
                <h6 className="text-primary mb-3">
                  <Music size={16} className="me-2" />
                  Playlist World Explorer
                </h6>
                <div className="row g-2">
                  {musicPlaylist.map((track, index) => (
                    <div key={track.id} className="col-12">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectTrack(index)}
                        className={`btn w-100 text-start p-2 ${
                          index === currentTrack 
                            ? 'btn-primary' 
                            : isDark ? 'btn-outline-secondary' : 'btn-outline-dark'
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-3 text-muted">{index + 1}</span>
                          <div className="flex-grow-1">
                            <div className="fw-medium">{track.title}</div>
                            <small className={`${isDark ? 'text-muted' : 'text-secondary'}`}>{track.artist} • {track.duration}</small>
                          </div>
                          {index === currentTrack && isPlaying && (
                            <div className="text-primary">
                              <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="visually-hidden">En cours...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contrôles principaux */}
        <div className="container py-3">
          <div className="row align-items-center">
            {/* Informations de la piste */}
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded p-2 me-3">
                  <Music size={20} />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-medium text-truncate">{currentSong.title}</div>
                  <small className="text-muted">{currentSong.artist}</small>
                </div>
              </div>
            </div>

            {/* Contrôles de lecture */}
            <div className="col-md-4 text-center">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTrack}
                  className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-circle`}
                  style={{ width: '40px', height: '40px' }}
                >
                  <SkipBack size={16} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  disabled={!isPlayerReady}
                  className="btn btn-primary rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTrack}
                  className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm rounded-circle`}
                  style={{ width: '40px', height: '40px' }}
                >
                  <SkipForward size={16} />
                </motion.button>
              </div>
            </div>

            {/* Contrôles volume et playlist */}
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-end gap-3">
                {/* Volume */}
                <div className="d-flex align-items-center">
                  <button
                    onClick={toggleMute}
                    className={`btn btn-link ${isDark ? 'text-light' : 'text-dark'} p-1`}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="form-range"
                    style={{ width: '80px' }}
                  />
                </div>

                {/* Toggle playlist */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-dark'} btn-sm`}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
