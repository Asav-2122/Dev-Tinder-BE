const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  handleViewConnections,
  handleViewRequest,
} = require("../controller/user.controller");

const userRouter = Router();

//two routes here user can see all the received request and all his connections

userRouter.get("/view-connections", authMiddleware, handleViewConnections);
userRouter.get("/view-request", authMiddleware, handleViewRequest);

module.exports = userRouter;
