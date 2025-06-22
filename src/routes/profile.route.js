const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  handleViewProfile,
  handleEditProfile,
} = require("../controller/profile.controller");
//here two routes will be there view profile and edit profile

const profileRouter = Router();

profileRouter.get("/view", authMiddleware, handleViewProfile);
profileRouter.put("/edit", authMiddleware, handleEditProfile);

module.exports = profileRouter;
