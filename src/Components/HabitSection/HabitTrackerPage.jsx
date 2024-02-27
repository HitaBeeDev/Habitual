import { useHabits } from "../../ContextAPI/HabitContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faPenToSquare,
  faTrashCan,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

function HabitTrackerPage() {
  const {
    habits,
    editIndex,
    editInput,
    habitInput,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleEditInputChange,
    handleDeleteClick,
    toggleDayMark,
    getWeekDates,
    formatDate,
    formatDayOfWeek,
    calculateHabitCompletion,
    calculateAveragePercentageForWeek,
    totalHabits,
    formattedToday,
    completedHabits,
    bestDayMessage,
    bestHabitMessage,
    averagePercentageForWeek,
    weekDates,
    percentages,
    visibleWeekDates,
  } = useHabits();

  return (
    <div className="lg:mt-9 lg:mb-5 mt-20 w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center shadow-xl bg-colorA4 rounded-lg p-3 pl-5 pr-5">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold text-colorA3">
            Welcome to the journey of building new habits!
          </p>
          <p className="text-sm font-normal text-colorA3">
            Let's embark on this exciting adventure together!
          </p>
        </div>

        <div className="flex flex-row gap-3 justify-center items-center h-8">
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
              className="text-colorA3 mt-2 hover:text-colorA2 transition-all duration-500 w-6 h-6"
            />
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 bg-colorA3 h-12 w-full rounded-md items-center shadow-lg flex flex-row gap-3">
        <div className="col-span-2 text-center w-full">
          <p className="text-md font-semibold text-colorA4">Your Habits</p>
        </div>

        {visibleWeekDates.map((date, index) => (
          <div
            key={index}
            className="lg:col-span-1 flex justify-center items-center border-[1px] h-9 rounded-lg border-colorA1 p-1 w-full text-center"
          >
            <p
              className={`text-sm text-colorA4 ${
                formattedToday === formatDate(date)
                  ? "font-bold"
                  : "font-medium"
              }`}
            >
              {formatDate(date)}
            </p>
          </div>
        ))}

        <div className="col-span-1 text-center hidden lg:block">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-colorA4 w-5 h-5"
          />
        </div>

        <div className="col-span-1 text-center hidden lg:block">
          <FontAwesomeIcon icon={faTrashCan} className="text-colorA4 w-5 h-5" />
        </div>

        <div className="col-span-1 text-center hidden lg:block">
          <FontAwesomeIcon
            icon={faChartLine}
            className="text-colorA4 w-5 h-5"
          />
        </div>
      </div>

      {habits.map((habit, index) => (
        <div
          key={index}
          className="lg:grid lg:grid-cols-12 bg-colorA3 h-10 rounded-lg w-full gap-3 flex flex-row justify-between items-center"
        >
          <div className="lg:col-span-2 w-full text-center">
            {editIndex === index ? (
              <input
                value={editInput}
                onChange={handleEditInputChange}
                type="text"
              />
            ) : (
              <p>{habit.name}</p>
            )}
          </div>

          {visibleWeekDates.map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="lg:col-span-1 flex justify-center items-center cursor-pointer"
              onClick={() => toggleDayMark(index, dayIndex)}
            >
              <div
                className={`w-5 h-5 ${
                  habit.days[dayIndex] ? "bg-colorA4" : "bg-colorA3"
                }`}
              ></div>
            </div>
          ))}

          {editIndex === index ? (
            <>
              <button
                className="col-span-1 text-center bg-colorB4"
                onClick={handleSaveClick}
              >
                save
              </button>
              <button
                className="col-span-1 text-center bg-colorB5"
                onClick={handleCancelClick}
              >
                cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="col-span-1 hidden lg:block text-center bg-colorB4"
                onClick={() => handleEditClick(index)}
              >
                edit
              </button>
              <button
                className="col-span-1 hidden lg:block text-center bg-colorB5"
                onClick={() => handleDeleteClick(index)}
              >
                delete
              </button>
            </>
          )}

          <div className="col-span-1 hidden lg:block text-center bg-colorC1">
            {`${Math.round(
              (habit.days.filter((day) => day).length / 7) * 100
            )}%`}
          </div>
        </div>
      ))}

      <div className="bg-colorC2 lg:grid lg:grid-cols-12 hidden gap-1">
        <div className="col-span-2  bg-colorC3">STATUS</div>
        {percentages.map((percentage, index) => (
          <div key={index} className="col-span-1 text-center bg-colorA">
            <p>{percentage}%</p>
          </div>
        ))}
        <div className="col-span-3 bg-colorA1">Quote</div>
      </div>

      <div className="bg-colorC2 lg:grid lg:grid-cols-12 flex flex-col gap-2">
        <div className="col-span-3 bg-colorD1 text-center">
          You did {completedHabits} of {totalHabits} habits completely.
        </div>

        <div className="col-span-3 bg-colorD5 text-center">
          Your best habit/s is/are: {bestHabitMessage}
        </div>

        <div className="col-span-3 bg-colorD2 text-center">
          {bestDayMessage}
        </div>

        <div className="col-span-3 bg-colorD4 text-center">
          Your result of the week is:{" "}
          <p>{averagePercentageForWeek.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}

export default HabitTrackerPage;
