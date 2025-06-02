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
  (req, res, next) => {
    console.log("Incoming request headers:", req.headers);
    console.log("Content-Type:", req.get("Content-Type"));
    next();
  },
  productUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    {
      name: "images", // Fixed: was "image", should be "images"
      maxCount: 5,
    },
  ]),
  (req, res, next) => {
    console.log("After multer - Body:", req.body);
    console.log("After multer - Files:", req.files);
    next();
  },
  createProduct
);
router.get("/:id", getProductsById);
router.get("/", getProducts);
router.put(
  "/:id",
  productUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProduct
);
router.delete("/:id", deleteProduct);

module.exports = router;
