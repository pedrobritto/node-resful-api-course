function log(req, res, next) {
  console.log("I'm a middleware!");
  next();
}

module.exports = log;
