import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function TimeTrackerWidget() {
  return (
    <div className="cursor-pointer p-3 bg-colorA4 rounded-md shadow-xl h-full">
      <p>Upcoming Tasks:</p>

      <ul className="flex flex-col gap-2">
        <div>
          <p>21.02.2024</p>
          <li className="flex flex-row bg-colorA3 rounded-md p-2">
            <div className="border-l-4 border-colorB1 p-2">
              <p>high priority</p>
              <p>Guitar kesson with felani in somewhere</p>
            </div>

            <div className="flex flex-row gap-2">
              <FontAwesomeIcon
                icon={faClock}
                className="w-3 h-3 text-colorA1"
              />
              <p className="text-xs">10:30 AM</p>
            </div>
          </li>
        </div>

        <div>
          <p>22.02.2024</p>
          <li className="flex flex-row bg-colorA3 rounded-md p-2">
            <div className="border-l-4 border-colorB1 p-2">
              <p>very high priority</p>
              <p>Guitar kesson with felani in somewhere</p>
            </div>

            <div className="flex flex-row gap-2">
              <FontAwesomeIcon
                icon={faClock}
                className="w-3 h-3 text-colorA1"
              />
              <p className="text-xs">10:30 AM</p>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default TimeTrackerWidget;
