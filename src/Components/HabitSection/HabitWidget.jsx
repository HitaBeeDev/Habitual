import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function HabitWidget() {
  return (
    <div className="cursor-pointer p-3 bg-colorA2 rounded-md shadow-xl xl:h-full h-72">
      <p>Habits of today:</p>
      <p>Keep going on streak!</p>

      <ul>
        <div className="bg-colorA1 border-l-2 flex justify-between items-center border-colorA2">
          <FontAwesomeIcon icon={faHouse} className="w-3 h-3 text-colorA5" />
          <li>read a book!</li>
          <input type="checkbox" className="w-4 h-4 text-blue-600 " />
        </div>
        <div className="bg-colorA1 border-l-2 flex justify-between items-center border-colorA2">
          <FontAwesomeIcon icon={faHouse} className="w-3 h-3 text-colorA5" />
          <li>read a book!</li>
          <input type="checkbox" className="w-4 h-4 text-blue-600 " />
        </div>
        <div className="bg-colorA1 border-l-2 flex justify-between items-center border-colorA2">
          <FontAwesomeIcon icon={faHouse} className="w-3 h-3 text-colorA5" />
          <li>read a book!</li>
          <input type="checkbox" className="w-4 h-4 text-blue-600 " />
        </div>
        <div className="bg-colorA1 border-l-2 flex justify-between items-center border-colorA2">
          <FontAwesomeIcon icon={faHouse} className="w-3 h-3 text-colorA5" />
          <li>read a book!</li>
          <input type="checkbox" className="w-4 h-4 text-blue-600 " />
        </div>
      </ul>
    </div>
  );
}

export default HabitWidget;
