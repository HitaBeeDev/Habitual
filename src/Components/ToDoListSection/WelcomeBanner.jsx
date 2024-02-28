import { useTasks } from "../../ContextAPI/TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function WelcomeBanner() {
  const { handleAddButtonClick } = useTasks();

  return (
    <div className="flex flex-row p-5 justify-between shadow-xl rounded-lg bg-colorB5">
      <div className="flex flex-col gap-3 pr-5 lg:pr-40">
        <p className="lg:text-sm text-xs font-medium text-colorB3">
          Hello there!
        </p>
        <p className="text-lg font-semibold text-colorB4">
          Excited to have you! Here's a checklist to get you started smoothly:
        </p>
      </div>

      <button onClick={handleAddButtonClick}>
        <FontAwesomeIcon
          icon={faSquarePlus}
          className="text-colorB3 mt-2 hover:text-colorB4 transition-all duration-500 w-7 h-7"
        />
      </button>
    </div>
  );
}

export default WelcomeBanner;
