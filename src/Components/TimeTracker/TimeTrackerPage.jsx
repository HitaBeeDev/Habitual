import pomodoroImage from "../../assets/time.gif";
import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";

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
  } = useTimeTracker();

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-5 lg:grid lg:grid-cols-12">
      <div className="col-span-7 flex flex-col gap-5 shadow-xl rounded-lg justify-between p-5 items-center bg-colorJ12">
        <div className="flex flex-row gap-5 justify-center items-center">
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

        <div className="relative flex flex-row justify-center items-center">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <circle
              className="timer-circle-bg"
              stroke="#e6e6e6"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              className="timer-circle-progress"
              stroke="#CBF1F5"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="8"
              fill="transparent"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: "stroke-dashoffset 1s linear",
              }}
            />
            {isEditing ? (
              <>
                <foreignObject x="25" y="80" width="150" height="50">
                  <input
                    type="text"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="text-center w-full"
                    placeholder="Enter minutes"
                    style={{ fontSize: "16px" }}
                  />
                </foreignObject>
                <foreignObject x="50" y="130" width="100" height="30">
                  <button
                    onClick={handleUpdateTime}
                    className="text-md font-semibold w-full h-full text-colorJ10 bg-colorJ15"
                    style={{ fontSize: "12px" }}
                  >
                    Update Time
                  </button>
                </foreignObject>
              </>
            ) : (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
              >
                {`${Math.floor(totalSeconds / 60)}:${
                  totalSeconds % 60 < 10 ? "0" : ""
                }${totalSeconds % 60}`}
              </text>
            )}
          </svg>
        </div>

        <div className="flex flex-row gap-5 justify-center items-center">
          <button
            onClick={toggleEdit}
            className="text-md font-semibold text-colorJ10 bg-colorJ15 p-1 rounded"
            style={{ fontSize: "12px" }}
          >
            {editButtonText}
          </button>

          <button
            className="text-md font-semibold w-32 text-center flex 
                        flex-col items-center justify-center h-10 rounded-lg
                        text-colorJ10 bg-colorJ12"
            onClick={handleStart}
          >
            Start
          </button>

          <button
            className="text-md font-semibold w-32 text-center flex 
                        flex-col items-center justify-center h-10 rounded-lg
                        text-colorJ10 bg-colorJ13"
            onClick={handlePause}
          >
            Pause
          </button>

          <button
            onClick={handleReset}
            className="text-md font-semibold w-32 text-center flex 
                        flex-col items-center justify-center h-10 rounded-lg
                        text-colorJ10 bg-colorJ14"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="col-span-5 gap-5 overflow-auto">
        <div>
          <img src={pomodoroImage} />
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
