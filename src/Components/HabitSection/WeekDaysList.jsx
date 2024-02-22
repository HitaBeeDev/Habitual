import { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";

function WeekDaysList() {
  const [weekDays, setWeekDays] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });
  const [slideDirection, setSlideDirection] = useState("next");

  useEffect(() => {
    generateWeekDays();
  }, [currentWeekStart]);

  const generateWeekDays = () => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const today = new Date();
    const formattedToday = today.toDateString();

    const days = Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + index);
      const isToday = day.toDateString() === formattedToday;
      return {
        id: day.toISOString(),
        dayName: day
          .toLocaleString("en-us", { weekday: "short" })
          .toUpperCase(),
        date: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
        fullDate: day.toDateString(),
        isToday,
      };
    });

    setWeekDays(days);
  };

  const goToNextWeek = () => {
    setSlideDirection("next");
    setCurrentWeekStart(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 7
        )
    );
  };

  const goToPrevWeek = () => {
    setSlideDirection("prev");
    setCurrentWeekStart(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() - 7
        )
    );
  };

  const transitions = useTransition(weekDays, {
    keys: (item) => item.id,
    from: {
      opacity: 0,
      transform:
        slideDirection === "next"
          ? "translate3d(100%,0,0)"
          : "translate3d(-100%,0,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    config: { tension: 280, friction: 20 },
  });

  return (
    <div className="flex flex-row bg-colorA1 justify-between w-full">
      <button onClick={goToPrevWeek}>&lt; Prev Week</button>
      {transitions((style, item) => (
        <animated.div key={item.id} style={style} className="flex-1">
          <div className="flex flex-col items-center justify-between">
            <p className={`${item.isToday ? "font-bold" : ""}`}>
              {item.dayName}
            </p>
            <p className={`${item.isToday ? "font-bold" : ""}`}>{item.date}</p>
          </div>
        </animated.div>
      ))}
      <button onClick={goToNextWeek}>Next Week &gt;</button>
    </div>
  );
}

export default WeekDaysList;
