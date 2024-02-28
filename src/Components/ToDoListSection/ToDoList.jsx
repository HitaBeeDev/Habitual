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
    <div className="hidden lg:block mt-5 bg-colorB3/20 rounded-lg shadow-xl p-1 pl-5 pr-5 pb-5">
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
                  <div className="hidden lg:grid  bg-colorB1 h-20 grid-cols-12 pl-3 pr-3 gap-5 items-center rounded-lg shadow-xl">
                    <div className="col-span-5 flex flex-row gap-5 justify-start items-center">
                      <input
                        className={`cursor-pointer w-5 border border-colorB5 h-5 rounded-full ${
                          checkedTasks.includes(taskIdentifier)
                            ? "bg-colorB5"
                            : "bg-colorB5/10"
                        } appearance-none`}
                        type="checkbox"
                        checked={checkedTasks.includes(taskIdentifier)}
                        onChange={() => handleCheckboxChange(taskIdentifier)}
                      />

                      <div className="flex flex-col gap-2">
                        {isEditing && editTaskIndex === index ? (
                          <input
                            type="text"
                            value={newTask.name}
                            onChange={(e) =>
                              updateNewTask("name", e.target.value)
                            }
                          />
                        ) : (
                          <p className="tracking-widest	text-sm font-semibold text-colorB4">
                            {task.name}
                          </p>
                        )}

                        <p className="text-center text-xs font-normal text-colorB4">
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
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <p className="text-center tracking-widest text-sm font-medium text-colorB4">
                        {task.date}
                      </p>
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <p className="text-center text-sm tracking-widest	 font-medium text-colorB4">
                        {task.startTime}
                      </p>
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <p className="text-center text-sm tracking-widest	 font-medium text-colorB4">
                        {task.endTime}
                      </p>
                    </div>

                    <div
                      className={`col-span-1 flex items-center content-center justify-center rounded-lg w-24 h-9 ${
                        task.priority === "High"
                          ? "bg-colorC2 border-colorC2 text-colorA2"
                          : task.priority === "Medium"
                          ? "bg-colorA5 border-colorA5 text-colorB4"
                          : task.priority === "Low"
                          ? "bg-colorC3 border-colorC3 text-colorB4"
                          : ""
                      }`}
                    >
                      <p className="text-center text-sm font-medium">
                        {task.priority}
                      </p>
                    </div>

                    <div className="col-span-2 flex justify-center gap-4 items-center">
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
