const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  handleRequestConnection,
  handleReviewConnectionRequest,
} = require("../controller/connection.controller");

const connectionRouter = Router();

connectionRouter.post(
  "/send/:status/:toUserId",
  authMiddleware,
  handleRequestConnection
);

connectionRouter.post(
  "/review/:status/:requestId",
  authMiddleware,
  handleReviewConnectionRequest
);

module.exports = connectionRouter;
