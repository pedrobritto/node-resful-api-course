const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const Joi = require("joi");

const { User, generateAuthToken } = require("../models/user");

router.post("/", async (req, res) => {
  // Validate user input with JOI
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  // Check if correct password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const token = user.generateAuthToken();
  return res.json(token);
});

function validateInput(input) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(input, schema);
}

module.exports = router;
