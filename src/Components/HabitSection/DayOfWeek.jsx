export default function DayOfWeek({ weekDates }) {
  return (
    <div className="flex flex-row w-full lg:-ml-0 items-center bg-colorA1 lg:justify-between">
      <p className="w-36 text-center bg-colorA2 lg:inline-block">Habits</p>
      {weekDates.map(({ dayAbbr, date, month, isToday }, index) => {
        const conditionalClasses = isToday
          ? "font-bold"
          : "hidden lg:inline-block";
        return (
          <p
            key={index}
            className={`w-32 text-center bg-colorA3 ${conditionalClasses}`}
          >
            {`${dayAbbr} ${date} ${month}`}
          </p>
        );
      })}
      <p className="w-32 text-center bg-colorA2 lg:inline-block">CUSTOMIZE</p>
    </div>
  );
}
