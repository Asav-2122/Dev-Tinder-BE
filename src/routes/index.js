const { Router } = require("express");
const authRouter = require("./auth.route.js");
const connectionRouter = require("./connection.route.js");
const userRouter = require("./user.route.js");
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/connection", connectionRouter);
rootRouter.use("/user", userRouter);

module.exports = rootRouter;
