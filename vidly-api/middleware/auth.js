const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log(decodedTokenw);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token." });
  }
}

module.exports = auth;
