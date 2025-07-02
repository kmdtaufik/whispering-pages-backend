const Product = require("../../models/Product");

const getProductById = async (req, res) => {
  try {
    const productSlug = req.params.slug;

    if (!productSlug) {
      return res.status(400).json({ message: "Product slug is required" });
    }

    const product = await Product.findOne({ slug: productSlug }).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getProductById;
