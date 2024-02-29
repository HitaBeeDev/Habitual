import { useEffect, useState } from "react";
import quotes from "./quoteDatas";
import welcomeCardImage from "../../assets/welcomeCard1.png";

function WelcomeCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const [timeGreeting, setTimeGreeting] = useState("");
  const [motivationalMessage, setMotivationalMessage] = useState("");

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setTimeGreeting("Rise and shine! ☀️🌅🐦");
      setMotivationalMessage("Today's a blank page, let's fill it with color!");
    } else if (hour >= 12 && hour < 17) {
      setTimeGreeting("Warm wishes for the afternoon! 🌞🍃🌼");
      setMotivationalMessage("You're doing great, keep the momentum going!");
    } else if (hour >= 17 && hour < 23) {
      setTimeGreeting("Embrace the evening's calm! 🌙✨🌌");
      setMotivationalMessage(
        "Reflect on the day's wins and relax, you've earned it."
      );
    } else {
      setTimeGreeting("Enough working! 🛌💤🚫");
      setMotivationalMessage(
        "Time to rest and recharge for another day ahead."
      );
    }
  }, [currentTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatDate = (date) => {
    return {
      time: date
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .split(" "),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const {
    time: [formattedTime, period],
    dayOfWeek,
    date: currentDate,
  } = formatDate(currentTime);

  return (
    <div className="lg:grid lg:grid-cols-6 gap-5 h-full flex flex-col">
      <div
        className="lg:col-span-4 flex flex-col gap-8 lg:gap-1 p-2 
      lg:flex-row items-center bg-colorJ26 lg:shadow-xl lg:p-3 rounded-lg"
      >
        <div className="pl-5 flex flex-col">
          <p
            className="text-left tracking-widest font-mono 
          text-colorJ1 text-[2.2rem] font-black"
          >
            {timeGreeting}
          </p>
          <p className="text-left mt-5 text-md font-normal text-colorJ2">
            {motivationalMessage}
          </p>
        </div>

        <div>
          <img
            className="w-[350px]"
            src={welcomeCardImage}
            alt="welcomeCardImage"
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-rows-2 gap-5 flex flex-col">
        <div
          className="bg-colorC2 h-20 lg:h-full rounded-lg 
        lg:shadow-xl flex flex-col items-start justify-center gap-2 p-3"
        >
          <p className="text-colorJ5 text-xs font-medium">
            Oh hey, it's{" "}
            <span className="text-colorJ13 tracking-wider text-xs font-bold">
              {dayOfWeek}
            </span>{" "}
            already!
          </p>

          <p className="text-colorJ6 text-md font-bold">{currentDate}</p>
        </div>

        <div className="bg-colorD2 h-20 lg:h-full flex items-center justify-center text-center rounded-lg lg:shadow-xl text-colorA5 col-span-1">
          <div className="flex items-baseline font-semibold mt-2">
            <span className="text-colorJ7 text-[35px]">{formattedTime}</span>
            <span className="text-colorJ7 text-sm self-start -mt-3 ml-1">
              {period}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-colorJ28 h-28 lg:h-full flex items-center justify-center col-span-1 p-5 rounded-lg lg:shadow-xl">
        <p className="text-colorJ8 text-md font-medium tracking-wider leading-loose">
          "{quotes[quoteIndex]}"
        </p>
      </div>
    </div>
  );
}

export default WelcomeCard;
