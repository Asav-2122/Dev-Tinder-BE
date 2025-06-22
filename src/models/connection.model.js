const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
    enum: ["accepted", "rejected", "intrested", "ignored"],
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = Connection;
