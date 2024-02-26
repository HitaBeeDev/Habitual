import { useTimeTracker } from "../../ContextAPI/TimeTrackerContext";

function TimeTrackerWidget() {
  const { projects, formatTime, totalTimeStudied } = useTimeTracker();

  return (
    <div className="cursor-pointer p-3 bg-colorA4 rounded-md shadow-xl h-full">
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
  );
}

export default TimeTrackerWidget;
