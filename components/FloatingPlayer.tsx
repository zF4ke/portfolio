import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import Player from "./Player";
import styles from "./FloatingPlayer.module.css";

export default function FloatingPlayer({ songs }: { songs: { name: string; url: string }[] }) {
  const [minimized, setMinimized] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [panelHeight, setPanelHeight] = useState<number>();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const animationTimerRef = useRef<number>();
  const closeTimerRef = useRef<number>();
  const pointerInsideRef = useRef(false);
  const keyboardRef = useRef(false);
  const measuredRef = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    const animationTimer = animationTimerRef;
    const closeTimer = closeTimerRef;
    if (!panel) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize || panel.offsetHeight;
      if (!height) return;
      setPanelHeight(height + 2);
      if (measuredRef.current) {
        setAnimating(true);
        window.clearTimeout(animationTimer.current);
        animationTimer.current = window.setTimeout(() => setAnimating(false), 480);
      }
      measuredRef.current = true;
    });
    observer.observe(panel);
    return () => {
      observer.disconnect();
      window.clearTimeout(animationTimer.current);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  function setCompact(compact: boolean) {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(animationTimerRef.current);
    const restoreFocus = panelRef.current?.contains(document.activeElement);
    setAnimating(true);
    setMinimized(compact);
    animationTimerRef.current = window.setTimeout(() => setAnimating(false), 480);
    window.requestAnimationFrame(() => {
      if (compact && restoreFocus && launcherRef.current?.getAttribute("aria-hidden") === "false") {
        launcherRef.current.focus({ preventScroll: true });
      } else if (!compact && panelRef.current?.getAttribute("aria-hidden") === "false") {
        panelRef.current.querySelector<HTMLButtonElement>('button[aria-label="Play music"], button[aria-label="Pause music"], button[aria-label="Cancel playback"]')?.focus({ preventScroll: true });
      }
    });
  }

  function scheduleClose() {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      if (pointerInsideRef.current || (keyboardRef.current && panelRef.current?.contains(document.activeElement))) return;
      setCompact(true);
    }, 700);
  }

  return (
    <div className={`${styles.dock} hidden md:block`} data-minimized={minimized} data-animating={animating} data-ready={panelHeight !== undefined} style={{ "--player-height": panelHeight ? `${panelHeight}px` : "auto" } as CSSProperties}
      onPointerEnter={() => { pointerInsideRef.current = true; window.clearTimeout(closeTimerRef.current); }}
      onPointerLeave={() => { pointerInsideRef.current = false; if (!minimized) scheduleClose(); }}
      onPointerDownCapture={() => { keyboardRef.current = false; }}
      onFocusCapture={() => window.clearTimeout(closeTimerRef.current)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !pointerInsideRef.current && !minimized) scheduleClose(); }}
      onKeyDownCapture={() => { keyboardRef.current = true; }}
      onKeyDown={(event) => { if (event.key === "Escape" && !event.defaultPrevented && !minimized) { event.preventDefault(); setCompact(true); } }}
    >
      <div ref={(node) => {
        panelRef.current = node;
        if (node) node.inert = minimized;
      }} id={panelId} className={styles.panel} aria-hidden={minimized}>
        <Player songs={songs} onPlaybackChange={setIsPlaying} />
      </div>
      <button ref={launcherRef} type="button" className={styles.launcher} data-playing={isPlaying} onClick={() => setCompact(false)} aria-label="Open music player" title={isPlaying ? "Open music player (playing)" : "Open music player"} aria-controls={panelId} aria-expanded={!minimized} aria-hidden={!minimized} tabIndex={minimized ? 0 : -1}>
        <span className={styles.waveform} aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
        </span>
        <MusicalNoteIcon className={styles.note} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
