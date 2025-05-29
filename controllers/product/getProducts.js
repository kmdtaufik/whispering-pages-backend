const Product = require("../../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      brand,
      sort,
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter object
    let filter = { isDeleted: { $ne: true } }; // Exclude soft-deleted products

    if (name) {
      filter.$text = { $search: name };
    }

    if (category) {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.productPrice = {};
      if (minPrice) filter.productPrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.productPrice.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    let sortOption = {};
    if (sort) {
      const sortFields = sort.split(",");
      sortFields.forEach((field) => {
        if (field.startsWith("-")) {
          sortOption[field.substring(1)] = -1;
        } else {
          sortOption[field] = 1;
        }
      });
    } else {
      sortOption.createdAt = -1; // Default sort by newest
    }

    // Execute queries in parallel
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .select("-__v") // Exclude version field
        .lean(),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalItems: total,
      products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = getProducts;
