import { useTasks } from "../../ContextAPI/TasksContext";

function UpcomingTasks() {
  const { groupedTasks, checkedTasks, generateTaskIdentifier } = useTasks();

  return (
    <div className="col-span-4 bg-colorB3/20 shadow-xl rounded-lg p-3">
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

                    <div className="shadow-xl rounded-lg p-3 bg-colorB1 grid grid-cols-12 gap-1 mt-2 items-center justify-between">
                      <p className="col-span-4 text-center text-xs font-semibold text-colorB4 h-7 p-1 rounded-lg border-2 border-colorB2">
                        {task.name}
                      </p>

                      <p className="col-span-3 text-center text-[0.4rem] font-semibold text-colorB4 h-7 p-1 rounded-lg border-2 border-colorB2">
                        {task.description}
                      </p>

                      <p className="col-span-3 text-center text-[0.6rem] font-semibold text-colorB4 h-7 p-1 rounded-lg border-2 border-colorB2">
                        {task.startTime} - {task.endTime}
                      </p>

                      <p
                        className={`col-span-2 text-center text-xs font-semibold text-colorB4 h-7 p-1 rounded-lg border-2 border-colorB2 ${
                          task.priority === "High"
                            ? "bg-colorC2 border-colorC2"
                            : task.priority === "Medium"
                            ? "bg-colorA5 border-colorA5"
                            : task.priority === "Low"
                            ? "bg-colorC3 border-colorC3"
                            : ""
                        }`}
                      >
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

export default UpcomingTasks;
