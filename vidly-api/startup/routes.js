const express = require("express");

require("express-async-errors");
const error = require("../middleware/error");

const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/genres", genres);
  app.use("/customers", customers);
  app.use("/movies", movies);
  app.use("/rentals", rentals);
  app.use("/users", users);
  app.use("/auth", auth);

  app.get("*", async (req, res, next) => {
    const err = new Error(`Page not found.`);
    err.statusCode = 404;
    next(err);
  });

  app.use(error);
};
