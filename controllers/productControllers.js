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
    const sortBy = req.query.sort; // e.g., 'productPrice', 'productName','-' --> descending

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

    const products = await query;

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching criteria" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  await Product.findByIdAndDelete(productId);
  res.status(204).json();
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
