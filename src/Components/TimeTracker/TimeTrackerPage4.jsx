import { useEffect, useState } from "react";
import usePersistentState from "../../usePersistentState";

function TimeTrackerPage() {
  const [initialTime, setInitialTime] = usePersistentState(
    "initialTime",
    25 * 60
  );
  const [timeLeft, setTimeLeft] = usePersistentState("timeLeft", 25 * 60);
  const [projectName, setProjectName] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [projectTimes, setProjectTimes] = usePersistentState(
    "projectTimes",
    {}
  );
  const [isTimerStarted, setIsTimerStarted] = useState(false); // State to track if timer is started

  useEffect(() => {
    let timer;
    if (isTimerStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setTotalTime((prevTotalTime) => prevTotalTime + 1);
        if (projectName && projectTimes[projectName]) {
          setProjectTimes((prevProjectTimes) => ({
            ...prevProjectTimes,
            [projectName]: prevProjectTimes[projectName] + 1,
          }));
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isTimerStarted, projectName, projectTimes]); // Add projectName and projectTimes as dependencies

  const handleStart = () => {
    if (!projectName) {
      alert("Please enter a project name.");
      return;
    }
    if (!projectTimes[projectName]) {
      setProjectTimes((prevProjectTimes) => ({
        ...prevProjectTimes,
        [projectName]: 0,
      }));
    }
    setIsTimerStarted(true); // Start the timer
    setTimeLeft(initialTime);
  };

  const handlePause = () => {
    setIsTimerStarted(false); // Pause the timer
    clearTimeout();
  };

  const handleReset = () => {
    setIsTimerStarted(false); // Stop the timer when resetting
    clearTimeout();
    setProjectName("");
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const formatUnit = (value, unit) =>
    `${value} ${unit}${value !== 1 ? "s" : ""}`;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
          <div className="flex flex-row gap-16">
            <div className="flex flex-row gap-5">
              <label>Custom time?</label>
              <input type="text" />
            </div>

            <div className="flex flex-row gap-5">
              <label>PROJECT NAME</label>
              <input
                type="text"
                value={projectName}
                onChange={handleProjectNameChange}
              />
            </div>
          </div>

          <div className="flex flex-row gap-10">
            <button onClick={handleStart}>START</button>
            <button onClick={handlePause}>PAUSE</button>
            <button onClick={handleReset}>RESET</button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 grid grid-rows-12 gap-5 ">
        <div className="row-span-6 bg-colorJ7 shadow-xl rounded-lg">
          <h2>Project List</h2>
          <ul>
            {Object.entries(projectTimes).map(([project, time]) => (
              <li key={project}>
                {project}: {formatTime(time)}
              </li>
            ))}
            <li>Total Time: {formatTime(totalTime)}</li>
          </ul>
        </div>
        <div className="row-span-6 bg-colorJ4 shadow-xl rounded-lg">
          Welcome3
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
