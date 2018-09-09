const express = require("express");
const router = express.Router();

const { Customer, validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  return res.json(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: "Customer with given ID not found." });
  }

  return res.json(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).json({ validationError: error.details[0].message });
  }

  const customer = await Customer.create(req.body);
  return res.json(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).json({ validationError: error.details[0].message });
  }

  // const customer = await Customer.create(req.body);
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  return res.json(customer);
});

router.delete("/:id", async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndRemove(req.params.id);
  if (!deletedCustomer) {
    return res.status(404).json({ error: "Customer with given ID not found." });
  }

  return res.json(deletedCustomer);
});

module.exports = router;
