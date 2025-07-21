const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie.controller");
const cinemaController = require("../controllers/cinema.controller");
const bookingController = require("../controllers/booking.controller");

router.get("/movies", movieController.getAllMovies);
router.get("/cinemas/showtimes/:movieId", cinemaController.getShowtimesByMovie);
router.post("/bookings", bookingController.createBooking);
router.get("/bookings/last", bookingController.getLastBookingStatus);

module.exports = router;
