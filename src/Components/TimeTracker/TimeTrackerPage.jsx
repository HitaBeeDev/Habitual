import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";

function TimeTrackerPage() {
  const {
    timeLeft = 0,
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
  } = useTimeTracker();

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:justify-between bg-colorD3">
      <div className="col-span-8 bg-colorB2">
        <p>Welcome</p>

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
            textAnchor="middle"
            dominantBaseline="middle"
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
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
          />
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
            onClick={handleAddProject}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>

      <div className="col-span-4 bg-colorB3">
        <div>
          <p>List of projects of the day:</p>
          <ul>
            {projects.map((project, index) => (
              <li className="flex flex-row justify-between" key={index}>
                <p>{project.name}</p>
                <p>{formatTime(project.timeLeft)}</p>
              </li>
            ))}
          </ul>
        </div>

        <p>You Studied Total: {formatTime(totalTimeStudied, true)}</p>
      </div>

      <p>QOUTE MOTIATING</p>
    </div>
  );
}

export default TimeTrackerPage;
