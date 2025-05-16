const Product = require("../../models/Product");

const getProducts = async (req, res) => {
  try {
    const productName = req.query.name;
    const sortBy = req.query.sort; // e.g., 'productPrice', '-productName'
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

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

module.exports = getProducts;
