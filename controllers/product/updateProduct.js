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

    // Handle file uploads if present
    const updateData = { ...req.body };
    if (req.files?.thumbnail?.[0]) {
      updateData.productThumbnail = req.files.thumbnail[0].filename;
    }
    if (req.files?.images) {
      updateData.productImages = req.files.images
        .map((file) => file.filename)
        .join(",");
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true, // Optional: Ensures schema validation on update
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = updateProduct;
