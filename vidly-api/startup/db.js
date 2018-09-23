const mongoose = require("mongoose");
const winston = require("winston");
const config = require('config');

module.exports = async function() {
  const db = config.get('db');

  try {
    await mongoose.connect(db);
    winston.info(`Connected to ${db}`);
  } catch (err) {
    winston.error(err);
  }
};
