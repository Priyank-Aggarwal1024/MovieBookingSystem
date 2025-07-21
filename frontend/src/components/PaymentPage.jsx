import { useEffect, useState } from "react";
import qrSvg from "../assets/qr.png"; // Replace this with actual QR URL if using a real API

const PaymentPage = ({ booking, onPayNow }) => {
  const { movie, cinema, seats } = booking;

  const seatLabels = seats.map((s) => `${s.row}${s.number}`).join(", ");
  const totalAmount = seats.length * 240;

  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="max-w-[758px] min-h-[490px] w-full relative bg-white rounded-xl overflow-hidden p-3">
      <div className="w-full min-h-48 bg-gray-50 rounded-md p-6">
        <div className="w-full inline-flex justify-between items-center">
          <div className="w-48 inline-flex flex-col justify-center items-start gap-2.5">
            <div className="text-[#333333] text-base leading-normal">Movie</div>
            <div className="text-[#333333] text-base leading-normal">
              Cinemas
            </div>
            <div className="text-[#333333] text-base leading-normal">Time</div>
            <div className="text-[#333333] text-base leading-normal">Seats</div>
          </div>
          <div className="w-48 inline-flex flex-col justify-center items-end gap-2.5">
            <div className="text-right text-[#333333] text-base font-medium leading-normal">
              {movie.title}
            </div>
            <div className="text-right text-[#333333] text-base font-medium leading-normal">
              {cinema.name}
            </div>
            <div className="text-right text-[#333333] text-base font-medium leading-normal">
              Today | 10:30 AM
            </div>
            <div className="text-right text-[#333333] text-base font-medium leading-normal">
              {seatLabels}
            </div>
          </div>
        </div>
        <div className="w-full my-3 h-px bg-black/25" />
        <div className="w-full inline-flex justify-between items-center">
          <div className="w-48 text-[#333333] text-base font-semibold leading-normal">
            Total Amount
          </div>
          <div className="w-48 text-right text-[#333333] text-base font-semibold leading-normal">
            ₹{totalAmount}
          </div>
        </div>
      </div>

      <div className="w-full p-2.5 bg-white rounded-2xl flex flex-col items-center gap-4 mt-6">
        {/* Replace with actual QR code from payment API if available */}
        <img className="h-36 w-36" src={qrSvg} alt="QR Code" />

        <button
          onClick={() => onPayNow(totalAmount)}
          className="px-6 py-2.5 bg-[#263fa8] text-white rounded-xl text-base font-semibold cursor-pointer"
        >
          Pay Now
        </button>
      </div>

      <div className="pt-2 text-center text-[#505050] text-base font-medium">
        Please scan to pay using any UPI app.
      </div>

      <div className="w-[calc(100%+24px)] -ml-3 mt-[22px] p-2.5 bg-[#fefcea] inline-flex justify-center items-center gap-2.5">
        <div className="size-6 relative overflow-hidden rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM13 12V7H11V14H17V12H13Z"
              fill="#E79924"
              fillOpacity="0.63"
            />
          </svg>
        </div>
        <div className="text-[#505050] text-sm font-medium leading-tight">
          Payment session expires in {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
