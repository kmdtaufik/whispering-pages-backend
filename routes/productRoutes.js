const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
//CRUD operations routes
router.post("/", createProduct);
router.get("/:id", getProducts);
router.get("/", getProducts); // For searching by name
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
