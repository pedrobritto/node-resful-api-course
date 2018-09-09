const express = require("express");
const router = express.Router();

const { Customer, validateCustomer } = require("../models/customer");

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
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).json(error);
  }

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
