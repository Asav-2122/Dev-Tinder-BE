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

const handleGetAllUsers = async (req, res) => {
  try {
    const userId = req.userId;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 10 : limit;
    const skip = (page - 1) * limit;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }
    // here we have to check for few cases while building this API
    /*  
      1. "The logged-in user should not see his card"
      2. "The logged-in user should not see cards of users to whom they have already sent a connection request or have ignored."
      3. "The logged-in user should not see cards of users with whom they are already connected."

    */

    const loggedInUserConnections = await Connection.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser", "firstName lastName")
      .populate("toUser", "firstName lastName");

    const modifiedUsersConnections = loggedInUserConnections?.map((ele) => {
      if (ele?.fromUser?._id?.toString() === userId?.toString()) {
        return ele?.toUser?._id;
      }
      return ele?.fromUser?._id;
    });

    const allUsers = await User.find(
      {
        $and: [
          { _id: { $nin: modifiedUsersConnections } },
          {
            _id: { $ne: userId },
          },
        ],
      },
      "firstName lastName gender skills photoUrl age username"
    )
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: "users fetched successfully!",
      data: {
        allUsers,
      },
    });
  } catch (error) {
    console.log("Error while fetching all the users ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

module.exports = {
  handleViewConnections,
  handleViewRequest,
  handleGetAllUsers,
};
