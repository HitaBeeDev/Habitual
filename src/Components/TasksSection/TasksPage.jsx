import React, { useState } from "react";

function TasksPage() {
  const [showModal, setShowModal] = useState(false);

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
  };

  return (
    <div className="mt-5 mb-5 ml-16 w-full grid grid-cols-12 gap-5 justify-between bg-colorD3 h-11/12 lg:-ml-0">
      <div className="col-span-8 bg-colorA4">
        <div className="flex flex-row justify-between">
          <p className="text-left">Hi, Welcome ...</p>

          <select>
            <option value="all">Yesterday</option>
            <option value="all">Today</option>
            <option value="all">Tomorrow</option>
          </select>

          <button onClick={handleAddButtonClick}>ADD</button>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white">
                <button
                  className="absolute top-0 right-0 p-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>

              <div>
                <input type="text" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-colorA1">
          <p>Today is {getCurrentDate()}</p>

          <ul>
            <div className="flex flex-row justify-between">
              <input type="checkbox" />
              <p>task name</p>
              <p>10:00 - 12:00</p>
              <p>TAG</p>
              <button>Customize</button>
            </div>
          </ul>
        </div>
      </div>

      <div className="col-span-4 bg-colorA3">
        <p>Upcoming Tasks</p>

        <ul>
          <div className="flex flex-row justify-between">
            <p>task name</p>
            <p>10:00 - 12:00</p>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default TasksPage;
