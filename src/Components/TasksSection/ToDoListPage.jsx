import { useTasks } from "../../ContextAPI/TasksContext";

function ToDoListPage() {
  const {
    tasks = [],
    showModal,
    isEditing,
    editTaskIndex,
    newTask,
    getCurrentDate,
    handleAddButtonClick,
    handleCloseModal,
    handleTaskAddition,
    handleTaskSave,
    handleTaskDelete,
    handleTaskEditClick,
    handleTaskCancelClick,
    handleTaskSaveClick,
    updateNewTask,
    groupedTasks,
  } = useTasks();

  const sortedTasks = Object.entries(groupedTasks).sort(([dateA], [dateB]) => {
    const dateAObj = new Date(dateA);
    const dateBObj = new Date(dateB);
    return dateAObj - dateBObj;
  });

  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:justify-between bg-colorD3">
      <div className="col-span-8 bg-colorA4">
        <div className="flex flex-row justify-between">
          <p className="text-left">Hi, Welcome ...</p>
          <button onClick={handleAddButtonClick}>ADD</button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="relative w-1/2 h-1/2 bg-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center m-auto">
              <button
                className="absolute top-0 p-5 right-0 m-3"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <div className="bg-colorB1 flex flex-col">
                <div className="flex flex-row">
                  <label>Create New Task</label>
                  <input
                    type="text"
                    placeholder="Enter task name"
                    className="text-center"
                    value={newTask.name}
                    onChange={(e) => updateNewTask("name", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="text-center"
                    value={newTask.description}
                    onChange={(e) =>
                      updateNewTask("description", e.target.value)
                    }
                  />
                  <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => updateNewTask("date", e.target.value)}
                  />
                  <div>
                    <label>Start time</label>
                    <input
                      type="time"
                      value={newTask.startTime}
                      onChange={(e) =>
                        updateNewTask("startTime", e.target.value)
                      }
                    />
                    <label>Finish time</label>
                    <input
                      type="time"
                      value={newTask.endTime}
                      onChange={(e) => updateNewTask("endTime", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <p>Select Tag:</p>
                  <button onClick={() => updateNewTask("priority", "High")}>
                    High Priority
                  </button>
                  <button onClick={() => updateNewTask("priority", "Medium")}>
                    Medium Priority
                  </button>
                  <button onClick={() => updateNewTask("priority", "Low")}>
                    Low Priority
                  </button>
                </div>
              </div>
              <button
                className="p-5 m-3"
                onClick={isEditing ? handleTaskSave : handleTaskAddition}
              >
                {isEditing ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </div>
        )}

        <div className="bg-colorA1">
          {sortedTasks.map(([date, tasks], index) => (
            <div key={date}>
              {index !== 0 && <div style={{ marginBottom: "20px" }}></div>}
              <p>{date}</p>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <div className="flex flex-row justify-between">
                      <p>
                        {isEditing && editTaskIndex === index ? (
                          <input
                            type="text"
                            value={newTask.name}
                            onChange={(e) =>
                              updateNewTask("name", e.target.value)
                            }
                          />
                        ) : (
                          task.name
                        )}
                      </p>
                      <p>
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
                      <p>
                        {task.date}, {task.startTime} - {task.endTime}
                      </p>
                      <p>{task.priority}</p>

                      {isEditing && editTaskIndex === index ? (
                        <>
                          <button onClick={handleTaskSaveClick}>Save</button>
                          <button onClick={handleTaskCancelClick}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleTaskEditClick(index)}>
                            Edit
                          </button>
                          <button onClick={() => handleTaskDelete(index)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4 bg-colorA3">
        <div className="bg-colorB1">
          {Object.entries(groupedTasks).map(([date, tasks], index) => (
            <div key={date}>
              {index !== 0 && <div style={{ marginBottom: "20px" }}></div>}
              <p>{date}</p>
              <ul>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <div className="flex flex-row justify-between">
                      <p>{task.name}</p>
                      <p>{task.description}</p>
                      <p>
                        {task.startTime} - {task.endTime}
                      </p>
                      <p>{task.priority}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToDoListPage;
