import { useHabits } from "../../ContextAPI/HabitContext";

function HabitWidget() {
  const { habits } = useHabits();

  return (
    <div className="cursor-pointer p-3 bg-colorA2 rounded-md shadow-xl xl:h-full h-72">
      <p>Habits of today:</p>
      <p>Keep going on streak!</p>

      {habits && habits.length > 0 ? (
        <ul>
          {habits.map((habit, index) => (
            <li key={index} className="w-36 bg-colorB3">
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
