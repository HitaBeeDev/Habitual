import { useEffect } from "react";
import { useState } from "react";

function TimeTrackerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [initialTime, setInitialTime] = useState(25 * 60); // Add this line

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

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleTimeChange = (event) => {
    setInputMinutes(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeLeft(inputMinutes * 60);
    setInitialTime(inputMinutes * 60); // Update this line
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:justify-between bg-colorD3">
      <div className="col-span-8 bg-colorB2">
        <svg className="transform -rotate-90" width="100" height="100">
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="grey"
            strokeWidth="4"
          />
          <circle
            r="45"
            cx="50"
            cy="50"
            fill="transparent"
            stroke="blue"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={
              2 * Math.PI * 45 * ((initialTime - timeLeft) / initialTime)
            }
          />
          <text
            x="50"
            y="50"
            fill="black"
            text-anchor="middle"
            dominant-baseline="middle"
            className="text-xl font-mono"
            transform="rotate(90 50 50)"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>

        <button
          onClick={handleStartPause}
          className={`mt-4 ${
            isActive ? "bg-red-500" : "bg-green-500"
          } hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
        >
          {isActive ? "Pause" : "Start"}
        </button>

        <div className="mt-10">
          <label>Your project name:</label>
          <input type="text" />
          <button>save</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="number"
            value={inputMinutes}
            onChange={handleTimeChange}
            className="text-center border rounded-md px-4 py-2 mr-2"
            placeholder="Minutes"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Set Timer
          </button>
        </form>
      </div>

      <div className="col-span-4 bg-colorB3">
        <div>
          <p>List of projects of the day:</p>
          <ul>
            <li>
              <p>Your project name</p>
              <p>Studied Time</p>
            </li>
          </ul>
        </div>

        <p>You Studied Total: </p>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
