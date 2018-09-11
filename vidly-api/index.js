const express = require("express");
const app = express();

const mongoose = require("mongoose");
const config = require("config");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to mongoDB!"))
  .catch(err => console.log("Error connecting to mongoDB!", err));

app.use(express.json());
app.use("/genres", genres);
app.use("/customers", customers);
app.use("/movies", movies);
app.use("/rentals", rentals);
app.use("/users", users);
app.use("/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
