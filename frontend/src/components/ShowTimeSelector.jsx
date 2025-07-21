const ShowTimeSelector = ({ cinemas, selectedShowId, onSelect }) => {
  return (
    <div className="w-full max-w-[1273px] h-auto relative bg-white rounded-xl p-6 shadow-md">
      <div className="flex flex-col gap-6">
        {cinemas.map((cinema) => (
          <div key={cinema.name} className="flex flex-col gap-3">
            <div className="text-[#333] text-base font-medium opacity-80">
              {cinema.name} - {cinema.location}
            </div>

            <div className="flex flex-wrap gap-3">
              {cinema.shows.map((show) => {
                const isSelected = show._id === selectedShowId;
                return (
                  <div
                    key={show._id}
                    className={`w-72 py-2.5 rounded-xl outline-offset-[-1px] outline-black/5 inline-flex flex-col justify-center items-center cursor-pointer transition-colors ${
                      isSelected ? "bg-[#4e80ee]" : "bg-[#f8f8f8]"
                    }`}
                    onClick={() => onSelect(cinema._id, show._id, show, cinema)}
                  >
                    <div
                      className={`text-base font-medium  text-center ${
                        isSelected ? "text-white" : "text-[#333]"
                      }`}
                    >
                      {show.date}
                    </div>
                    <div
                      className={`text-base font-medium  text-center ${
                        isSelected ? "text-white" : "text-[#333]"
                      }`}
                    >
                      {show.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTimeSelector;
