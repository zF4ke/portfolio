import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

import { useEffect, useRef, useState } from "react";

const Player = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songList, setSongList] = useState([]);

  const [currentTime, setCurrentTime] = useState(null);

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
    const array = shuffleArray(props.songs);

    setSongList(array);
  }, [props.songs]);

  const playSong = () => {
    const song = songList[currentSongIndex];

    audioPlayerRef.current.src = `./musics/${song}`;
    audioPlayerRef.current.play();

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    if (currentSongIndex == 0) {
      var index = songList.length - 1;
    } else {
      var index = currentSongIndex - 1;
    }

    const song = songList[index];

    audioPlayerRef.current.src = `./musics/${song}`;
    audioPlayerRef.current.play();

    setCurrentSongIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNextSong = () => {
    if (currentSongIndex == songList.length - 1) {
      var index = 0;
    } else {
      var index = currentSongIndex + 1;
    }

    const song = songList[index];

    audioPlayerRef.current.src = `./musics/${song}`;
    audioPlayerRef.current.play();

    setCurrentSongIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioPlayerRef.current.pause();

    setIsPlaying(false);
  };

  const decreaseVolume = () => {
    if (audioPlayerRef.current.volume >= 0.2)
      audioPlayerRef.current.volume -= 0.2;
  };

  const increaseVolume = () => {
    if (audioPlayerRef.current.volume <= 0.8)
      audioPlayerRef.current.volume += 0.2;
  };

  const updateSeekBar = () => {
    const time =
      (audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) *
      100;

    console.log(time);

    setCurrentTime(time);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center space-x-2">
        <VolumeDownIcon
          className="player-volume-button stroke-purple"
          onClick={decreaseVolume}
        />
        <RewindIcon
          className="player-button fill-purple"
          onClick={() => playPreviousSong()}
        />
        {!isPlaying ? (
          <PlayIcon
            className="player-button fill-purple"
            onClick={() => playSong()}
          />
        ) : (
          <PauseIcon
            className="player-button fill-purple"
            onClick={() => pauseSong()}
          />
        )}
        <FastForwardIcon
          className="player-button fill-purple"
          onClick={() => playNextSong()}
        />
        <VolumeUpIcon
          className="player-volume-button fill-purple"
          onClick={increaseVolume}
        />
      </div>

      <audio
        ref={audioPlayerRef}
        src=""
        onTimeUpdate={updateSeekBar}
        onEnded={playNextSong}
      ></audio>

      <div
        className={
          "w-56 mt-2 bg-gray-200 rounded-full h-1.5 transition-all duration-150 ease-out dark:bg-gray-800 " +
          (currentTime != null && isPlaying ? "opacity-100" : "opacity-0")
        }
      >
        <div
          className=" bg-purple brightness-150 dark:brightness-50 h-1.5 rounded-full"
          style={{ width: currentTime + "%" }}
        ></div>
      </div>

      <p className="mt-2 text-center text-dark-purple font-jetbrains">
        {/* {currentSongIndex} •  */}
        {currentSong}
      </p>
    </div>
  );
};

export default Player;
