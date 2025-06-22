const mongoose = require("mongoose");

async function connectToDB() {
  return await mongoose.connect(process.env.DATABASE_URI);
}

module.exports = connectToDB;
