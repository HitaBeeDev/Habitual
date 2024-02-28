import { useTasks } from "../../ContextAPI/TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

function AddModal() {
  const {
    newTask,
    handleCloseModal,
    handleTaskAddition,
    handleTaskSave,
    updateNewTask,
    isEditing,
  } = useTasks();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-md p-5 bg-colorB2 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button className="text-right" onClick={handleCloseModal}>
            <FontAwesomeIcon
              icon={faRectangleXmark}
              className="text-colorB3 mt-2 hover:text-colorB4 transition-all duration-500 w-5 h-5"
            />
          </button>
        </div>

        <div className="flex flex-col justify-center items-start p-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm text-colorB3 font-semibold">
              ✔️ Let's Get Started on a New To-Do!
            </label>
            <input
              type="text"
              placeholder="ToDo name:"
              className="p-2 w-52 rounded-lg text-xs"
              value={newTask.name}
              onChange={(e) => updateNewTask("name", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mt-4 text-sm text-colorB3 font-semibold">
              😊 Description of your to-do list:
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              className="p-2 ml-auto w-52 rounded-lg text-xs"
              value={newTask.description}
              onChange={(e) => updateNewTask("description", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mt-4 text-sm text-colorB3 font-semibold">
              🗓️ When are you planning to handle this?
            </label>
            <input
              type="date"
              value={newTask.date}
              onChange={(e) => updateNewTask("date", e.target.value)}
              className="p-2 w-40 rounded-lg text-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mt-4 text-sm text-colorB3 font-semibold">
              ⏰ When will you begin?
            </label>
            <input
              type="time"
              value={newTask.startTime}
              onChange={(e) => updateNewTask("startTime", e.target.value)}
              className="p-2 w-28 rounded-lg text-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mt-4 text-sm text-colorB3 font-semibold">
              ⏰ When will you be done?
            </label>
            <input
              type="time"
              value={newTask.endTime}
              onChange={(e) => updateNewTask("endTime", e.target.value)}
              className="p-2 w-28 rounded-lg text-xs"
            />
          </div>

          <div className="mt-7">
            <p className="text-sm text-colorB3 font-semibold">
              🌞 Please choose a priority tag:
            </p>

            <div className="flex mt-3">
              {["High", "Medium", "Low"].map((priority) => (
                <button
                  key={priority}
                  className={`text-center rounded-lg text-xs w-28 h-8 text-colorB4 font-semibold ${
                    priority === "High"
                      ? "bg-colorC2"
                      : priority === "Medium"
                      ? "bg-colorA5"
                      : "bg-colorC3"
                  }`}
                  onClick={() => updateNewTask("priority", priority)}
                >
                  {priority} Priority
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className="mt-4 p-2 w-32 text-sm text-colorB1 hover:text-colorB3 transition-all duration-500 hover:bg-colorB1 font-semibold bg-colorB3 rounded-lg"
            onClick={isEditing ? handleTaskSave : handleTaskAddition}
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
