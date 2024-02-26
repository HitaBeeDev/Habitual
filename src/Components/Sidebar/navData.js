import {
  faHouse,
  faListCheck,
  faChartLine,
  faHourglassHalf,
  faUserGroup,
  faGear,
  faArrowRightFromBracket,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

export const mainNavItems = [
  { icon: faHouse, label: "Dashboard" },
  { icon: faTrophy, label: "Habit Tracker" },
  { icon: faListCheck, label: "ToDo List" },
  { icon: faHourglassHalf, label: "Time Tracker" },
  { icon: faChartLine, label: "Reports" },
  { icon: faUserGroup, label: "People" },
];

export const settingsNavItems = [
  { icon: faGear, label: "Settings" },
  { icon: faArrowRightFromBracket, label: "Log Out" },
];
