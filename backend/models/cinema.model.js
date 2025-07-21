const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  row: String,
  number: Number,
  isAvailable: { type: Boolean, default: true },
});

const ShowSchema = new mongoose.Schema({
  date: String,
  time: String,
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  seats: [SeatSchema],
  totalSeats: Number,
});

const CinemaSchema = new mongoose.Schema({
  name: String,
  location: String,
  shows: [ShowSchema],
});

module.exports = mongoose.model("Cinema", CinemaSchema);
