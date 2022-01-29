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
  const audioPlayerRef = useRef();

  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);

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

  return (
    <div>
      <audio ref={audioPlayerRef} src=""></audio>

      <div className="flex justify-center items-center space-x-2">
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
      </div>
      <p className="mt-4 text-center text-dark-purple font-jetbrains">
        {currentSongIndex} • {currentSong}
      </p>
    </div>
  );
};

export default Player;
