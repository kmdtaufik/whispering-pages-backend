const Product = require("../../models/Product");

const updateProduct = async (req, res) => {
  const productId = req.params.id;

  // Check if the productId is valid
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Check if the request body is empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Product data is required" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true, // Optional: Ensures schema validation on update
      }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = updateProduct;
