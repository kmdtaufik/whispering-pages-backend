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
    console.log("Received files:", req.files);

    // Parse fields with better error handling
    let parsedVariants = [];
    let parsedSpecification = [];
    let parsedShippingInfo = {};
    let parsedCustomFields = [];
    // Handle tags and metaKeywords as comma-separated strings, not JSON
    let parsedTags = [];
    let parsedMetaKeywords = [];

    try {
      // Only parse JSON fields that are actually JSON
      parsedVariants =
        variants && variants.trim() !== "" ? JSON.parse(variants) : [];
      parsedSpecification =
        specification && specification.trim() !== ""
          ? JSON.parse(specification)
          : [];
      parsedShippingInfo =
        shippingInfo && shippingInfo.trim() !== ""
          ? JSON.parse(shippingInfo)
          : {};
      parsedCustomFields =
        customFields && customFields.trim() !== ""
          ? JSON.parse(customFields)
          : [];

      // Handle tags and metaKeywords as JSON arrays
      parsedTags = tags && tags.trim() !== "" ? JSON.parse(tags) : [];
      parsedMetaKeywords =
        metaKeywords && metaKeywords.trim() !== ""
          ? JSON.parse(metaKeywords)
          : [];

      console.log("Parsed arrays:", { parsedTags, parsedMetaKeywords });
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Raw values:", {
        tags,
        metaKeywords,
        variants,
        specification,
        shippingInfo,
        customFields,
      });
      return res.status(400).json({
        message: "Invalid JSON format in request data",
        error: parseError.message,
        fields:
          "Check variants, specification, shippingInfo, customFields, tags, or metaKeywords",
        receivedData: {
          tags,
          metaKeywords,
          variants,
          specification,
          shippingInfo,
          customFields,
        },
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
