const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  }
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", (req, res) => {
  async function getAll(model) {
    try {
      const result = await model.find().sort("name");
      res.json(result);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  getAll(Genre);
});

router.post("/", (req, res) => {
  async function post(model, data) {
    try {
      await validateGenre(req.body);
      const newDocument = await model.create(data);

      return res.json(newDocument);
    } catch (err) {
      if (err.isJoi) {
        return res.status(400).json({ err: err.details[0].message });
      }
      return res.status(404).json(err);
    }
  }

  post(Genre, { name: req.body.name });
});

router.put("/:id", (req, res) => {
  async function put(model, id, data) {
    try {
      await validateGenre(req.body);
      const document = await model.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return res.json(document);
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(400).json({ err: err.details[0].message });
      }
      return res.status(404).json(err);
    }
  }

  put(Genre, req.params.id, req.body);
});

router.delete("/:id", (req, res) => {
  async function deleteById(model, id) {
    try {
      const document = await model.findByIdAndRemove(id);

      if (document === null) {
        throw new Error("The genre with the given ID was not found.");
      }

      res.send(document);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: err.message });
    }
  }

  deleteById(Genre, req.params.id);
});

router.get("/:id", (req, res) => {
  async function getById(model, id) {
    try {
      const document = await model.findById(id);
      return res.json(document);
    } catch (err) {
      if (err.reason === undefined) {
        return res
          .status(404)
          .json({ error: "The genre with the given ID was not found." });
      }
      return res.status(404).json(err);
    }
  }

  getById(Genre, req.params.id);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
