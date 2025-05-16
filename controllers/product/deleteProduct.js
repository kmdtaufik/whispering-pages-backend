const Product = require("../../models/Product");

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);
    return res.status(204).json();
  } catch (error) {
    // console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error: " + error });
  }
};

module.exports = deleteProduct;
