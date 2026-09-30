import { SpeakerWaveIcon as VolumeDownIcon } from "@heroicons/react/24/outline";
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, SpeakerWaveIcon as VolumeUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Player.module.css";

const DEFAULT_VOLUME = 0.18;

function formatTime(seconds) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

function sliderFill(percent) {
  return { background: `linear-gradient(to right, #8b91fb ${percent}%, rgba(255,255,255,0.12) ${percent}%)` };
}

/** @param {{ songs: { name: string, url: string }[], onPlaybackChange?: (playing: boolean) => void }} props */
const Player = ({ songs, onPlaybackChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songList, setSongList] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [error, setError] = useState("");
  const audioPlayerRef = useRef(null);
  const playRequestRef = useRef(0);
  const volumeHideTimerRef = useRef(null);
  const isAdjustingVolumeRef = useRef(false);
  const isVolumeKeyboardRef = useRef(false);
  const volumePanelRef = useRef(null);
  const lastVolumeControlRef = useRef(null);
  const volumeId = useId();
  const volumePercent = Math.round(volume * 100);

  useEffect(() => {
    onPlaybackChange?.(isPlaying);
  }, [isPlaying, onPlaybackChange]);

  useEffect(() => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSongList(shuffled);
  }, [songs]);

  useEffect(() => {
    if (audioPlayerRef.current) audioPlayerRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
      return;
    }
    const timer = window.setTimeout(() => setShowLoading(true), 300);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const audio = audioPlayerRef.current;
    const requests = playRequestRef;
    const volumeTimer = volumeHideTimerRef;
    return () => {
      requests.current++;
      window.clearTimeout(volumeTimer.current);
      audio?.pause();
    };
  }, []);

  const playAudio = async () => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    const request = ++playRequestRef.current;
    setError("");
    setIsLoading(true);
    try {
      await audio.play();
    } catch {
      if (request === playRequestRef.current) {
        setIsPlaying(false);
        setError("Couldn't play this track. Try the next one.");
      }
    } finally {
      if (request === playRequestRef.current) setIsLoading(false);
    }
  };

  const start = (index) => {
    const song = songList[index];
    const audio = audioPlayerRef.current;
    if (!song || !audio) return;
    setCurrentSongIndex(index);
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(0);
    audio.src = song.url;
    audio.volume = volume;
    playAudio();
  };

  const playSong = () => currentSong ? playAudio() : start(currentSongIndex);
  const playPreviousSong = () => start((currentSongIndex - 1 + songList.length) % songList.length);
  const playNextSong = () => start((currentSongIndex + 1) % songList.length);

  const pauseSong = () => {
    playRequestRef.current++;
    audioPlayerRef.current?.pause();
    setIsPlaying(false);
    setIsLoading(false);
  };

  const hideVolume = () => {
    if (volumePanelRef.current?.contains(document.activeElement)) {
      const lastControl = lastVolumeControlRef.current;
      const target = lastControl?.disabled
        ? lastControl.parentElement?.querySelector("button[data-volume-control]:not(:disabled)")
        : lastControl;
      target?.focus({ preventScroll: true });
    }
    setShowVolume(false);
  };

  const scheduleVolumeHide = () => {
    window.clearTimeout(volumeHideTimerRef.current);
    volumeHideTimerRef.current = window.setTimeout(() => {
      const focused = document.activeElement;
      const sliderFocused = volumePanelRef.current?.contains(focused);
      if (isAdjustingVolumeRef.current || (sliderFocused && isVolumeKeyboardRef.current)) return;
      hideVolume();
    }, 600);
  };

  const revealVolume = () => {
    setShowVolume(true);
    scheduleVolumeHide();
  };

  const rememberVolumeControl = (event) => {
    lastVolumeControlRef.current = event.currentTarget;
    isVolumeKeyboardRef.current = event.currentTarget.matches(":focus-visible");
    revealVolume();
  };

  const changeVolume = (delta, event) => {
    lastVolumeControlRef.current = event.currentTarget;
    isVolumeKeyboardRef.current = event.detail === 0;
    setVolume((value) => Math.min(1, Math.max(0, Math.round((value + delta) * 100) / 100)));
    revealVolume();
  };

  const updateTime = () => {
    const audio = audioPlayerRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0);
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const active = isPlaying || isLoading;

  return (
    <section aria-label="Music player" className="relative w-52 select-none">
        <div className="mb-2.5">
          <p key={currentSong?.url || "idle"} className={`${styles.track} truncate text-center font-jetbrains text-[11px] text-zinc-400`} title={currentSong?.name} aria-live="polite" aria-atomic="true">{currentSong?.name || "Press play to listen"}</p>
          <input type="range" min="0" max={duration || 1} step="1" value={Math.min(currentTime, duration)} disabled={!duration} aria-label="Playback position" aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`} onChange={(event) => {
            const time = Number(event.target.value);
            if (audioPlayerRef.current) audioPlayerRef.current.currentTime = time;
            setCurrentTime(time);
          }} className={`${styles.slider} mt-2 w-full`} style={sliderFill(duration ? (currentTime / duration) * 100 : 0)} />
          <div className={`mt-1 flex justify-between font-jetbrains text-[10px] text-zinc-500 ${currentSong ? "" : "invisible"}`} aria-hidden="true">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      <div role="group" aria-label="Playback controls" className="flex items-center justify-center gap-1 text-accent-400">
        <button type="button" data-volume-control className={`${styles.control} ${styles.volumeControl}`} onClick={(event) => changeVolume(-0.1, event)} onPointerDown={() => { isVolumeKeyboardRef.current = false; }} onFocus={rememberVolumeControl} onPointerLeave={scheduleVolumeHide} onBlur={scheduleVolumeHide} disabled={volumePercent === 0} aria-label="Decrease volume" title="Decrease volume">
          <VolumeDownIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" className={styles.control} onClick={playPreviousSong} disabled={!songList.length} aria-label="Previous track" title="Previous track">
          <BackwardIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button type="button" className={styles.control} onClick={active ? pauseSong : playSong} disabled={!songList.length} aria-label={isLoading ? "Cancel playback" : isPlaying ? "Pause music" : "Play music"} title={active ? "Pause" : "Play"}>
          {showLoading ? <span className={styles.spinner} aria-hidden="true" /> : active ? <PauseIcon className="h-8 w-8" aria-hidden="true" /> : <PlayIcon className="h-8 w-8" aria-hidden="true" />}
        </button>
        <button type="button" className={styles.control} onClick={playNextSong} disabled={!songList.length} aria-label="Next track" title="Next track">
          <ForwardIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button type="button" data-volume-control className={`${styles.control} ${styles.volumeControl}`} onClick={(event) => changeVolume(0.1, event)} onPointerDown={() => { isVolumeKeyboardRef.current = false; }} onFocus={rememberVolumeControl} onPointerLeave={scheduleVolumeHide} onBlur={scheduleVolumeHide} disabled={volumePercent === 100} aria-label="Increase volume" title="Increase volume">
          <VolumeUpIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div ref={(node) => {
        volumePanelRef.current = node;
        if (node) node.inert = !showVolume;
      }} className={styles.volumeReveal} data-open={showVolume} aria-hidden={!showVolume}>
        <div className={styles.volumeInner} onPointerEnter={revealVolume} onPointerLeave={scheduleVolumeHide}>
          <label htmlFor={volumeId} className="font-jetbrains text-[11px] text-zinc-400">
            Volume <output aria-live="polite" aria-atomic="true">{volumePercent === 0 ? "muted" : `${volumePercent}%`}</output>
          </label>
          <input
            id={volumeId}
            type="range"
            min="0"
            max="100"
            step="1"
            value={volumePercent}
            onChange={(event) => { setVolume(Number(event.target.value) / 100); revealVolume(); }}
            onFocus={(event) => { isVolumeKeyboardRef.current = event.currentTarget.matches(":focus-visible"); revealVolume(); }}
            onBlur={scheduleVolumeHide}
            onPointerDown={() => { isVolumeKeyboardRef.current = false; isAdjustingVolumeRef.current = true; revealVolume(); }}
            onPointerUp={() => { isAdjustingVolumeRef.current = false; scheduleVolumeHide(); }}
            onPointerCancel={() => { isAdjustingVolumeRef.current = false; scheduleVolumeHide(); }}
            onKeyDown={(event) => {
              if (event.key === "Escape") { event.preventDefault(); hideVolume(); }
              else { isVolumeKeyboardRef.current = true; revealVolume(); }
            }}
            aria-label="Volume"
            aria-valuetext={volumePercent === 0 ? "Muted" : `${volumePercent}%`}
            className={`${styles.slider} w-36`}
            style={sliderFill(volumePercent)}
          />
        </div>
      </div>

      <audio
        ref={audioPlayerRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => { setIsPlaying(false); setIsLoading(false); }}
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => { if (!audioPlayerRef.current?.paused) setIsLoading(true); }}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
        onDurationChange={updateTime}
        onEnded={playNextSong}
        onError={() => {
          setIsPlaying(false);
          setIsLoading(false);
          setError("This track couldn't be loaded. Try another track.");
        }}
      />

      <p role="status" className="sr-only">{showLoading ? "Loading track..." : ""}</p>
      {error && <p role="alert" className="mt-2 text-center text-xs text-zinc-400">{error}</p>}
    </section>
  );
};

export default Player;
