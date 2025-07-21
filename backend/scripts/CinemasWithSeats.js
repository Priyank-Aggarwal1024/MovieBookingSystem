const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Cinema = require("../models/cinema.model");
const Movie = require("../models/movie.model");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const generateSeats = (rows = 6, cols = 7) => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = String.fromCharCode(65 + r);
    for (let c = 1; c <= cols; c++) {
      seats.push({ row, number: c, isAvailable: true });
    }
  }
  return seats;
};

const createShow = (date, time, movieId) => ({
  date,
  time,
  movie: movieId,
  seats: generateSeats(),
  totalSeats: 42,
});

const getRandomDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + Math.floor(Math.random() * 5)); // Today + 0 to 4 days
  return today.toISOString().split("T")[0]; // yyyy-mm-dd
};

const insertCinemas = async () => {
  try {
    const movies = await Movie.find();
    if (!movies.length) {
      console.error(
        "❌ Please insert at least one movie before adding cinemas."
      );
      process.exit(1);
    }

    const cinemaNames = [
      "PVR Saket",
      "INOX City Centre",
      "Cinepolis Manjeera",
      "Carnival Cinemas",
      "Wave Cinemas",
      "SRS Cinemas",
      "Miraj Cinemas",
      "DT Cinemas",
      "MovieTime Rajouri",
      "INOX Nehru Place",
      "M2K Cinemas",
      "PVR Ambience",
    ];

    const locations = [
      "Delhi",
      "Kolkata",
      "Hyderabad",
      "Bangalore",
      "Noida",
      "Gurgaon",
      "Chennai",
      "Pune",
      "Ahmedabad",
    ];

    const showTimes = ["10:00", "13:00", "16:00", "19:00"];

    const allCinemas = [];

    for (const movie of movies) {
      const selectedCinemas = [...cinemaNames]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4); // Pick 4 random cinemas for each movie

      const movieCinemas = [];

      for (const cinemaName of selectedCinemas) {
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        const date = getRandomDate();
        const shows = showTimes.map((time) =>
          createShow(date, time, movie._id)
        );

        const cinema = new Cinema({ name: cinemaName, location, shows });
        await cinema.save();

        movie.cinemas.push(cinema._id);
        movieCinemas.push(cinema);
      }

      await movie.save();
      allCinemas.push(...movieCinemas);
    }

    console.log(
      `🎬 Inserted ${allCinemas.length} cinemas across ${movies.length} movies`
    );
    process.exit();
  } catch (err) {
    console.error("❌ Failed to insert cinemas:", err);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await insertCinemas();
})();
