import qr2Svg from "../assets/qr2.svg";
const TicketCard = ({
  movieTitle,
  seat,
  cinemaLocation,
  date,
  time,
  orderId,
}) => {
  return (
    <div className="min-w-[272px] w-[272px] bg-white rounded-xl overflow-hidden shadow-md rounded-[11.71px] border-[0.781px] border-[#1B1E25] bg-white">
      <div className="rounded-md p-4 w-full max-w-full">
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#333]">
          <div>
            <p>{movieTitle}</p>
          </div>
          <div className="text-left text-[#f14763]">e-ticket</div>

          <div>
            <p className="text-[#707070]">Date</p>
            <p>
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-[#707070]">Seats</p>
            <p>
              {seat.row}
              {seat.number}
            </p>
          </div>

          <div>
            <p className="text-[#707070]">Location</p>
            <p>{cinemaLocation}</p>
          </div>
          <div>
            <p className="text-[#707070]">Time</p>
            <p>{time}</p>
          </div>

          <div>
            <p className="text-[#707070]">Payment</p>
            <p className="text-green-600">Successful</p>
          </div>
          <div>
            <p className="text-[#707070]">Order</p>
            <p>{orderId}</p>
          </div>
        </div>

        <div className="mb-4 mt-8 border-[#1b1e25] border-dashed relative w-full border-[1px]">
          <div className="w-[34px] h-[34px] rounded-full bg-[#f4f9ff] border-[0.781px] border-[#1B1E25] absolute -translate-x-[calc(50%+17px)] -translate-y-1/2 z-[2]"></div>
          <div className="w-[34px] h-[34px] rounded-full bg-[#f4f9ff] border-[0.781px] border-[#1B1E25] absolute right-0 translate-x-[calc(50%+17px)] -translate-y-1/2 z-[2]"></div>
        </div>

        <img src={qr2Svg} alt="QR Code" />
      </div>
    </div>
  );
};

const TicketList = ({ booking }) => {
  return (
    <div className="w-fit py-4 px-[22px] bg-white rounded-[12px] max-w-[1024px] flex flex-col gap-4">
      <div className="flex justify-between text-base font-medium text-[#333] ">
        <span>Booking ID</span>
        <span>{booking.bookingId}</span>
      </div>
      <div className="w-fit flex items-center max-w-full overflow-x-auto bg-[#f4f9ff] p-4 gap-3 scrollbar-none rounded-[7px]">
        {booking.seats.map((seat) => (
          <TicketCard
            key={seat._id}
            movieTitle={booking.movieTitle}
            cinemaLocation={booking.cinemaLocation}
            date={booking.bookingDate}
            time={booking.time}
            seat={seat}
            orderId={seat._id.slice(-6)}
          />
        ))}
      </div>
      <div className="w-full max-w-[272px] h-[51px] flex items-center justify-center bg-[#263fa8] rounded-xl py-2 text-center text-white text-base font-medium cursor-pointer">
        Download E-Ticket
      </div>
    </div>
  );
};

export default TicketList;
