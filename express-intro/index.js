const express = require("express");
const app = express();
const mainRoutes = require("./routes/index");
const coursesRoutes = require("./routes/courses");

const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

const debug = require("debug")("app:startup");

// Enables request with json body to be sent.
app.use(express.json());
app.use(helmet());
app.use("/", mainRoutes);
app.use("/courses", coursesRoutes);

if (app.get("env") === "development") {
  debug("Morgan enabled...");
  app.use(morgan("tiny"));
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
