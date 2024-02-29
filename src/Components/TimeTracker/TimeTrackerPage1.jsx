import { useState, useEffect } from "react";
import usePersistentState from "../../usePersistentState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSquareCheck,
  faRectangleXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function TimeTrackerPage() {
  const initialTotalSeconds = 25 * 60;
  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);
  const [projectName, setProjectName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [records, setRecords] = usePersistentState("projectRecords", []);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(
    Math.floor(initialTotalSeconds / 60)
  );
  const [editSeconds, setEditSeconds] = useState(initialTotalSeconds % 60);
  const shortBreakSeconds = 5 * 60;
  const longBreakSeconds = 15 * 60;
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionType, setSessionType] = useState("Pomodoro");
  const radius = 80; // Radius of the SVG circle
  const circumference = 2 * Math.PI * radius;
  const [circleStyle, setCircleStyle] = useState({
    strokeDasharray: circumference,
    strokeDashoffset: 0,
  });

  useEffect(() => {
    const percentage = (totalSeconds / initialTotalSeconds) * 100;
    const strokeDashoffset = ((100 - percentage) * circumference) / 100;
    setCircleStyle({
      strokeDasharray: circumference,
      strokeDashoffset,
    });
  }, [totalSeconds, circumference]);

  useEffect(() => {
    if (isTimerActive) {
      const id = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds <= 0) {
            clearInterval(id);
            setIsTimerActive(false);
            return 0;
          }
          return prevTotalSeconds - 1;
        });
      }, 1000);

      setTimerId(id);

      return () => clearInterval(id);
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (totalSeconds === 0) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [totalSeconds, timerId]);

  const strokeDashoffset = (totalSeconds / initialTotalSeconds) * circumference;

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleStart = () => {
    setIsTimerActive(true);
  };

  const handlePause = () => {
    clearInterval(timerId);
    setIsTimerActive(false);
  };

  const handleReset = () => {
    clearInterval(timerId);
    setTimerId(null);
    setIsTimerActive(false);
    setTotalSeconds(initialTotalSeconds);
  };

  const recordTimeSpent = () => {
    const timeSpent = initialTotalSeconds - totalSeconds;
    const minutesSpent = Math.floor(timeSpent / 60);
    const secondsSpent = timeSpent % 60;
    const timePassedFormatted = `${
      minutesSpent < 10 ? "0" + minutesSpent : minutesSpent
    }:${secondsSpent < 10 ? "0" + secondsSpent : secondsSpent}`;

    setRecords((prevRecords) => [
      ...prevRecords,
      { projectName, timePassed: timePassedFormatted },
    ]);
  };

  const calculateTimePassed = () => {
    const timeSpent = initialTotalSeconds - totalSeconds;
    const minutesSpent = Math.floor(timeSpent / 60);
    const secondsSpent = timeSpent % 60;
    return `${minutesSpent < 10 ? "0" + minutesSpent : minutesSpent}:${
      secondsSpent < 10 ? "0" + secondsSpent : secondsSpent
    }`;
  };

  const handleSaveEdit = () => {
    // Ensure the inputs are not negative and within reasonable bounds
    const newMinutes = Math.max(0, Math.min(999, parseInt(editMinutes)));
    const newSeconds = Math.max(0, Math.min(59, parseInt(editSeconds)));
    const newTotalSeconds = newMinutes * 60 + newSeconds;

    // Update the timer with the new total seconds
    setTotalSeconds(newTotalSeconds);

    // Exit editing mode
    setIsEditing(false);
  };

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const sumAllTimes = () => {
    const totalSecondsFromRecords = records.reduce((acc, record) => {
      return acc + timeToSeconds(record.timePassed);
    }, 0);

    // Add total seconds from records to initial total seconds
    let totalSeconds = initialTotalSeconds + totalSecondsFromRecords;

    // Convert total seconds to hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} hour, ${minutes} minutes, ${seconds} seconds`;
  };

  const deleteProject = (indexToDelete) => {
    const updatedRecords = records.filter(
      (_, index) => index !== indexToDelete
    );

    setRecords(updatedRecords);
  };

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-5 lg:grid lg:grid-cols-12">
      <div className="col-span-6 bg-colorJ1 shadow-xl rounded-lg flex flex-col gap-5 justify-between p-10 items-center">
        <div className="flex flex-row gap-5 justify-center items-center shadow-xl rounded-lg">
          <p
            className={`text-md font-semibold w-32 text-center flex flex-col items-center justify-center h-10 rounded-lg text-colorJ10 ${
              sessionType === "Pomodoro" ? "bg-colorJ22" : "bg-colorJ2"
            }`}
          >
            Pomodoro
          </p>

          <p
            className={`text-md font-semibold w-32 text-center flex flex-col items-center justify-center h-10 rounded-lg text-colorJ10 ${
              sessionType === "Short Break" ? "bg-colorJ23" : "bg-colorJ2"
            }`}
          >
            Short Break
          </p>

          <p
            className={`text-md font-semibold w-32 text-center flex flex-col items-center justify-center h-10 rounded-lg text-colorJ10 ${
              sessionType === "Long Break" ? "bg-colorJ24" : "bg-colorJ2"
            }`}
          >
            Long Break
          </p>
        </div>

        <div className="relative flex flex-row justify-center items-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
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
                strokeDashoffset: strokeDashoffset,
                transition: "stroke-dashoffset 1s linear",
              }}
            />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              {Math.floor(totalSeconds / 60)}:
              {totalSeconds % 60 < 10 ? "0" : ""}
              {totalSeconds % 60}
            </text>
          </svg>

          <div className="flex flex-row justify-center items-center">
            {!isEditing ? (
              <p className="text-colorJ11 font-semibold tracking-widest text-5xl">
                {`${Math.floor(totalSeconds / 60) < 10 ? "0" : ""}${Math.floor(
                  totalSeconds / 60
                )}:${totalSeconds % 60 < 10 ? "0" : ""}${totalSeconds % 60}`}
              </p>
            ) : (
              <div className="flex flex-row justify-center gap-2 items-center">
                <input
                  className="text-center w-12 rounded-md p-1"
                  type="number"
                  value={editMinutes}
                  onChange={(e) => setEditMinutes(e.target.value)}
                />
                <span>:</span>
                <input
                  className="text-center w-12 rounded-md p-1 mr-2"
                  type="number"
                  value={editSeconds}
                  onChange={(e) => setEditSeconds(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5 justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-2">
            {isEditing ? (
              <button onClick={handleSaveEdit}>
                <button
                  className="text-md font-semibold w-32 text-center flex 
              flex-col items-center justify-center h-10 rounded-lg
               text-colorJ10 bg-colorJ28"
                >
                  SAVE
                </button>
              </button>
            ) : null}

            <div onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <button
                  className="text-md font-semibold w-32 text-center flex 
              flex-col items-center justify-center h-10 rounded-lg
               text-colorJ10 bg-colorJ29"
                >
                  CANCEL
                </button>
              ) : (
                <button
                  className="text-md font-semibold w-32 text-center flex 
                flex-col items-center justify-center h-10 rounded-lg
                 text-colorJ10 bg-colorJ30"
                >
                  custom time??
                </button>
              )}
            </div>
          </div>

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

      <div className="col-span-6 gap-5 overflow-auto bg-colorJ3 shadow-xl rounded-lg"></div>
    </div>
  );
}

export default TimeTrackerPage;
