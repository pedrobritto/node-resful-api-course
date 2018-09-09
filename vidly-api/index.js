const express = require("express");
const app = express();

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to mongoDB!"))
  .catch(err => console.log("Error connecting to mongoDB!", err));

app.use(express.json());
app.use("/genres", genres);
app.use("/customers", customers);
app.use("/movies", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
