const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  handleViewProfile,
  handleEditProfile,
} = require("../controller/profile.controller");

const profileRouter = Router();

profileRouter.get("/view", authMiddleware, handleViewProfile);
profileRouter.put("/edit", authMiddleware, handleEditProfile);

module.exports = profileRouter;
