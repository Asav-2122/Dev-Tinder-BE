const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  handleViewConnections,
  handleViewRequest,
  handleGetAllUsers,
} = require("../controller/user.controller");

const userRouter = Router();

userRouter.get("/view-connections", authMiddleware, handleViewConnections);
userRouter.get("/view-request", authMiddleware, handleViewRequest);
userRouter.get("/feed", authMiddleware, handleGetAllUsers);

module.exports = userRouter;
