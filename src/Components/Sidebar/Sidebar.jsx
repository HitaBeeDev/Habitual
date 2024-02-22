import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import NavList from "./NavList";
import { mainNavItems, settingsNavItems } from "./navData";
import userImage from "../../assets/user1.jpg";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-72 bg-colorA2" : "lg:w-24 w-0"
      } lg:bg-colorA2 flex flex-col ${
        isOpen ? "justify-center lg:justify-between" : "justify-center"
      } h-screen p-10 relative duration-300`}
    >
      <button
        className={`absolute -right-3 top-9 w-8 cursor-pointer ${
          !isOpen && "rotate-180"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon
          icon={faBarsStaggered}
          className="w-5 h-5 text-colorA4 hover:text-colorA5 transition-all duration-500"
        />
      </button>

      {isOpen && (
        <>
          <div className="hidden lg:flex justify-center items-center">
            <h1 className="transition-all hover:text-colorA4 text-xl tracking-widest font-semibold text-colorA3 cursor-pointer duration-500 rotate-[360deg]">
              Habitual
            </h1>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <img
              src={userImage}
              className="w-20 border-2 border-colorA3 rounded-full duration-500"
              alt="user"
            />
          </div>
        </>
      )}

      <div className="flex flex-col justify-center items-center gap-6 mb-3">
        <nav>
          <NavList navItems={mainNavItems} isOpen={isOpen} />
        </nav>

        <nav>
          <NavList navItems={settingsNavItems} isOpen={isOpen} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
