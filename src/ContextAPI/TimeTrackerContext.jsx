import { createContext, useContext, useState, useEffect } from "react";
import usePersistentState from "../usePersistentState"; // Corrected import

const TimeTrackerContext = createContext();

export const useTimeTracker = () => useContext(TimeTrackerContext);

export const TimeTrackerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = usePersistentState("timeLeft", 25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = usePersistentState(
    // Fixed typo
    "inputMinutes",
    25
  );
  const [initialTime, setInitialTime] = usePersistentState(
    // Fixed typo
    "initialTime",
    25 * 60
  );
  const [projectName, setProjectName] = usePersistentState("projectName", ""); // Fixed typo
  const [projects, setProjects] = usePersistentState("projects", []); // Fixed typo
  const [timerSet, setTimerSet] = usePersistentState("timerSet", false); // Fixed typo

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleAddProject = () => {
    if (projectName) {
      setProjects([
        ...projects,
        { name: projectName, timeLeft: inputMinutes * 60, isActive: false },
      ]);
      setProjectName("");
      setTimerSet(false); // Reset timer set state
    }
  };

  const handleTimeChange = (event) => {
    setInputMinutes(event.target.value);
  };

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

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((time) => (time > 0 ? time - 1 : 0));
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(
        projects.map((project) => {
          if (project.isActive && project.timeLeft > 0) {
            return { ...project, timeLeft: project.timeLeft - 1 };
          }
          return project;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [projects]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeLeft(inputMinutes * 60);
    setInitialTime(inputMinutes * 60);
    setTimerSet(true); // Set timer set state
  };

  // Calculate total time studied
  const totalTimeStudied = projects.reduce((total, project) => {
    return total + project.timeLeft;
  }, 0);

  return (
    <TimeTrackerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        isActive,
        setIsActive,
        inputMinutes,
        setInputMinutes,
        initialTime,
        setInitialTime,
        projectName,
        setProjectName,
        projects,
        setProjects,
        timerSet,
        setTimerSet,
        handleStartPause,
        handleProjectNameChange,
        handleAddProject,
        handleTimeChange,
        formatTime,
        totalTimeStudied,
        handleSubmit,
      }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};
