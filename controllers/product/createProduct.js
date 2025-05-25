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

    //Parsed fields
    const parsedVariants = variants ? JSON.parse(variants) : [];
    const parsedSpecification = JSON.parse(specification || "{}");
    const parsedShippingInfo = JSON.parse(shippingInfo || "{}");
    const parsedMetaKeywords = JSON.parse(metaKeywords || "[]");
    const parsedTags = JSON.parse(tags || "[]");
    const parsedCustomFields = JSON.parse(customFields || "[]");

    // Handle file uploads for productThumbnail and productImages
    const productThumbnail = req.files?.thumbnail?.[0]?.path || null;
    const productImages =
      req.files?.images?.map((file) => file.path).join(",") || [];

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

    // Save the product
    // await newProduct.save();
    //console log the new product to the console
    console.log(newProduct);

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

module.exports = createProduct;
