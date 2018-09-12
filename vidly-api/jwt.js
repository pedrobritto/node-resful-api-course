const jwt = require("jsonwebtoken");

const encoded = jwt.sign({ name: "Pedro" }, "ABC");
console.log(encoded);

const decoded = jwt.decode(encoded);
console.log(decoded);

const verified = jwt.verify(encoded, "ABC");
console.log(verified);
