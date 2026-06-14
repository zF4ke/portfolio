import { SpeakerWaveIcon as VolumeDownIcon } from "@heroicons/react/24/outline";
import {
  BackwardIcon as RewindIcon,
  ForwardIcon as FastForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon as VolumeUpIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.3;

const Player = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songList, setSongList] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const audioPlayerRef = useRef();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    setSongList(shuffleArray([...props.songs]));
  }, [props.songs]);

  // keep it quiet by default, never blast on first play
  useEffect(() => {
    if (audioPlayerRef.current) audioPlayerRef.current.volume = volume;
  }, [volume]);

  const start = (index) => {
    const song = songList[index];
    if (!song) return;
    audioPlayerRef.current.src = `./musics/${song}`;
    audioPlayerRef.current.volume = volume;
    audioPlayerRef.current.play();
    setCurrentSongIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playSong = () => {
    if (currentSong) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    } else {
      start(currentSongIndex);
    }
  };

  const playPreviousSong = () =>
    start(currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1);

  const playNextSong = () =>
    start(currentSongIndex === songList.length - 1 ? 0 : currentSongIndex + 1);

  const pauseSong = () => {
    audioPlayerRef.current.pause();
    setIsPlaying(false);
  };

  const changeVolume = (delta) => {
    setVolume((v) => Math.min(1, Math.max(0, Math.round((v + delta) * 100) / 100)));
  };

  const updateSeekBar = () => {
    const a = audioPlayerRef.current;
    if (a && a.duration) setCurrentTime((a.currentTime / a.duration) * 100);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-2" title={`volume ${Math.round(volume * 100)}%`}>
        <VolumeDownIcon
          className="player-volume-button stroke-purple"
          onClick={() => changeVolume(-0.1)}
          role="button"
          aria-label="Volume down"
        />
        <RewindIcon className="player-button fill-purple" onClick={playPreviousSong} role="button" aria-label="Previous" />
        {!isPlaying ? (
          <PlayIcon className="player-button fill-purple" onClick={playSong} role="button" aria-label="Play" />
        ) : (
          <PauseIcon className="player-button fill-purple" onClick={pauseSong} role="button" aria-label="Pause" />
        )}
        <FastForwardIcon className="player-button fill-purple" onClick={playNextSong} role="button" aria-label="Next" />
        <VolumeUpIcon
          className="player-volume-button fill-purple"
          onClick={() => changeVolume(0.1)}
          role="button"
          aria-label="Volume up"
        />
      </div>

      <audio ref={audioPlayerRef} src="" onTimeUpdate={updateSeekBar} onEnded={playNextSong}></audio>

      {currentSong && (
        <>
          <div className="mt-2.5 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-purple transition-[width] duration-150 ease-out"
              style={{ width: (currentTime || 0) + "%" }}
            ></div>
          </div>
          <p className="mt-2 max-w-[12rem] truncate text-center font-jetbrains text-[11px] text-zinc-500">
            {currentSong.replace(/\.mp3$/i, "").replace(/_/g, " ")}
          </p>
        </>
      )}
    </div>
  );
};

export default Player;
