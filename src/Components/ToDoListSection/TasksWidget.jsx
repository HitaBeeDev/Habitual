import { useTasks } from "../../ContextAPI/TasksContext";

function TasksWidget() {
  const { groupedTasks, checkedTasks, generateTaskIdentifier } = useTasks();

  return (
    <div className="cursor-pointer p-3 bg-colorA5 rounded-md shadow-xl h-full">
      <p>Upcoming Tasks</p>
      <div className="bg-colorB1">
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
                    <p>{date}</p>
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
  );
}

export default TasksWidget;
