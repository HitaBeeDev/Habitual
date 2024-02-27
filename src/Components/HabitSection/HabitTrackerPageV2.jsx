function HabitTrackerPageV2() {
  return (
    <div className="lg:mt-5 lg:mb-5 mt-20 w-full grid grid-rows-[auto,1fr,auto] gap-1 bg-colorD3">
      <div className="flex flex-row justify-between">
        <p>HELLO</p>
        <div>
          <input type="text" />
          <button>ADD</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-2 text-center bg-colorA1">HABITS</div>
        <div className="col-span-1 text-center bg-colorA2">MONDAY</div>
        <div className="col-span-1 text-center bg-colorA3">TUESDAY</div>
        <div className="col-span-1 text-center bg-colorA4">WEDNESDAY</div>
        <div className="col-span-1 text-center bg-colorA5">THURSDAY</div>
        <div className="col-span-1 text-center bg-colorB1">FRIDAY</div>
        <div className="col-span-1 text-center bg-colorB2">SATURDAY</div>
        <div className="col-span-1 text-center bg-colorB3">SUNDAY</div>
        <div className="col-span-1 text-center bg-colorB4">edit</div>
        <div className="col-span-1 text-center bg-colorB5">delete</div>
        <div className="col-span-1 text-center bg-colorC1">STATUS</div>
      </div>

      <div>STATUS</div>
    </div>
  );
}

export default HabitTrackerPageV2;
