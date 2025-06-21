const { Router } = require("express");
const userRouter = require("./user.route.js");
const rootRouter = Router();

rootRouter.use("/user", userRouter);

module.exports = rootRouter;
