const Connection = require("../models/connection.model");
const User = require("../models/user.model");

const handleViewConnections = async (req, res) => {
  try {
    const userId = req.userId;

    // const user = await User.findById(userId);

    // if (!user) {
    //   return res.status(404).json({
    //     error: "User not found!",
    //   });
    // }

    const connections = await Connection.find({
      $or: [
        {
          fromUser: userId,
          status: "accepted",
        },
        {
          toUser: userId,
          status: "accepted",
        },
      ],
    })
      .populate("fromUser", "firstName lastName photoUrl")
      .populate("toUser", "firstName lastName photoUrl");

    const allFormatedConnections = connections?.map((ele) => {
      if (ele.fromUser._id.toString() === userId.toString()) {
        return ele.toUser;
      }
      return ele.fromUser;
    });

    return res.status(200).json({
      message: "all the connections fetched successfully!",
      data: {
        connections: allFormatedConnections,
      },
    });
  } catch (error) {
    console.log("Error while fetching all connection ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

const handleViewRequest = async (req, res) => {
  try {
    const userId = req.userId;

    const allRequest = await Connection.find({
      toUser: userId,
      status: "intrested",
    }).populate("fromUser", "firstName lastName photoUrl");

    return res.status(200).json({
      message: "fetched all the recevied request successfully!",
      data: {
        allRequest,
      },
    });
  } catch (error) {
    console.log("Error while fetching pending request ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

module.exports = {
  handleViewConnections,
  handleViewRequest,
};
