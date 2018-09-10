const express = require("express");
const router = express.Router();

const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  const result = await User.find()
    .sort("name")
    .select("name email");
  return res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await User.findById(req.params.id);
  if (!result) return res.json({ error: "User with given ID doesn't exist." });
  return res.json(result);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already in use." });

  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    return res.json(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
