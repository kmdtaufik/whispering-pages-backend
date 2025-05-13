const Product = require("../models/product");

const createProduct = async (req, res) => {
  // console.log(req.body);
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
};

module.exports = {
  createProduct,
};
