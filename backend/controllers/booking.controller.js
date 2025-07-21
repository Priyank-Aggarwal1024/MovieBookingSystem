const Booking = require("../models/booking.model");
const Cinema = require("../models/cinema.model");

exports.createBooking = async (req, res) => {
  const { movieId, cinemaId, showId, seats, totalAmount } = req.body;

  if (
    !movieId ||
    !cinemaId ||
    !showId ||
    !seats ||
    !totalAmount ||
    !Array.isArray(seats) ||
    isNaN(totalAmount)
  ) {
    return res.status(400).json({ error: "Missing or invalid booking fields" });
  }

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    const show = cinema.shows.find((s) => s._id == showId);
    if (!show) {
      return res
        .status(404)
        .json({ error: "Show not found for the given date and time" });
    }

    for (let seat of seats) {
      const foundSeat = show.seats.find(
        (s) => s.row === seat.row && s.number === seat.number && s.isAvailable
      );
      if (!foundSeat) {
        return res
          .status(409)
          .json({ error: "Some seats are already booked or invalid" });
      }
    }

    for (let seat of seats) {
      const index = show.seats.findIndex(
        (s) => s.row === seat.row && s.number === seat.number
      );
      show.seats[index].isAvailable = false;
    }

    await cinema.save();

    const booking = await Booking.create({
      movie: movieId,
      cinema: cinemaId,
      date: show.date,
      time: show.time,
      seats,
      paymentStatus: "done",
      totalAmount: Number(totalAmount),
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("movie", "title")
      .populate("cinema", "location name");

    const cinemaCode = populatedBooking.cinema.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const shortId = populatedBooking._id.toString().slice(-6);
    const customBookingId = `${cinemaCode}${shortId}`;

    booking.customBookingId = customBookingId;
    await booking.save();

    return res.status(201).json({
      message: "Booking successful",
      bookingDetails: {
        bookingId: customBookingId,
        movieTitle: populatedBooking.movie.title,
        cinemaLocation: populatedBooking.cinema.location,
        bookingDate: populatedBooking.date,
        time: populatedBooking.time,
        totalAmount: populatedBooking.totalAmount,
        seats: populatedBooking.seats,
      },
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLastBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findOne()
      .sort({ createdAt: -1 })
      .populate("movie", "title")
      .populate("cinema", "location name");

    if (!booking) {
      return res.status(404).json({ error: "No bookings found" });
    }

    const cinemaCode = booking.cinema.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const shortId = booking._id.toString().slice(-6);
    const customBookingId = `${cinemaCode}${shortId}`;

    if (!booking.customBookingId) {
      booking.customBookingId = customBookingId;
      await booking.save();
    }
    const formattedDate = new Date(booking.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return res.status(200).json({
      booking: {
        bookingId: booking.customBookingId,
        movieTitle: booking.movie.title,
        cinemaLocation: booking.cinema.location,
        bookingDate: formattedDate,
        time: booking.time,
        totalAmount: booking.totalAmount,
        seats: booking.seats,
      },
      success: true,
    });
  } catch (err) {
    console.error("Error fetching last booking:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
