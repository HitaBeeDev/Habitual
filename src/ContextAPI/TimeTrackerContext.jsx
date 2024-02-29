import { createContext, useContext, useState, useEffect } from "react";

const TimeTrackerContext = createContext();

export const useTimeTracker = () => useContext(TimeTrackerContext);

export const TimeTrackerProvider = ({ children }) => {
  const initialTotalSeconds = 25 * 60;
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
  const [projectRemainingTimes, setProjectRemainingTimes] = useState({});

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
      const initialTimeForSession = sessionDurations[sessionType];
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

  return (
    <TimeTrackerContext.Provider
      value={{
        totalSeconds,
        setTotalSeconds,
        maxSeconds,
        setMaxSeconds,
        timerId,
        setTimerId,
        isTimerActive,
        setIsTimerActive,
        isEditing,
        setIsEditing,
        editTime,
        setEditTime,
        sessionType,
        setSessionType,
        projectName,
        setProjectName,
        projects,
        setProjects,
        projectTimes,
        setProjectTimes,
        projectRemainingTimes,
        setProjectRemainingTimes,
        handleAddProject,
        handleSessionChange,
        handleStart,
        handlePause,
        handleReset,
        handleUpdateTime,
        toggleEdit,
        editButtonText,
        getTabClassName,
        sessionDurations,
        radius,
        circumference,
        strokeDashoffset,
      }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};
