const Product = require("../models/product");

//CRUD operations
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
};

const getProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const productName = req.query.name;
    const sortBy = req.query.sort; // e.g., 'productPrice', '-productName'
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (productId) {
      const product = await Product.findById(productId).lean();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    }

    let filter = {};
    if (productName) {
      filter.productName = { $regex: new RegExp(productName, "i") };
    }

    let query = Product.find(filter).lean();

    if (sortBy) {
      query = query.sort(sortBy);
    }

    // Apply pagination
    query = query.skip(skip).limit(limit);

    const products = await query;
    const total = await Product.countDocuments(filter);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching criteria" });
    }

    return res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
