const mongoose = require("mongoose");
const winston = require("winston");

module.exports = async function() {
  try {
    await mongoose.connect("mongodb://localhost:27017/vidly");
    winston.info("Connected to MongoDB...");
  } catch (err) {
    winston.error(err);
  }
};
