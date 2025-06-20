// This file defines the User model for MongoDB using Mongoose.
const mongoose = require("mongoose");
const salt = await bcrypt.genSalt(10);
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://www.svgrepo.com/show/452030/avatar-default.svg",
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
//Hashing password before adding it to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
