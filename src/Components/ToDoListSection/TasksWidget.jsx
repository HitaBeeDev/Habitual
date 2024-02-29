import { useTasks } from "../../ContextAPI/TasksContext";

function TasksWidget() {
  const { groupedTasks, checkedTasks, generateTaskIdentifier } = useTasks();

  // Function to compare dates
  const compareDates = (a, b) => {
    return new Date(a[0]) - new Date(b[0]);
  };

  return (
    <div className="cursor-pointer p-5 bg-colorJ24 rounded-md shadow-xl h-full">
      <p className="text-lg font-semibold text-colorJ11">📝 Upcoming Plans: </p>

      <div className="mt-3">
        {Object.entries(groupedTasks)
          .sort(compareDates)
          .slice(0, 2) // Limit to first 2 groups
          .map(([date, tasks], index) => (
            <div key={date}>
              {index !== 0 && <div style={{ marginBottom: "20px" }}></div>}

              <ul>
                {tasks
                  .filter(
                    (task, index) =>
                      !checkedTasks.includes(
                        generateTaskIdentifier(task, index)
                      )
                  )
                  .slice(0, 2)
                  .map((task, index) => (
                    <li key={index}>
                      <p className="text-xs text-colorJ11 font-semibold">
                        {date}
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
                          <p className="text-sm font-semibold text-colorJ26">
                            {task.name}
                          </p>
                          <p className="text-xs font-normal text-colorJ26">
                            {task.description}
                          </p>
                        </div>

                        <p className="text-xs font-medium text-colorJ26">
                          {task.startTime} - {task.endTime}
                        </p>

                        <p className="text-sm font-semibold text-colorJ26">
                          {task.priority}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TasksWidget;
