const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const mongoose = require("mongoose");

const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const result = await Rental.find().sort("-dateOut");
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await Rental.findById(req.params.id);
  return res.json(result);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(400).json({ error: "Costumer ID doesn't exist." });

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).json({ error: "Movie ID doesn't exist." });

  if (movie.numberInStock === 0)
    return res.status(400).json({ error: "Movie not in stock." });

  const newRental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save("rentals", newRental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();

    return res.json(newRental);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
