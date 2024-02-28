import { useTasks } from "../../ContextAPI/TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import todoImage from "../../assets/todo.gif";

function WelcomeBanner() {
  const { handleAddButtonClick } = useTasks();

  return (
    <div className="flex flex-row p-5 justify-between shadow-xl rounded-lg bg-colorJ16">
      <div className="flex flex-col justify-center gap-3 pr-5 lg:pr-40">
        <p className="lg:text-sm text-xs font-medium text-colorJ5">
          Hello there!
        </p>
        <p className="text-2xl font-semibold text-colorJ4 pr-52">
          Excited to have you! Here's a checklist to get you started smoothly:
        </p>
      </div>

      <div className="flex flex-row justify-center items-center">
        <button onClick={handleAddButtonClick}>
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="hidden lg:block text-colorJ5 hover:text-colorJ4 mt-20 transition-all duration-500 w-7 h-7"
          />
        </button>

        <img className="w-52" src={todoImage} />
      </div>
    </div>
  );
}

export default WelcomeBanner;
