import { useTasks } from "../../ContextAPI/TasksContext";

function UpcomingTasks() {
  const { groupedTasks, checkedTasks, generateTaskIdentifier } = useTasks();

  return (
    <div
      style={{
        maxHeight: "665px",
      }}
      className="col-span-3 bg-colorJ26 shadow-xl rounded-lg p-3"
    >
      <p className="text-sm font-semibold mb-3">Upcoming Tasks</p>

      <div>
        {Object.entries(groupedTasks).map(([date, tasks], index) => (
          <div key={date}>
            {index !== 0 && <div style={{ marginBottom: "20px" }}></div>}

            <ul>
              {tasks
                .filter(
                  (task, index) =>
                    !checkedTasks.includes(generateTaskIdentifier(task, index))
                )
                .map((task, index) => (
                  <li key={index}>
                    <p className="text-xs font-semibold text-colorB4">{date}</p>

                    <div
                      className={`shadow-xl rounded-lg p-3 pr-5 bg-colorB1 flex flex-row gap-1 mt-2 items-center 
                      justify-between  ${
                        task.priority === "High"
                          ? "border-l-8 border-colorC2"
                          : task.priority === "Medium"
                          ? " border-colorA5"
                          : task.priority === "Low"
                          ? " border-colorC3"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-2 justify-start items-start pl-1">
                        <p className="text-center text-sm font-semibold text-colorJ1">
                          {task.name}
                        </p>

                        <p className="text-center text-xs text-colorJ1">
                          {task.description}
                        </p>
                      </div>

                      <p className="text-center text-sm font-semibold text-colorJ1">
                        {task.startTime} - {task.endTime}
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

export default UpcomingTasks;
