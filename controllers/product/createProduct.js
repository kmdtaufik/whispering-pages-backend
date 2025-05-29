const Product = require("../../models/Product");

const createProduct = async (req, res) => {
  try {
    // Extract all fields from req.body
    const {
      slug,
      productName,
      productNameLocal,
      productDescription,
      productDescriptionLocal,
      productPrice,
      originalPrice,
      discount,
      discountType,
      offerEndsAt,
      category,
      subCategory,
      brand,
      manufacturer,
      modelNumber,
      sku,
      barcode,
      stock,
      minOrderQuantity,
      maxOrderQuantity,
      variants,
      specification,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      isFeatured,
      isHot,
      isNewArrival,
      isBestSeller,
      isRecommended,
      isTrending,
      notAvailable,
      isOutOfStock,
      seller,
      addedBy,
      isReturnable,
      returnDays,
      warrantyType,
      warrantyPeriod,
      customFields,
      shippingInfo,
    } = req.body;

    console.log("Received product data:", req.body);

    // Parse fields with better error handling
    let parsedVariants = [];
    let parsedSpecification = [];
    let parsedShippingInfo = {};
    let parsedMetaKeywords = [];
    let parsedTags = [];
    let parsedCustomFields = [];

    try {
      parsedVariants = variants ? JSON.parse(variants) : [];
      parsedSpecification = specification ? JSON.parse(specification) : [];
      parsedShippingInfo = shippingInfo ? JSON.parse(shippingInfo) : {};
      parsedMetaKeywords = metaKeywords ? JSON.parse(metaKeywords) : [];
      parsedTags = tags ? JSON.parse(tags) : [];
      parsedCustomFields = customFields ? JSON.parse(customFields) : [];
    } catch (parseError) {
      return res.status(400).json({
        message: "Invalid JSON format in request data",
        error: parseError.message,
      });
    }

    // Handle file uploads
    const productThumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const productImages =
      req.files?.images?.map((file) => file.filename).join(",") || "";

    // Validate required fields
    if (!productThumbnail) {
      return res.status(400).json({
        message: "Product thumbnail is required",
      });
    }

    // Create the product object
    const newProduct = new Product({
      slug,
      productName,
      productNameLocal,
      productDescription,
      productDescriptionLocal,
      productPrice,
      originalPrice,
      productThumbnail,
      productImages,
      discount,
      discountType,
      offerEndsAt,
      category,
      subCategory,
      brand,
      manufacturer,
      modelNumber,
      sku,
      barcode,
      stock,
      minOrderQuantity,
      maxOrderQuantity,
      variants: parsedVariants,
      specification: parsedSpecification,
      tags: parsedTags,
      metaTitle,
      metaDescription,
      metaKeywords: parsedMetaKeywords,
      isFeatured,
      isHot,
      isNewArrival,
      isBestSeller,
      isRecommended,
      isTrending,
      notAvailable,
      isOutOfStock,
      seller,
      addedBy,
      isReturnable,
      returnDays,
      warrantyType,
      warrantyPeriod,
      customFields: parsedCustomFields,
      shippingInfo: parsedShippingInfo,
    });

    // Save the product to database
    const savedProduct = await newProduct.save();
    console.log("Product saved successfully:", savedProduct._id);

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Product with this slug, SKU, or barcode already exists",
        error: error.message,
      });
    }

    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

module.exports = createProduct;
