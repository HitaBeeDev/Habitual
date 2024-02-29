import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";

import articles from "./articles";

function SessionTabs() {
  const { handleSessionChange, getTabClassName } = useTimeTracker();

  return (
    <div className="flex flex-row gap-10 justify-center items-center">
      <button
        onClick={() => handleSessionChange("Pomodoro")}
        className={getTabClassName("Pomodoro")}
      >
        Pomodoro
      </button>

      <button
        onClick={() => handleSessionChange("ShortBreak")}
        className={getTabClassName("ShortBreak")}
      >
        Short Break
      </button>

      <button
        onClick={() => handleSessionChange("LongBreak")}
        className={getTabClassName("LongBreak")}
      >
        Long Break
      </button>
    </div>
  );
}

export default SessionTabs;
