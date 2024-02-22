function ReportWidgets() {
  return (
    <div className="shadow-xl grid grid-rows-3 xl:h-full h-64 gap-3">
      <div className="rounded-md p-2 bg-colorA1">25 days Streak!</div>

      <div className="bg-colorA2 rounded-md p-2">
        5 / 7 habits of today is done! Bravo!
      </div>

      <div className="bg-colorA3 rounded-md p-2">
        72 hours of productivity this week!
      </div>
    </div>
  );
}

export default ReportWidgets;
