const express = require("express");
const router = express.Router();

const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  return res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).sort("name");

  if (!movie) {
    return res
      .status(404)
      .json({ error: "The movie with given ID wasn't found." });
  }

  return res.json(movie);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).json({ error: "Invalid genre." });
  }

  const movie = await Movie.create({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  return res.json(movie);
});

router.put("/:id", async (req, res) => {
  const { validationError } = validateMovie(req.body);
  if (validationError) {
    return res.status(400).json(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).json({ error: "Invalid genre." });
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!movie) {
    return res
      .status(404)
      .json({ error: "The movie with the given ID was not found." });
  }

  return res.json(movie);
});

router.delete("/", (req, res) =>
  res.status(400).json({ error: "Missing ID parameter." })
);

router.delete("/:id", async (req, res) => {
  const deletedMovie = await Movie.findByIdAndRemove(req.params.id);

  if (!deletedMovie) {
    return res
      .status(404)
      .json({ error: "The movie with given ID wasn't found." });
  }

  return res.json(deletedMovie);
});

module.exports = router;
