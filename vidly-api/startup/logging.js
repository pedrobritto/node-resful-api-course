const winston = require("winston");

module.exports = function() {
  winston.configure({
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({
        filename: "logfile.log"
      })
    ]
  });

  // Uncaught exceptions
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // Promisse rejection exceptions
  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
