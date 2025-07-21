const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Movie = require("../models/movie.model");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

const importMovies = async () => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../data/movies.json")
    );
    const moviesArray = JSON.parse(rawData);

    const formattedMovies = moviesArray.map((movie) => ({
      title: movie.title,
      description: movie.plot,
      posterUrl: movie.poster,
      duration: movie.runtime,
      language: movie.languages?.[0] || "English",
      cinemas: [],
    }));

    await Movie.insertMany(formattedMovies);
    console.log(`🎬 Inserted ${formattedMovies.length} movies`);
    process.exit();
  } catch (err) {
    console.error("Insert failed:", err.message);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await importMovies();
})();
