const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  // A new schema is created to minimize querying and increase performance,
  // as only a small portion of a customer data is needed, not all of it.
  // If more information is needed, it's id can be used to look it up.
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    require: true,
    default: Date.now()
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };

  return Joi.validate(rental, schema);
}

module.exports = {
  Rental,
  rentalSchema,
  validateRental
};
