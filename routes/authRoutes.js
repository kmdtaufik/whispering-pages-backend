const express = require("express");
const router = express.Router();
const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
