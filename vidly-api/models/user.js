const mongoose = require("mongoose");
const Joi = require("joi");

const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 120
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(120)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  userSchema,
  validateUser
};
