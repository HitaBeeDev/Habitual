import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavList = ({ navItems, isOpen }) => {
  return (
    <div className="h-full">
      <ul className="flex flex-col gap-10 lg:gap-4">
        {navItems.map((item, index) => (
          <li
            className={`${
              isOpen ? "w-36" : "w-10"
            } flex flex-row rounded-md h-8 p-3 cursor-pointer text-center justify-start items-center text-xs gap-3 group`} // Added group class for hover
            key={index}
          >
            <Link
              to={`/${item.label.replace(/\s+/g, "-").toLowerCase()}`}
              className="flex items-center gap-3 w-full hover:text-colorA5"
            >
              <div className={`${!isOpen && "hidden lg:block"} `}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-3 h-3 text-colorA3 group-hover:text-colorA4 duration-500"
                />
              </div>

              <span
                className={`${
                  !isOpen && "hidden"
                } text-colorA3 group-hover:text-colorA4 font-semibold origin-left duration-500`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavList;
