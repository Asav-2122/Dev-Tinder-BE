const User = require("../models/user.model");

const handleViewProfile = async (req, res) => {
  try {
    let userId = req.userId;
    const user = await User.findById(userId).select(
      "firstName lastName gender photoUrl skills email"
    );
    if (!user) {
      return res.status(404).json({
        error: "user not found!",
      });
    }

    return res.status(200).json({
      message: "profile fetched successfully!",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("Error while fetching profile details ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

const handleEditProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "user not found!",
      });
    }
    //todo :
  } catch (error) {
    console.log("Error while editing profile details ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

module.exports = {
  handleViewProfile,
  handleEditProfile,
};
