// This file defines the User model for MongoDB using Mongoose.
const mongoose = require("mongoose");
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
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
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
  this.password = await bcrypt.hash(this.password, 10);
  this.name = this.name.trim().toUpperCase();
  this.email = this.email.trim().toLowerCase();
  next();
});

//Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
