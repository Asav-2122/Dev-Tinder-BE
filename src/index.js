require("dotenv").config({
  path: "./src/.env",
});
const express = require("express");
const rootRouter = require("./routes/index");
const connectToDB = require("./db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", rootRouter);

connectToDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("app is running on port no " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Err while connecting DB" + err.message);
  });
