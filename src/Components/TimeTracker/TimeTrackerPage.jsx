import usePersistentState from "../../usePersistentState";

function TimeTrackerPage() {
  const [initialTime, setInitialTime] = usePersistentState(
    "initialTime",
    25 * 60
  );
  const [timeLeft, setTimeLeft] = usePersistentState("timeLeft", 25 * 60);

  const formatTime = (time, isTotal = false) => {
    if (isTotal) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      if (hours > 0) {
        return `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
          minutes !== 1 ? "s" : ""
        }`;
      } else {
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
      }
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  };

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:justify-between">
      <div className="lg:col-span-8 bg-colorJ1 shadow-xl rounded-lg gap-10 flex flex-col items-center justify-center">
        <svg className="transform -rotate-90" width="375" height="375">
          <circle
            r="169"
            cx="187.5"
            cy="187.5"
            fill="transparent"
            stroke="grey"
            strokeWidth="10"
          />

          <circle
            r="169"
            cx="187.5"
            cy="187.5"
            fill="transparent"
            stroke="blue"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 169}
            strokeDashoffset={
              2 * Math.PI * 169 * ((initialTime - timeLeft) / initialTime)
            }
          />

          <text
            x="187.5"
            y="187.5"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-4xl font-mono"
            transform="rotate(90 187.5 187.5)"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>

        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-row gap-10">
            <button>START</button>
            <button>PAUSE</button>
            <button>RESET</button>
          </div>

          <div className="flex flex-row gap-16">
            <div className="flex flex-row gap-5">
              <label>Custom time?</label>
              <input type="text" />
            </div>

            <div className="flex flex-row gap-5">
              <label>PROJECT NAME </label>
              <input type="text" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 grid grid-rows-12 gap-5 ">
        <div className="row-span-6 bg-colorJ7 shadow-xl rounded-lg">
          Welcome2
        </div>
        <div className="row-span-6 bg-colorJ4 shadow-xl rounded-lg">
          Welcome3
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
