function TimeTrackerPage() {
  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-5 lg:justify-between">
      <div className="lg:col-span-9 lg:row-span-9 bg-colorJ1">
        <p>Welcome1</p>
      </div>

      <div className="lg:col-span-3 lg:row-span-9 bg-colorJ2">
        <p>Welcome2</p>
      </div>

      <div className="lg:col-span-12 lg:row-span-3 bg-colorJ3">
        <p>Welcome3</p>
      </div>
    </div>
  );
}

export default TimeTrackerPage;
