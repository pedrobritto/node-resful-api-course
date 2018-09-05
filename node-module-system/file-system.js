const fs = require("fs");

const filesSync = fs.readdirSync("./");
console.log(filesSync);

fs.readdir("./", (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
