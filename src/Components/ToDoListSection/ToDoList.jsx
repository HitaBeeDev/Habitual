import { useTasks } from "../../ContextAPI/TasksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import todoImage2 from "../../assets/todo3.png";

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

  if (sortedTasks.length === 0) {
    return (
      <div
        className="flex flex-col gap-3 justify-center items-center h-full bg-colorD4 rounded-lg shadow-xl mt-5 p-5"
        style={{
          maxHeight: "480px",
        }}
      >
        <img className="w-52" src={todoImage2} />
        <p className="text-lg text-colorC4 font-semibold">
          Looks like you're all caught up! No to-dos on the list right now!
        </p>
      </div>
    );
  }

  return (
    <div className="lg:block mt-5 bg-colorD4 rounded-lg shadow-xl p-1 pl-3 pr-3 lg:pl-10 lg:pr-10 pb-5">
      {sortedTasks.map(([date, tasks]) => (
        <div key={date}>
          <p className="text-sm font-semibold mb-2 mt-5">{date}</p>
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
                  <div
                    className={`lg:grid bg-colorB1 flex flex-row gap-1 p-3 h-24 
                  lg:grid-cols-12 lg:pl-8 lg:gap-5 items-center rounded-lg shadow-xl ${
                    task.priority === "High"
                      ? " border-colorC2 border-l-8"
                      : task.priority === "Medium"
                      ? " border-colorA5 border-l-8"
                      : task.priority === "Low"
                      ? " border-colorC3 border-l-8 "
                      : ""
                  }`}
                  >
                    <div className="col-span-5 flex flex-row lg:gap-5 gap-2 items-center">
                      <input
                        className={`cursor-pointer w-4 h-4 lg:w-6 lg:h-6 border border-colorD2 rounded-full ${
                          checkedTasks.includes(taskIdentifier)
                            ? "bg-colorD2"
                            : "bg-colorD3"
                        } appearance-none`}
                        type="checkbox"
                        checked={checkedTasks.includes(taskIdentifier)}
                        onChange={() => handleCheckboxChange(taskIdentifier)}
                      />

                      <div className="flex flex-col gap-1">
                        {isEditing && editTaskIndex === index ? (
                          <input
                            type="text"
                            value={newTask.name}
                            className="text-left"
                            onChange={(e) =>
                              updateNewTask("name", e.target.value)
                            }
                          />
                        ) : (
                          <p className="tracking-wider text-left text-xs lg:text-md font-bold text-colorC4">
                            {task.name}
                          </p>
                        )}

                        <p className="lg:text-sm text-xs font-normal text-colorC4 text-left">
                          {isEditing && editTaskIndex === index ? (
                            <input
                              type="text"
                              value={newTask.description}
                              className="text-left"
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

                    <div className="hidden col-span-2 lg:flex items-center justify-center">
                      <p className="text-center tracking-widest text-md font-medium text-colorC4">
                        {task.date}
                      </p>
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <p className="text-center lg:text-md text-xs tracking-widest	 font-medium text-colorC4">
                        {task.startTime} - {task.endTime}
                      </p>
                    </div>

                    <div
                      className={`hidden col-span-1 lg:flex items-center content-center justify-center rounded-lg w-24 h-9 ${
                        task.priority === "High"
                          ? "bg-colorC2 border-colorC2 text-colorA2"
                          : task.priority === "Medium"
                          ? "bg-colorA5 border-colorA5 text-colorC4"
                          : task.priority === "Low"
                          ? "bg-colorC3 border-colorC3 text-colorC4"
                          : ""
                      }`}
                    >
                      <p className="text-center text-sm font-medium">
                        {task.priority}
                      </p>
                    </div>

                    <div className="hidden col-span-2 lg:flex justify-center gap-4 items-center">
                      <button onClick={() => handleTaskEditClick(task.id)}>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-colorD2 text-center w-4 h-4"
                        />
                      </button>
                      <button onClick={() => handleTaskDelete(task.id)}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-colorD2 text-center w-4 h-4"
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
