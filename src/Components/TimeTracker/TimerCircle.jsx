import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function TimerCircle() {
  const {
    totalSeconds,
    isEditing,
    editTime,
    setEditTime,
    handleUpdateTime,
    radius,
    circumference,
    strokeDashoffset,
  } = useTimeTracker();

  return (
    <div className="relative flex flex-row justify-center items-center">
      <svg width="400" height="400" viewBox="0 0 200 200">
        <circle
          stroke="#424874"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="5"
          fill="transparent"
        />
        <circle
          className="timer-circle-progress"
          stroke="#FFD1D1"
          cx="100"
          cy="100"
          r={radius}
          strokeWidth="9"
          fill="transparent"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 1s linear",
          }}
        />
        {isEditing ? (
          <>
            <foreignObject x="70" y="90" width="100" height="50">
              <input
                type="text"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="flex justify-center items-center text-center h-5 rounded-lg w-16"
                placeholder="Enter minutes"
                style={{ fontSize: "7px" }}
              />
            </foreignObject>
            <foreignObject x="140" y="89" width="100" height="30">
              <button onClick={handleUpdateTime} style={{ fontSize: "7px" }}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-colorE4 text-center w-4 h-4"
                />
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
            className="text-3x tracking-widest font-semibold text-colorF2"
          >
            {`${Math.floor(totalSeconds / 60)}:${
              totalSeconds % 60 < 10 ? "0" : ""
            }${totalSeconds % 60}`}
          </text>
        )}
      </svg>
    </div>
  );
}

export default TimerCircle;
