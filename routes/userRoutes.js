const express = require("express");
const router = express.Router();
const getUser = require("../controllers/user/getUser");
const getAllUsers = require("../controllers/user/getAllUser");
const createUser = require("../controllers/user/createUser");
const deleteUser = require("../controllers/user/deleteUser");

// CRUD operations routes
router.post("/", createUser);

//Get user by ID or username or email
router.get("/:email", getUser);
router.get("/:username", getUser);
router.get("/:userId", getUser);
router.get("/", getAllUsers);

//Delete user by ID
router.delete("/:userId", deleteUser);

module.exports = router;
