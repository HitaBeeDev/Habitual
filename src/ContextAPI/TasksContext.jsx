import { createContext, useContext, useState, useEffect } from "react";
import usePersistentState from "../usePersistentState";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [tasks, setTasks] = usePersistentState("tasks", []);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    priority: "",
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getCurrentDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTask({
      name: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      priority: "",
    });
  };

  const handleTaskAddition = () => {
    setTasks([...tasks, newTask]);
    handleCloseModal();
  };

  const handleTaskSave = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editTaskIndex] = newTask;
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditTaskIndex(null);
    handleCloseModal();
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleTaskEditClick = (index) => {
    setIsEditing(true);
    setEditTaskIndex(index);
    setNewTask({ ...tasks[index] });
    setShowModal(true);
  };

  const handleTaskCancelClick = () => {
    setIsEditing(false);
    setShowModal(false);
  };

  const handleTaskSaveClick = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editTaskIndex] = newTask;
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditTaskIndex(null);
    setShowModal(false);
  };

  const updateNewTask = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  // Group tasks by date
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.date] = [...(acc[task.date] || []), task];
    return acc;
  }, {});

  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleCheckboxChange = (taskIdentifier) => {
    const newCheckedTasks = [...checkedTasks];
    if (newCheckedTasks.includes(taskIdentifier)) {
      newCheckedTasks.splice(newCheckedTasks.indexOf(taskIdentifier), 1);
    } else {
      newCheckedTasks.push(taskIdentifier);
    }
    setCheckedTasks(newCheckedTasks);
  };

  const sortedTasks = Object.entries(groupedTasks).sort(([dateA], [dateB]) => {
    const dateAObj = new Date(dateA);
    const dateBObj = new Date(dateB);
    return dateAObj - dateBObj;
  });

  const generateTaskIdentifier = (task, index) =>
    `${task.name}-${task.description}-${index}`;

  return (
    <TaskContext.Provider
      value={{
        tasks,
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
        checkedTasks,
        handleCheckboxChange,
        sortedTasks,
        generateTaskIdentifier,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
