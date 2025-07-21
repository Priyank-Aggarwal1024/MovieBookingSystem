const SeatSelection = ({
  show,
  selectedSeat = [],
  setSelectedSeat,
  onNext,
}) => {
  const rows = {};

  show.seats.forEach((seat) => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  Object.keys(rows).forEach((row) => {
    rows[row].sort((a, b) => a.number - b.number);
  });

  const handleSelect = (seat) => {
    setSelectedSeat((prev) => {
      const isAlreadySelected = prev.some((s) => s._id === seat._id);
      return isAlreadySelected
        ? prev.filter((s) => s._id !== seat._id)
        : [...prev, seat];
    });
  };

  const isSelected = (seatId) =>
    selectedSeat.some((seat) => seat._id === seatId);

  return (
    <div className="max-w-[1273px] w-full h-auto relative bg-white rounded-xl overflow-hidden px-8 py-6">
      <div className="flex justify-between items-end mb-6">
        <div className="w-48 flex flex-col gap-1">
          <div className="text-[#333] text-xl font-bold leading-7">
            {show.movie.title}
          </div>
          <div className="text-[#333] text-base font-medium">{`PVR Cinemas | ${show.time}`}</div>
        </div>
        <div className="text-[#4e80ee] text-base font-semibold">
          {new Date(show.date).toDateString()}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#d9d9d9] rounded-sm" />
          <span className="text-[#333] text-base">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#f6cccb] rounded-sm" />
          <span className="text-[#333] text-base">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#94c5ff] rounded-sm" />
          <span className="text-[#333] text-base">Selected</span>
        </div>
      </div>

      <div className="w-full h-8 bg-[#e4e4e4] flex items-center justify-center mb-5">
        <span className="uppercase text-[#333] font-medium">Screen</span>
      </div>

      <div className="flex flex-col gap-3">
        {Object.keys(rows)
          .sort()
          .map((rowKey) => (
            <div key={rowKey} className="flex justify-between items-center">
              <div className="min-w-12 text-[#333] font-medium">{rowKey}</div>
              <div className="flex gap-3 w-full">
                {rows[rowKey].map((seat) => {
                  let bgColor = "#f8f8f8";
                  if (!seat.isAvailable) bgColor = "#f6cccb";
                  else if (isSelected(seat._id)) bgColor = "#94c5ff";

                  return (
                    <div
                      key={seat._id}
                      onClick={() => seat.isAvailable && handleSelect(seat)}
                      className="flex-1 h-6 rounded-md border border-black/5 cursor-pointer transition-all text-center text-xs flex items-center justify-center"
                      style={{ backgroundColor: bgColor }}
                    >
                      {seat.number}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-6 py-2.5 bg-[#263fa8] text-white rounded-xl text-base font-medium cursor-pointer"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
