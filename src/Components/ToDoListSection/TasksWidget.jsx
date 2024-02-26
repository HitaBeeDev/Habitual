import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function TasksWidget() {
  return (
    <div className="cursor-pointer p-3 bg-colorA5 rounded-md shadow-xl h-full">
      <p>Today tasks:</p>
      <p>lets do tasks of today</p>

      <ul className="flex flex-col gap-2">
        <li className="flex flex-row bg-colorA4 rounded-md p-2">
          <div className="border-l-4 border-colorB1 p-2">
            <p>low priority</p>
            <p>Guitar kesson with felani in somewhere</p>
          </div>

          <div className="flex flex-row gap-2">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-colorA1" />
            <p className="text-xs">10:30 AM</p>
          </div>
        </li>

        <li className="flex flex-row bg-colorA4 rounded-md p-2">
          <div className="border-l-4 border-colorB1 p-2">
            <p>low priority</p>
            <p>Guitar kesson with felani in somewhere</p>
          </div>

          <div className="flex flex-row gap-2">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-colorA1" />
            <p className="text-xs">10:30 AM</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TasksWidget;
