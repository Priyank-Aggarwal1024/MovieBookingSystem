import MovieRecommendations from "./MovieRecommendations";
import ShowTimeSelector from "./ShowTimeSelector";
import SeatSelection from "./SeatSelection";
import PaymentPage from "./PaymentPage";
import TicketList from "./TicketList";
import FAQSection from "./FAQSection";
import botSvg from "../assets/bot.svg";
import ticketSvg from "../assets/ticket.svg";
import paymentSvg from "../assets/payment-status.svg";
import cameraSvg from "../assets/camera.svg";
import faqSvg from "../assets/faq.svg";

const MessageList = ({
  messages,
  setMessages,
  fetchMovie,
  fetchMovieClick,
  onMovieSelect,
  handleClickLastBooking,
  selectedShow,
  setSelectedShow,
  selectedSeat,
  setSelectedSeat,
  handlePayment,
  onPayNow,
}) => {
  const options = { hour: "numeric", minute: "2-digit", hour12: true };

  return (
    <>
      {messages.map((message, id) => {
        const date = message.date;
        const msgProps = {
          botIcon: (
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <img src={botSvg} alt="Bot Icon" />
            </div>
          ),
          dateDisplay: (
            <p className="text-right text-sm text-gray-500 mt-auto min-w-[64px]">
              {date}
            </p>
          ),
        };

        switch (message.type) {
          case "Options":
            const optionsArr = [
              {
                label: "Book Movie",
                icon: ticketSvg,
                onClick: (item) =>
                  fetchMovieClick({ type: item.label, icon: item.icon }),
              },
              {
                label: "Last Payment Status",
                icon: paymentSvg,
                onClick: () => handleClickLastBooking(),
              },
              {
                label: "Movie Info",
                icon: cameraSvg,
                onClick: async () => {
                  try {
                    const movies = await fetchMovie(4);
                    setMessages((prev) => [
                      ...prev,
                      { type: "Movie Info", movies: movies || [] },
                    ]);
                  } catch (err) {
                    setMessages((prev) => [
                      ...prev,
                      { type: "Movie Info", movies: [] },
                    ]);
                  }
                },
              },
              {
                label: "Help / FAQ",
                icon: faqSvg,
                onClick: () =>
                  setMessages((prev) => [
                    ...prev,
                    {
                      type: "Show FAQ",
                      date: new Date().toLocaleTimeString([], options),
                    },
                  ]),
              },
            ];
            return (
              <div
                key={id}
                className="lg:px-[70px] md:px-[48px] px-6 mx-auto w-full py-6"
              >
                <div className="w-full flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-gray-800 font-medium text-base">
                      🎬 Welcome to MovieMate! How can I help you today?
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <div className="w-full max-w-md mr-auto bg-white rounded-xl p-5 divide-y divide-gray-100">
                  {optionsArr.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-5 p-4 cursor-pointer"
                      onClick={() => item.onClick(item)}
                    >
                      <div className="w-14 h-14 bg-[#F6F7F9] rounded-xl border border-[rgba(0,0,0,0.11)] flex items-center justify-center">
                        <img src={item.icon} alt={item.label} />
                      </div>
                      <span className="text-xl font-medium text-gray-900">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "Book Movie":
            return (
              <div className="lg:px-[70px] md:px-[48px] px-6 mx-auto w-full py-6">
                <div className="w-fit flex items-start gap-6 ml-auto">
                  <div className="bg-[#4e80ee] md:min-w-80 text-white p-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-xs shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#f6f7f9] rounded-2xl border border-black/10 flex items-center justify-center">
                        <img src={message.icon} alt={message.label} />
                      </div>
                      <span className="text-xl font-medium leading-7">
                        Book Movie
                      </span>
                    </div>
                  </div>
                  <div className="size-16 relative bg-[#6f6f6f] rounded-full flex items-center justify-center">
                    <div className="justify-start text-white text-4xl font-medium font-['Poppins']">
                      K
                    </div>
                  </div>
                </div>
              </div>
            );
          case "Show Movies":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Here are the movies currently playing in your area
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <MovieRecommendations
                  movies={message?.movies || []}
                  onSelect={onMovieSelect}
                />
              </div>
            );

          case "Show Movies Details":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Great choice! Please select a showtime for{" "}
                      <b>{message?.movie?.title}</b>
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                {message.data ? (
                  <ShowTimeSelector
                    cinemas={message.data || []}
                    onSelect={(cinemaId, showId, show, cinema) => {
                      setSelectedShow({ cinemaId, showId });
                      setMessages((prev) => [
                        ...prev,
                        {
                          type: "Show Seats",
                          cinemaId,
                          showId,
                          show,
                          movieId: message.movie._id,
                          movie: message.movie,
                          cinema,
                          date: new Date().toLocaleTimeString([], options),
                        },
                      ]);
                    }}
                    selectedShowId={selectedShow.showId}
                  />
                ) : (
                  <div className="flex gap-3 items-start mb-6">
                    {msgProps.botIcon}
                    <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                      <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                        No shows are available for the movie{" "}
                        <b>{message?.movie?.title}</b>
                      </p>
                      {msgProps.dateDisplay}
                    </div>
                  </div>
                )}
              </div>
            );

          case "Show Seats":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Here's the seat map for your selected show. Pick your
                      seats.
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <SeatSelection
                  show={message.show || {}}
                  setSelectedSeat={setSelectedSeat}
                  selectedSeat={selectedSeat}
                  onNext={() => handlePayment(message)}
                />
              </div>
            );

          case "Payment":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Scan the QR code below to make payment.
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <PaymentPage
                  booking={message}
                  onPayNow={(totalAmount) =>
                    onPayNow({ ...message, totalAmount })
                  }
                />
              </div>
            );

          case "Show Ticket":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      ✅ Payment received! Booking is confirmed.
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <TicketList booking={message} />
              </div>
            );

          case "Movie Info":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Here are the movies currently playing in your area
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <MovieRecommendations
                  movies={message?.movies || []}
                  onSelect={onMovieSelect}
                  showDescription={true}
                />
              </div>
            );

          case "Show FAQ":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-[510px] flex gap-6">
                    <p className="text-[#333] font-medium text-[18px] max-w-[340px]">
                      Here are some frequently asked questions:
                    </p>
                    {msgProps.dateDisplay}
                  </div>
                </div>
                <FAQSection />
              </div>
            );

          case "Last Payment Status":
            return (
              <div key={id} className="px-6 py-6 lg:px-[70px] md:px-[48px]">
                <div className="flex gap-3 items-start mb-6">
                  {msgProps.botIcon}
                  <div className="bg-[#E5EDF5] p-4 rounded-xl max-w-md flex flex-col gap-4">
                    <div className="text-[#333333] text-lg font-medium leading-relaxed">
                      Here's your last payment status:
                    </div>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-2.5 text-[#333333] opacity-80">
                          <div>Amount:</div>
                          <div>Status:</div>
                          <div>Time:</div>
                          <div>Movie:</div>
                        </div>
                        <div className="flex flex-col gap-2.5 text-right text-[#333333] font-medium">
                          <div>₹{message.booking.totalAmount}</div>
                          <div className="text-[#00b521] font-semibold">
                            Success
                          </div>
                          <div>{message.booking.bookingDate}</div>
                          <div>{message.booking.movieTitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default MessageList;
