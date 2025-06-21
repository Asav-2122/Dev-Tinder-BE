require("dotenv").config({
  path: "./src/.env",
});
const express = require("express");
const mongoose = require("mongoose");
const rootRouter = require("./routes/index");

const app = express();

app.use("/api/v1", rootRouter);

async function main() {
  // mongodb is connection
  // await mongoose.connect("connection stringg...");
  app.listen(process.env.PORT, () => {
    console.log("app is running on port no " + process.env.PORT);
  });
}

main();
