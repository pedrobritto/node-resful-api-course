const express = require("express");
const router = express.Router();

const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

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

  const token = await jwt.sign({ _id: user._id, admin: true }, "privateKey");
  return res.json(token);

  // return res.json({ message: "Login successful." });
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
