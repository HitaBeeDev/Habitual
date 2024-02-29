import pomodoroImage from "../../assets/time.gif";
import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCirclePause,
  faCirclePlay,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import articles from "./articles";
import { useEffect, useState } from "react";

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
    currentArticleIndex,
  } = useTimeTracker();

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-8 lg:grid lg:grid-cols-12">
      <div className="hidden col-span-7 lg:flex flex-col gap-5 shadow-xl rounded-lg justify-between p-12 items-center bg-colorJ12">
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
                  <button
                    onClick={handleUpdateTime}
                    style={{ fontSize: "7px" }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-colorJ14 text-center w-4 h-4"
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
                className="text-3x tracking-widest font-semibold text-colorJ1"
              >
                {`${Math.floor(totalSeconds / 60)}:${
                  totalSeconds % 60 < 10 ? "0" : ""
                }${totalSeconds % 60}`}
              </text>
            )}
          </svg>
        </div>

        <div className="flex flex-row gap-12 justify-center items-center">
          <button
            onClick={toggleEdit}
            className="text-md font-semibold text-center flex 
            flex-col items-center justify-center rounded-lg"
          >
            {editButtonText}
          </button>

          <button
            className="text-md font-semibold text-center flex 
            flex-col items-center justify-center"
            onClick={handlePause}
          >
            <FontAwesomeIcon
              icon={faCirclePause}
              className="text-colorJ39 text-center transition-all 
              duration-500 hover:text-colorJ15 
              w-12 h-12"
            />
          </button>

          <button
            className="text-md font-semibold text-center flex 
            flex-col items-center justify-center"
            onClick={handleStart}
          >
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="text-colorJ35 text-center transition-all 
              duration-500  hover:text-colorJ15 
              w-12 h-12"
            />
          </button>

          <button
            onClick={handleReset}
            className="text-md font-semibold text-center flex 
            flex-col items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className="text-colorJ29 hover:text-colorJ15 text-center transition-all 
              duration-500  w-12 h-12"
            />
          </button>
        </div>
      </div>

      <div className="col-span-5 grid grid-rows-2 gap-8">
        <div className="row-span-1 bg-colorJ12 shadow-xl rounded-lg flex justify-center items-center">
          <img src={pomodoroImage} />
        </div>

        <div className="row-span-1 bg-colorJ12 shadow-xl p-5 rounded-lg flex justify-center items-center">
          <div>
            <h2 className="text-lg font-semibold text-colorJ1">
              {articles[currentArticleIndex]?.title}
            </h2>
            <p className="text-sm font-normal mt-2 text-colorJ10 leading-loose">
              {articles[currentArticleIndex]?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
