const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
} = require("../controller/user.controller.js");
const userRouter = Router();

userRouter.post("/signup", handleUserSignUp);
userRouter.post("/signin", handleUserSignIn);

module.exports = userRouter;
