import { useEffect, useRef, useState } from "react";
import axios from "axios";
import paymentSvg from "../assets/payment-status.svg";

import MessageList from "./MessageList";

const MovieMateOptions = () => {
  const mainRef = useRef(null);
  const options = { hour: "numeric", minute: "2-digit", hour12: true };

  const [messages, setMessages] = useState([
    { type: "Options", date: new Date().toLocaleTimeString([], options) },
  ]);
  const [selectedShow, setSelectedShow] = useState({
    cinemaId: null,
    showId: null,
  });
  const [selectedSeat, setSelectedSeat] = useState([]);

  const fetchMovie = async (limit) => {
    try {
      const url = limit
        ? `${import.meta.env.VITE_BASE_URL}/movies?limit=${limit}`
        : `${import.meta.env.VITE_BASE_URL}/movies`;
      const res = await axios.get(url);
      return res.status === 200 ? res.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchMovieClick = async (message) => {
    const movies = await fetchMovie();
    setMessages((prev) => [
      ...prev,
      { ...message, type: "Book Movie" },
      {
        type: "Show Movies",
        movies,
        date: new Date().toLocaleTimeString([], options),
      },
    ]);
  };

  const onMovieSelect = async (movie) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/cinemas/showtimes/${movie._id}`
      );
      setMessages((prev) => [
        ...prev,
        {
          type: "Show Movies Details",
          movie,
          data: res.data,
          date: new Date().toLocaleTimeString([], options),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "Show Movies Details",
          movie,
          date: new Date().toLocaleTimeString([], options),
        },
      ]);
    }
  };

  const handlePayment = ({ movieId, cinemaId, showId, movie, cinema }) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "Payment",
        seats: selectedSeat,
        movieId,
        cinemaId,
        showId,
        movie,
        cinema,
        date: new Date().toLocaleTimeString([], options),
      },
    ]);
    setSelectedSeat([]);
  };

  const onPayNow = async ({
    movieId,
    cinemaId,
    showId,
    totalAmount,
    seats,
  }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bookings`,
        {
          movieId,
          cinemaId,
          showId,
          seats,
          totalAmount,
        }
      );
      if (res.data.message === "Booking successful") {
        setMessages((prev) => [
          ...prev,
          {
            type: "Show Ticket",
            ...res.data.bookingDetails,
            date: new Date().toLocaleTimeString([], options),
          },
        ]);
        fetchLastBooking();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLastBooking = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/bookings/last`
      );
      if (res.data.success) {
        localStorage.setItem("lastBooking", JSON.stringify(res.data.booking));
        return res.data.booking;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleClickLastBooking = async () => {
    const booking = await fetchLastBooking();
    if (booking) {
      setMessages((prev) => [
        ...prev,
        {
          type: "Last Payment Status",
          icon: paymentSvg,
          booking,
          date: new Date().toLocaleTimeString([], options),
        },
      ]);
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const lastBooking = JSON.parse(localStorage.getItem("lastBooking"));
    if (lastBooking && messages[0].type != "Last Payment Status") {
      setMessages((prev) => [
        {
          type: "Last Payment Status",
          booking: lastBooking,
          date: new Date().toLocaleTimeString([], options),
        },
        ...prev,
      ]);
    }
  }, []);
  console.log(messages);
  return (
    <div
      className="w-full h-full overflow-y-auto flex flex-col bg-gray-50 scroll-smooth"
      ref={mainRef}
    >
      <div className="flex items-center gap-2 w-full mx-auto mb-9 pt-6 px-6">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="text-sm font-semibold text-black/80">Today</span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      <MessageList
        messages={messages}
        setMessages={setMessages}
        onMovieSelect={onMovieSelect}
        fetchMovie={fetchMovie}
        fetchMovieClick={fetchMovieClick}
        handleClickLastBooking={handleClickLastBooking}
        setSelectedShow={setSelectedShow}
        selectedShow={selectedShow}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
        handlePayment={handlePayment}
        onPayNow={onPayNow}
      />
    </div>
  );
};

export default MovieMateOptions;
