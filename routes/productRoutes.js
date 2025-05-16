const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/product/createProduct");
const getProducts = require("../controllers/product/getProducts");
const updateProduct = require("../controllers/product/updateProduct");
const deleteProduct = require("../controllers/product/deleteProduct");
const getProductsById = require("../controllers/product/getProductById");

//CRUD operations routes
router.post("/", createProduct);
router.get("/:id", getProductsById);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
