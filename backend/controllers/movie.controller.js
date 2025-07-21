const Movie = require("../models/movie.model");

exports.getAllMovies = async (req, res) => {
  try {
    const { limit } = req.query;
    const movies = await Movie.find();
    if (limit && !isNaN(limit)) {
      return res.status(200).json(movies.slice(0, limit));
    }
    return res.status(200).json(movies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
