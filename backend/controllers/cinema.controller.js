const Cinema = require("../models/cinema.model");

exports.getShowtimesByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const cinemas = await Cinema.find({ "shows.movie": movieId }).populate(
      "shows.movie"
    );

    if (!cinemas.length) {
      return res.status(404).json({ error: "No cinemas found for this movie" });
    }

    const result = cinemas.map((cinema) => ({
      _id: cinema._id,
      name: cinema.name,
      location: cinema.location,
      shows: cinema.shows.filter(
        (show) => show.movie._id.toString() === movieId
      ),
    }));

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching showtimes:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
