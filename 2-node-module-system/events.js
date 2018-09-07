// Using the custom class that extends EventEmitter
const Logger = require("./logger");
const logger = new Logger();

// Register messageLogged event
logger.on("messageLogged", arg => {
  console.log("Listener called", arg);
});

// Runs custom class method that emit a messageLogged event
logger.log("Hi there!");
