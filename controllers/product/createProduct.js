const Product = require("../../models/Product");

const createProduct = async (req, res) => {
  try {
    // Create a new product instance with the request body
    const newProduct = new Product(req.body);

    // Validate the product before saving
    const savedProduct = await newProduct.save();

    // Respond with the created product and a 201 status code
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle other errors (e.g., database errors)
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

module.exports = createProduct;
