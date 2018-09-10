const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);

  const hash = await bcrypt.hash("senha1", salt);
  console.log(hash);

  const compare = await bcrypt.compare("senha1", hash);
  console.log(compare);
}

run();
