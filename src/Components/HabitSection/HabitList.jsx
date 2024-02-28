import { useHabits } from "../../ContextAPI/HabitContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faSquareCheck,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function HabitList() {
  const {
    habits,
    editIndex,
    editInput,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleEditInputChange,
    handleDeleteClick,
    toggleDayMark,
    visibleWeekDates,
  } = useHabits();

  if (habits.length === 0) {
    return (
      <div className="bg-colorB1 flex justify-center items-center mt-3 h-full shadow-lg rounded-lg">
        <p className="text-center text-lg font-semibold text-colorB3">
          Looks like you haven't added any habits yet! Let's get started on
          creating some positive ones!
        </p>
      </div>
    );
  }

  return (
    <>
      {habits.map((habit, index) => (
        <div
          key={index}
          className="lg:grid lg:grid-cols-12 lg:mb-1 bg-colorB1 shadow-lg lg:h-12 h-16 p-3 lg:p-0 rounded-lg w-full gap-3 flex flex-row justify-between items-center"
        >
          <div className="lg:col-span-2 w-full text-center">
            {editIndex === index ? (
              <input
                value={editInput}
                onChange={handleEditInputChange}
                type="text"
              />
            ) : (
              <p className="text-sm font-medium text-colorB3">{habit.name}</p>
            )}
          </div>

          {visibleWeekDates.map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="lg:col-span-1 flex justify-center items-center cursor-pointer"
              onClick={() => toggleDayMark(index, dayIndex)}
            >
              <div
                className={`w-4 h-4 rounded-sm ${
                  habit.days[dayIndex] ? "bg-colorB3/70" : "bg-colorB2"
                }`}
              ></div>
            </div>
          ))}

          {editIndex === index ? (
            <>
              <button
                className="col-span-1 text-center"
                onClick={handleSaveClick}
              >
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  className="text-colorB3 w-5 h-5"
                />
              </button>
              <button
                className="col-span-1 text-center"
                onClick={handleCancelClick}
              >
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  className="text-colorB3 w-5 h-5"
                />
              </button>
            </>
          ) : (
            <>
              <button
                className="col-span-1 hidden lg:block text-center "
                onClick={() => handleEditClick(index)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-colorB3 w-4 h-4"
                />
              </button>
              <button
                className="col-span-1 hidden lg:block text-center"
                onClick={() => handleDeleteClick(index)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="text-colorB3 w-4 h-4"
                />
              </button>
            </>
          )}

          <div className="col-span-1 hidden lg:block text-center font-semibold text-md text-colorB4">
            {`${Math.round(
              (habit.days.filter((day) => day).length / 7) * 100
            )}%`}
          </div>
        </div>
      ))}
    </>
  );
}
