import { useTasks } from "../../ContextAPI/TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ToDoList() {
  const {
    isEditing,
    editTaskIndex,
    newTask,
    handleTaskDelete,
    handleTaskEditClick,
    updateNewTask,
    checkedTasks,
    handleCheckboxChange,
    sortedTasks,
    generateTaskIdentifier,
  } = useTasks();

  return (
    <div className="hidden lg:block mt-5 bg-colorB2 rounded-lg shadow-xl p-1 pl-5 pr-5 pb-5">
      {sortedTasks.map(([date, tasks]) => (
        <div key={date}>
          <p className=" text-sm font-semibold mb-2 mt-5">{date}</p>
          <ul>
            {tasks.map((task, index) => {
              const taskIdentifier = generateTaskIdentifier(task, index);
              return (
                <li
                  key={taskIdentifier}
                  style={{
                    textDecoration: checkedTasks.includes(taskIdentifier)
                      ? "line-through"
                      : "none",
                  }}
                >
                  <div className="hidden lg:grid grid-cols-12 pl-3 pr-3 gap-3 items-center rounded-lg shadow-xl bg-colorB1 h-14">
                    <div className="col-span-3 rounded-lg border-2 border-colorB2 h-10 flex flex-row gap-3 justify-start pl-5 items-center">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={checkedTasks.includes(taskIdentifier)}
                        onChange={() => handleCheckboxChange(taskIdentifier)}
                      />

                      <div>
                        {isEditing && editTaskIndex === index ? (
                          <input
                            type="text"
                            value={newTask.name}
                            onChange={(e) =>
                              updateNewTask("name", e.target.value)
                            }
                          />
                        ) : (
                          <p className="text-sm font-semibold text-colorB4">
                            {task.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-3 h-10 flex items-center justify-center rounded-lg border-2 border-colorB2">
                      <p className="text-center text-sm font-normal text-colorB4">
                        {isEditing && editTaskIndex === index ? (
                          <input
                            type="text"
                            value={newTask.description}
                            onChange={(e) =>
                              updateNewTask("description", e.target.value)
                            }
                          />
                        ) : (
                          task.description
                        )}
                      </p>
                    </div>

                    <div className="col-span-2 h-10 flex items-center justify-center rounded-lg border-2 border-colorB2">
                      <p className="text-center text-sm font-medium text-colorB4">
                        {task.date}
                      </p>
                    </div>

                    <div className="col-span-1 h-10 flex items-center justify-center rounded-lg border-2 border-colorB2">
                      <p className="text-center text-sm font-medium text-colorB4">
                        {task.startTime}
                      </p>
                    </div>

                    <div className="col-span-1 h-10 flex items-center justify-center rounded-lg border-2 border-colorB2">
                      <p className="text-center text-sm font-medium text-colorB4">
                        {task.endTime}
                      </p>
                    </div>

                    <div
                      className={`col-span-1 h-10 flex items-center justify-center rounded-lg border-2 border-colorB2 ${
                        task.priority === "High"
                          ? "bg-colorC2 border-colorC2"
                          : task.priority === "Medium"
                          ? "bg-colorA5 border-colorA5"
                          : task.priority === "Low"
                          ? "bg-colorC3 border-colorC3"
                          : ""
                      }`}
                    >
                      <p className="text-center text-sm font-medium text-colorB4">
                        {task.priority}
                      </p>
                    </div>

                    <div className="col-span-1 flex justify-center gap-3 items-center">
                      <button onClick={() => handleTaskEditClick(task.id)}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-colorB3 text-center w-4 h-4"
                        />
                      </button>
                      <button onClick={() => handleTaskDelete(task.id)}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-colorB3 text-center w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
