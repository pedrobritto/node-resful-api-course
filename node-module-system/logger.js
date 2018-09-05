const EventEmitter = require("events");

// Custom class that extends EventEmitter
class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    // Emit messageLogged event
    this.emit("messageLogged", { id: 1 });
  }
}

module.exports = Logger;
