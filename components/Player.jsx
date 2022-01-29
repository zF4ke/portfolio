import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

const Player = (props) => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-2">
        <RewindIcon className="player-button fill-purple" />
        <PlayIcon className="player-button fill-purple" />
        <FastForwardIcon className="player-button fill-purple" />
      </div>
      <p className="mt-2 text-center text-dark-purple">Comedy • Bo Burnham</p>
    </div>
  );
};

export default Player;
