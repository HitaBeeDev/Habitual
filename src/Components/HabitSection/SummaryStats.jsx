import { useHabits } from "../../ContextAPI/HabitContext";
import habitQuotes from "./habitQuotes";

export default function SummaryStats() {
  const { percentages, quoteIndex } = useHabits();

  return (
    <div className="bg-colorA4 mt-1 mb-3 rounded-lg shadow-xl lg:grid lg:grid-cols-12 items-center hidden gap-1">
      <div className="col-span-2 text-[0.75rem] text-colorB4 font-medium text-center h-16 flex justify-center items-center">
        Daily check-ins:
      </div>

      {percentages.map((percentage, index) => (
        <div key={index} className="col-span-1 text-center bg-colorA">
          <p className="text-center font-semibold text-md text-colorB4">
            {percentage}%
          </p>
        </div>
      ))}

      <div className="col-span-3">
        <p className="text-xs text-center font-semibold text-colorB4">
          {habitQuotes[quoteIndex]}
        </p>
      </div>
    </div>
  );
}
