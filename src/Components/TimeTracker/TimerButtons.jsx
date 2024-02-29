import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePause,
  faCirclePlay,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

function TimerButtons() {
  const { handleStart, handlePause, handleReset, toggleEdit, editButtonText } =
    useTimeTracker();

  return (
    <div className="flex flex-row gap-12 justify-center items-center">
      <button
        onClick={toggleEdit}
        className="text-md font-semibold text-center flex 
    flex-col items-center justify-center rounded-lg"
      >
        {editButtonText}
      </button>

      <button
        className="text-md font-semibold text-center flex 
    flex-col items-center justify-center"
        onClick={handlePause}
      >
        <FontAwesomeIcon
          icon={faCirclePause}
          className="text-colorE3 text-center transition-all 
      duration-500 hover:text-colorE5 
      w-12 h-12"
        />
      </button>

      <button
        className="text-md font-semibold text-center flex 
    flex-col items-center justify-center"
        onClick={handleStart}
      >
        <FontAwesomeIcon
          icon={faCirclePlay}
          className="text-colorF1 text-center transition-all 
      duration-500  hover:text-colorE5 
      w-12 h-12"
        />
      </button>

      <button
        onClick={handleReset}
        className="text-md font-semibold text-center flex 
    flex-col items-center justify-center"
      >
        <FontAwesomeIcon
          icon={faPowerOff}
          className="text-colorE2 hover:text-colorE5 text-center transition-all 
      duration-500  w-12 h-11"
        />
      </button>
    </div>
  );
}

export default TimerButtons;
