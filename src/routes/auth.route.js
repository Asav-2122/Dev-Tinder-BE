const { Router } = require("express");
const {
  handleUserSignIn,
  handleUserSignUp,
} = require("../controller/auth.controller.js");
const authRouter = Router();

authRouter.post("/signup", handleUserSignUp);
authRouter.post("/signin", handleUserSignIn);

module.exports = authRouter;
