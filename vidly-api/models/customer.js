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
      default: false
    }
  })
);

function validateCustomer(customer) {
  const _schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(8)
      .max(10)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, _schema);
}

module.exports = {
  Customer,
  validateCustomer
};
