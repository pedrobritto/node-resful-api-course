const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.log("error", err.message, err);

  if (!err.message) {
    err.message = "Ops! Something went wrong";
  }

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  return res.status(err.statusCode).json({ error: err.message });
};
