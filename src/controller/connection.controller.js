const Connection = require("../models/connection.model");
const User = require("../models/user.model");

// this controller function is specifically for sending or ignoring  connection request
const handleRequestConnection = async (req, res) => {
  try {
    let { status, toUserId } = req.params;
    const fromUserId = req.userId;
    const allowedStatus = ["intrested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid Status",
      });
    }

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json({
        error: "you can't send connection to your self",
      });
    }

    const user = await User.findById(toUserId);

    if (!user) {
      return res.status(400).json({
        error: "User doesn't exists!",
      });
    }

    //checking if connection request already exists or not!!

    const existingConnectionRequest = await Connection.findOne({
      $or: [
        { fromUser: fromUserId, toUser: toUserId },
        { fromUser: toUserId, toUser: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .send({ message: "Connection Request Already Exists!!" });
    }

    const connectionRequest = new Connection({
      fromUser: fromUserId,
      toUser: toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return res.status(200).json({
      message:
        status == "intrested"
          ? "connection request to " + user.firstName + " sent succesfully"
          : "you have ignored " + user.firstName + ".",
    });
  } catch (error) {
    console.log("Error while sending request ", error.message);
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

// this controller function is specifically for accepting or rejecting received connection request
const handleReviewConnectionRequest = async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const fromUserId = req.userId;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid Status!",
      });
    }

    const toUser = await User.findById(fromUserId);

    if (!toUser) {
      return res.status(400).json({
        error: "User doesn't exists!",
      });
    }

    const connectionRequest = await Connection.findOne({
      status: "intrested",
      toUser: fromUserId,
      _id: requestId,
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.status(200).json({ message: "Connection request " + status, data });
  } catch (error) {
    console.log(
      "Error while accepting or rejecting connection request ",
      error.message
    );
    return res.status(500).json({
      error: "Something went wrong please try again later!",
    });
  }
};

module.exports = {
  handleRequestConnection,
  handleReviewConnectionRequest,
};
