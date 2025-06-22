const { Router } = require("express");
const authRouter = require("./auth.route.js");
const connectionRouter = require("./connection.route.js");
const userRouter = require("./user.route.js");
const profileRouter = require("./profile.route.js");
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/connection", connectionRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/profile", profileRouter);

module.exports = rootRouter;
