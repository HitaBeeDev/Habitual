import {
  faHouse,
  faListCheck,
  faChartLine,
  faCalendarDays,
  faHourglassHalf,
  faUserGroup,
  faGear,
  faArrowRightFromBracket,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export const mainNavItems = [
  { icon: faHouse, label: "Dashboard" },
  { icon: faTrophy, label: "Habit Tracker" },
  { icon: faListCheck, label: "Tasks" },
  { icon: faChartLine, label: "Reports" },
  { icon: faCalendarDays, label: "Calendar" },
  { icon: faHourglassHalf, label: "Time Tracker" },
  { icon: faUserGroup, label: "People" },
];

export const settingsNavItems = [
  { icon: faGear, label: "Settings" },
  { icon: faArrowRightFromBracket, label: "Log Out" },
];
