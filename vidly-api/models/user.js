const mongoose = require("mongoose");
const Joi = require("joi");

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
  validateUser
};
