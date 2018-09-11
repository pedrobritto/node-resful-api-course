const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { Genre, validateGenre } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  return res.json(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newGenre = await Genre.create(req.body);
    return res.json(newGenre);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(genre);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  const deletedGenre = await Genre.findByIdAndRemove(req.params.id);

  if (!deletedGenre) {
    return res.status(404).json({ error: "Genre with given ID wasn't found." });
  }

  return res.json(deletedGenre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(404).json({ error: "Genre with given ID wasn't found." });
  }

  return res.json(genre);
});

module.exports = router;
