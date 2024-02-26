import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavList = ({ navItems, isOpen }) => {
  return (
    <div className="h-full">
      <ul className="flex flex-col gap-10 lg:gap-4">
        {navItems.map((item, index) => (
          <li
            className={`flex rounded-md h-8 p-3 cursor-pointer justify-start items-center text-xs gap-3 group ${
              isOpen ? "w-36" : "w-10"
            }`}
            key={index}
          >
            <Link
              to={`/${item.label.replace(/\s+/g, "-").toLowerCase()}`}
              className="flex items-center gap-3 w-full hover:text-colorA5"
            >
              <div>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-3 h-3 text-colorA3 group-hover:text-colorA4 duration-500`}
                />
              </div>

              {isOpen && (
                <span className="text-colorA3 group-hover:text-colorA4 font-semibold origin-left duration-500">
                  {item.label}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavList;
