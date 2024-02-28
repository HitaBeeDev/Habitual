import { useHabits } from "../../ContextAPI/HabitContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function WelcomeBanner() {
  const { habitInput, handleInputChange, handleAddClick } = useHabits();

  return (
    <div className="flex lg:flex-row flex-col p-6 lg:h-24 h-72 justify-between items-center shadow-xl bg-colorB4 rounded-lg lg:p-3 lg:pl-5 lg:pr-5">
      <div className="flex flex-col gap-2">
        <p className="lg:text-2xl text-xl font-semibold text-colorA2">
          Welcome to the journey of building new habits!
        </p>
        <p className="lg:text-sm text-xs font-normal text-colorA3">
          Let's embark on this exciting adventure together!
        </p>
      </div>

      <div className="flex flex-row gap-3 mt-5 justify-center items-center h-8">
        <input
          value={habitInput}
          onChange={handleInputChange}
          type="text"
          className="rounded-lg text-xs p-2 pl-3 w-52"
          placeholder="Add a new habit..."
        />
        <button onClick={handleAddClick}>
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="text-colorA3 mt-2 hover:text-colorA4 transition-all duration-500 w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}
