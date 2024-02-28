import { useHabits } from "../../ContextAPI/HabitContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function WeekDaysHeader() {
  const { formatDate, formattedToday, visibleWeekDates } = useHabits();

  return (
    <div className="lg:grid lg:grid-cols-12 mt-6 lg:mt-3 bg-colorA5 h-14 w-full rounded-md items-center shadow-lg flex flex-row gap-3">
      <div className="col-span-2 text-center w-full">
        <p className="text-md font-bold text-colorA1">Your Habits</p>
      </div>

      {visibleWeekDates.map((date, index) => (
        <div
          key={index}
          className="lg:col-span-1 flex justify-center items-center lg:border-[1px] h-10 lg:rounded-lg lg:border-colorA2 p-1 w-full text-center"
        >
          <p
            className={`text-sm text-colorA1 ${
              formattedToday === formatDate(date) ? "font-bold" : "font-medium"
            }`}
          >
            {formatDate(date)}
          </p>
        </div>
      ))}

      <div className="col-span-1 text-center hidden lg:block">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-colorA1 w-4 h-4"
        />
      </div>

      <div className="col-span-1 text-center hidden lg:block">
        <FontAwesomeIcon icon={faTrashCan} className="text-colorA1 w-4 h-4" />
      </div>

      <div className="col-span-1 text-center hidden lg:block">
        <FontAwesomeIcon icon={faChartLine} className="text-colorA1 w-4 h-4" />
      </div>
    </div>
  );
}
