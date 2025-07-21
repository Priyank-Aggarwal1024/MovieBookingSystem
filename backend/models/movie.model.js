const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  duration: Number,
  language: String,
  cinemas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cinema" }],
});

module.exports = mongoose.model("Movie", MovieSchema);
