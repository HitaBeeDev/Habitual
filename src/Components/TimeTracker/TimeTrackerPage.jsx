import React, { useState, useEffect } from "react";
import usePersistentState from "../../usePersistentState";

function TimeTrackerPage() {
  const initialTotalSeconds = 25 * 60; // Initial total seconds for the timer
  const [totalSeconds, setTotalSeconds] = useState(initialTotalSeconds);
  const [projectName, setProjectName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [records, setRecords] = usePersistentState("projectRecords", []);
  const [isTimerActive, setIsTimerActive] = useState(false); // Track if the timer is active
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(
    Math.floor(initialTotalSeconds / 60)
  );
  const [editSeconds, setEditSeconds] = useState(initialTotalSeconds % 60);
  const shortBreakSeconds = 5 * 60; // 5 minutes break
  const longBreakSeconds = 15 * 60; // 15 minutes break
  const [sessionCount, setSessionCount] = useState(0); // Track the number of Pomodoro sessions
  const [sessionType, setSessionType] = useState("Pomodoro"); // "Pomodoro", "Short Break", "Long Break"

  useEffect(() => {
    if (totalSeconds === 0) {
      if (sessionType === "Pomodoro") {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);
        const nextSessionType =
          newSessionCount % 2 === 0 ? "Long Break" : "Short Break";
        setSessionType(nextSessionType);
        alert(
          `Congratulations, now time for ${nextSessionType.toLowerCase()}.`
        );
        setTotalSeconds(
          nextSessionType === "Short Break"
            ? shortBreakSeconds
            : longBreakSeconds
        );
      } else {
        setSessionType("Pomodoro");
        setTotalSeconds(initialTotalSeconds);
      }
      setIsTimerActive(false);
    }
  }, [totalSeconds, sessionType, sessionCount]);

  useEffect(() => {
    return () => clearInterval(timerId); // Cleanup on component unmount
  }, [timerId]);

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleStart = () => {
    if (projectName.trim() === "") {
      setErrorMessage("Please enter a project name.");
      return;
    }
    setErrorMessage("");
    setIsTimerActive(true); // Indicate that the timer is now active

    const id = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) => {
        if (prevTotalSeconds === 0) {
          clearInterval(id);
          setTimerId(null);
          setIsTimerActive(false); // Timer is no longer active
          return 0;
        }
        return prevTotalSeconds - 1;
      });
    }, 1000);

    setTimerId(id);
  };

  const handlePause = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      setIsTimerActive(false); // Timer is no longer active
    }
  };

  const handleReset = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      setIsTimerActive(false); // Timer is no longer active
    }
    if (totalSeconds !== initialTotalSeconds && projectName.trim() !== "") {
      // Record the project and time spent before resetting
      recordTimeSpent();
    }
    // Reset the timer but keep the project name
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
    const newTotalSeconds = parseInt(editMinutes) * 60 + parseInt(editSeconds);
    setTotalSeconds(newTotalSeconds);
    setIsEditing(false);
  };

  const timeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const sumAllTimes = () => {
    // Sum all the times from the records
    const totalSecondsFromRecords = records.reduce((acc, record) => {
      return acc + timeToSeconds(record.timePassed);
    }, 0);

    // Calculate the time passed for the currently active timer, if any
    const currentSessionTimePassed = isTimerActive
      ? initialTotalSeconds - totalSeconds
      : 0;

    // Sum the total seconds
    const totalSeconds = totalSecondsFromRecords + currentSessionTimePassed;

    // Convert the total seconds to hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the output
    return `${hours} hour, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div className="flex flex-col gap-10 bg-colorA2">
      <div className="flex flex-col gap-10 bg-colorA3">
        <div className="flex flex-row gap-10">
          <p style={{ color: sessionType === "Pomodoro" ? "green" : "black" }}>
            Pomodoro
          </p>
          <p
            style={{ color: sessionType === "Short Break" ? "green" : "black" }}
          >
            Short Break
          </p>
          <p
            style={{ color: sessionType === "Long Break" ? "green" : "black" }}
          >
            Long Break
          </p>
        </div>

        <div className="flex flex-row gap-5">
          <label>Project name?</label>
          <input
            type="text"
            placeholder="Type your project name"
            value={projectName}
            onChange={handleProjectNameChange}
          />
          <button className="bg-colorC3" onClick={handleStart}>
            Start
          </button>
          <button className="bg-colorB5" onClick={handlePause}>
            Pause
          </button>
          <button onClick={handleReset} className="bg-colorC1">
            Reset
          </button>
        </div>

        <div>
          {!isEditing ? (
            <p className="bg-colorB1">
              {`${Math.floor(totalSeconds / 60) < 10 ? "0" : ""}${Math.floor(
                totalSeconds / 60
              )}:${totalSeconds % 60 < 10 ? "0" : ""}${totalSeconds % 60}`}
            </p>
          ) : (
            <div>
              <input
                type="number"
                value={editMinutes}
                onChange={(e) => setEditMinutes(e.target.value)}
              />
              <span>:</span>
              <input
                type="number"
                value={editSeconds}
                onChange={(e) => setEditSeconds(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          )}
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>

      <div className="bg-colorC2">
        {records.length > 0 || isTimerActive ? (
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <p>Project: {record.projectName}</p>
                <p>Time Passed: {record.timePassed}</p>
              </li>
            ))}
            {isTimerActive && (
              <li>
                <p>Project: {projectName}</p>
                <p>Time Passed: {calculateTimePassed()}</p>
              </li>
            )}
          </ul>
        ) : (
          <p>No records available</p>
        )}
      </div>

      <p>you studied total of: {sumAllTimes()}</p>
    </div>
  );
}

export default TimeTrackerPage;
