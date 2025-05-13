const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productControllers");

router.post("/", createProduct);

module.exports = router;
