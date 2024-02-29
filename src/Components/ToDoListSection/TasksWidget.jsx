import { useTasks } from "../../ContextAPI/TasksContext";

function TasksWidget() {
  const { groupedTasks, checkedTasks, generateTaskIdentifier } = useTasks();

  // Function to compare dates
  const compareDates = (a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  };

  const upcomingTasks = Object.entries(groupedTasks)
    .sort(compareDates)
    .slice(0, 2)
    .map(([date, tasks]) =>
      tasks
        .filter(
          (task, index) =>
            !checkedTasks.includes(generateTaskIdentifier(task, index))
        )
        .slice(0, 2)
    )
    .flat();

  return (
    <div className="cursor-pointer p-5 bg-colorH4 rounded-md shadow-xl h-full">
      <p className="text-lg font-semibold text-colorB4">📝 Upcoming Plans: </p>

      <div className="mt-3">
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map((task, index) => (
            <div key={index}>
              {index !== 0 && <div style={{ marginBottom: "20px" }}></div>}

              <ul>
                <li>
                  <p className="text-xs text-colorB4 font-semibold">
                    {task.date}
                  </p>

                  <div
                    className={`mt-2 flex p-2 flex-row rounded-lg justify-center gap-5 ${
                      task.priority === "High"
                        ? "border-l-8 border-colorC2"
                        : task.priority === "Medium"
                        ? " border-colorA5 border-l-8"
                        : task.priority === "Low"
                        ? " border-colorC3 border-l-8"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-colorI1">
                        {task.name}
                      </p>
                    </div>

                    <p className="text-xs font-medium text-colorI1">
                      {task.startTime} - {task.endTime}
                    </p>

                    <p className="text-sm font-semibold text-colorI1">
                      {task.priority}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p className="text-sm flex font-semibold text-colorB4">
            Everything's all set, no tasks ahead! Take a moment to breathe and
            enjoy your day.
          </p>
        )}
      </div>
    </div>
  );
}

export default TasksWidget;
