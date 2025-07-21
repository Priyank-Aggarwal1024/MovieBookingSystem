const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: "Cinema" },
  date: String,
  time: String,
  seats: [{ row: String, number: Number }],
  paymentStatus: { type: String, default: "pending" },
  userId: String,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
  customBookingId: String,
});

module.exports = mongoose.model("Booking", BookingSchema);
