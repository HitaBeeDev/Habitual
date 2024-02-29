import pomodoroImage from "../../assets/time.gif";
import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCirclePause,
  faCirclePlay,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import articles from "./articles";
import SessionTabs from "./SessionTabs";
import TimerCircle from "./TimerCircle";
import TimerButtons from "./TimerButtons";
import TimerArticles from "./TimerArticles";

function TimeTrackerPage() {
  const {
    totalSeconds,
    isEditing,
    editTime,
    setEditTime,
    handleSessionChange,
    handleStart,
    handlePause,
    handleReset,
    handleUpdateTime,
    toggleEdit,
    editButtonText,
    getTabClassName,
    radius,
    circumference,
    strokeDashoffset,
    currentArticleIndex,
  } = useTimeTracker();

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-8 lg:grid lg:grid-cols-12">
      <div className="hidden col-span-7 lg:flex flex-col gap-5 shadow-xl rounded-lg justify-between p-12 items-center bg-colorA3">
        <SessionTabs />

        <TimerCircle />

        <TimerButtons />
      </div>

      <div className="col-span-5 grid grid-rows-2 gap-8 mb-5">
        <div className="row-span-1 bg-colorE1 shadow-xl rounded-lg flex justify-center items-center">
          <img src={pomodoroImage} />
        </div>

        <div className="row-span-1 bg-colorE1 shadow-xl p-5 rounded-lg flex justify-center items-center">
          <TimerArticles />
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
