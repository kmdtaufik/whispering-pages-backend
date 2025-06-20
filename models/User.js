// This file defines the User model for MongoDB using Mongoose.
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://www.svgrepo.com/show/452030/avatar-default.svg",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
