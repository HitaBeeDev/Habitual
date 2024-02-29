import { useHabits } from "../../ContextAPI/HabitContext";

function HabitWidget() {
  const { habits } = useHabits();

  return (
    <div className="cursor-pointer p-5 gap-5 flex flex-col justify-start bg-colorJ4 rounded-md shadow-xl xl:h-full h-72">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-colorJ11">
          🌻 Today's Habits:
        </p>

        <p className="text-sm font-semibold text-colorJ26">
          Keep up the amazing momentum! 💖
        </p>
      </div>

      {habits && habits.length > 0 ? (
        <ul className="flex flex-col justify-start gap-3">
          {habits.map((habit, index) => (
            <li className="text-[0.88rem] text-colorJ11" key={index}>
              {habit.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No habits for today.</p>
      )}
    </div>
  );
}

export default HabitWidget;
