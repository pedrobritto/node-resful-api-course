const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      lowercase: true
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 10,
      required: true
    },
    isGold: {
      type: Boolean,
      required: true
    }
  })
);

router.get("/", async (req, res) => {
  try {
    const result = await Customer.find();
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Customer.findById(req.params.id);
    return res.json(result);
  } catch (err) {
    if (err.reason === undefined) {
      return res.status(404).json({ error: "User with given ID not found." });
    }

    return res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const document = await Customer.create(req.body);
    return res.json(document);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const document = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.json(document);
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const document = await Customer.findByIdAndRemove(req.params.id);
    return res.json(document);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
