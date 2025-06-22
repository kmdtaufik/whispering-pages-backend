const express = require("express");
const router = express.Router();
const getUser = require("../controllers/user/getUser");
const getAllUsers = require("../controllers/user/getAllUser");
const createUser = require("../controllers/user/createUser");
const deleteUser = require("../controllers/user/deleteUser");
const updateUser = require("../controllers/user/updateUser");
const userUpload = require("../middlewares/userUpload");

// CRUD operations routes
router.post(
  "/",
  (req, res, next) => {
    console.log("Incoming request headers:", req.headers);
    console.log("Content-Type:", req.get("Content-Type"));
    next();
  },
  userUpload.fields([{ name: "avatar", maxCount: 1 }]),
  (req, res, next) => {
    console.log("After multer - Body:", req.body);
    console.log("After multer - Files:", req.files);
    next();
  },
  createUser
);

// Get all users (must come before parameterized routes)
router.get("/", getAllUsers);

// Update user by ID
router.put(
  "/:userId",
  userUpload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser
);

// Get user by ID
router.get("/:userId", getUser);

// Delete user by ID
router.delete("/:userId", deleteUser);

module.exports = router;
