import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import usePersistentState from "../../usePersistentState";

function TimeTrackerPage() {
  const initialTotalSeconds = 25 * 60; // Initial time for the Pomodoro timer
  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);
  const [maxSeconds, setMaxSeconds] = useState(initialTotalSeconds);
  const [timerId, setTimerId] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTime, setEditTime] = useState("");
  const [sessionType, setSessionType] = useState("Pomodoro");
  const sessionDurations = {
    Pomodoro: 25 * 60,
    ShortBreak: 15 * 60,
    LongBreak: 30 * 60,
  };

  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectTimes, setProjectTimes] = useState({});
  const [projectRemainingTimes, setProjectRemainingTimes] = useState({}); // New state to track remaining time for each project

  useEffect(() => {
    if (isTimerActive) {
      const id = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 0) {
            clearInterval(id);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
        setProjectRemainingTimes((prev) => {
          const updatedRemainingTimes = { ...prev };
          for (const projectId in prev) {
            updatedRemainingTimes[projectId] = prev[projectId] - 1;
          }
          return updatedRemainingTimes;
        });
      }, 1000);
      setTimerId(id);
      return () => clearInterval(id);
    }
  }, [isTimerActive]);

  const handleAddProject = () => {
    if (projectName.trim()) {
      const projectId = Date.now().toString();
      const newProject = { id: projectId, name: projectName };
      setProjects([...projects, newProject]);
      const initialTimeForSession = sessionDurations[sessionType]; // Use sessionType to set initial time
      setProjectTimes((prev) => ({
        ...prev,
        [projectId]: initialTimeForSession,
      }));
      setProjectRemainingTimes((prev) => ({
        ...prev,
        [projectId]: initialTimeForSession,
      }));
      setProjectName("");
    }
  };

  const handleSessionChange = (type) => {
    setSessionType(type);
    const newTotalSeconds = sessionDurations[type];
    setTotalSeconds(newTotalSeconds);
    setMaxSeconds(newTotalSeconds);
    if (isTimerActive) {
      handlePause();
    }
  };

  const getTabClassName = (type) => {
    return `text-md font-semibold w-32 text-center flex flex-col items-center justify-center h-10 rounded-lg text-colorJ10 ${
      sessionType === type ? "bg-colorA2" : "bg-colorA3"
    }`;
  };

  const handleStart = () => setIsTimerActive(true);

  const handlePause = () => {
    clearInterval(timerId);
    setIsTimerActive(false);
  };

  const handleReset = () => {
    clearInterval(timerId);
    setTimerId(null);
    setIsTimerActive(false);
    setTotalSeconds(maxSeconds); // Reset main timer
  };

  const handleEdit = () => setIsEditing(true);

  const handleUpdateTime = () => {
    const newTotalSeconds = parseInt(editTime, 10) * 60;
    if (!isNaN(newTotalSeconds) && newTotalSeconds > 0) {
      setTotalSeconds(newTotalSeconds);
      setMaxSeconds(newTotalSeconds);
      // Update remaining time for all projects if total time is updated
      setProjectRemainingTimes((prev) => {
        const updatedRemainingTimes = {};
        for (const projectName in prev) {
          updatedRemainingTimes[projectName] = newTotalSeconds;
        }
        return updatedRemainingTimes;
      });
    }
    setIsEditing(false);
    setEditTime("");
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (totalSeconds / maxSeconds) * circumference;

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const editButtonText = isEditing ? "Close" : "Edit";

  const calculateTotalTimeStudied = () => {
    let totalTimeInSeconds = 0;
    for (const projectName in projectTimes) {
      totalTimeInSeconds +=
        projectTimes[projectName] - projectRemainingTimes[projectName];
    }
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-5 lg:grid lg:grid-cols-12">
      <div className="col-span-6 bg-colorJ1 shadow-xl rounded-lg flex flex-col gap-5 justify-between p-10 items-center">
        <div className="flex flex-row gap-5 justify-center items-center shadow-xl rounded-lg">
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
          <div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="text-input"
            />
            <button onClick={handleAddProject} className="add-btn">
              Add
            </button>
          </div>

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

      <div className="col-span-6 gap-5 overflow-auto bg-colorJ3 shadow-xl rounded-lg">
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {project.name} - {/* Use project.id to access times */}
              {`${Math.floor(
                (projectTimes[project.id] - projectRemainingTimes[project.id]) /
                  60
              )}:${
                (projectTimes[project.id] - projectRemainingTimes[project.id]) %
                  60 <
                10
                  ? "0"
                  : ""
              }${
                (projectTimes[project.id] - projectRemainingTimes[project.id]) %
                60
              }`}
            </li>
          ))}
        </ul>

        <div>You study the total of: {calculateTotalTimeStudied()}</div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
