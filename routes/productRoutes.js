const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/product/createProduct");
const getProducts = require("../controllers/product/getProducts");
const updateProduct = require("../controllers/product/updateProduct");
const deleteProduct = require("../controllers/product/deleteProduct");
const getProductsById = require("../controllers/product/getProductById");
const productUpload = require("../middlewares/productUpload");
//CRUD operations routes
router.post(
  "/",
  productUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    {
      name: "image",
      maxCount: 5,
    },
  ]),
  createProduct
);
router.get("/:id", getProductsById);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
