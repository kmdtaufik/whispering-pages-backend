const Product = require("../models/product");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
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
