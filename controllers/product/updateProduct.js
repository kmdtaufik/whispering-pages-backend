const Product = require("../../models/Product");

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

    // Parse JSON fields with error handling
    const updateData = { ...req.body };

    try {
      // Parse JSON fields if they exist and are not empty
      if (updateData.variants && updateData.variants.trim() !== "") {
        updateData.variants = JSON.parse(updateData.variants);
      }
      if (updateData.specification && updateData.specification.trim() !== "") {
        updateData.specification = JSON.parse(updateData.specification);
      }
      if (updateData.customFields && updateData.customFields.trim() !== "") {
        updateData.customFields = JSON.parse(updateData.customFields);
      }
      if (updateData.shippingInfo && updateData.shippingInfo.trim() !== "") {
        updateData.shippingInfo = JSON.parse(updateData.shippingInfo);
      }
      if (updateData.tags && updateData.tags.trim() !== "") {
        updateData.tags = JSON.parse(updateData.tags);
      }
      if (updateData.metaKeywords && updateData.metaKeywords.trim() !== "") {
        updateData.metaKeywords = JSON.parse(updateData.metaKeywords);
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return res.status(400).json({
        message: "Invalid JSON format in request data",
        error: parseError.message,
      });
    }

    // Handle file uploads if present (Cloudinary URLs)
    if (req.files?.thumbnail?.[0]) {
      updateData.productThumbnail = req.files.thumbnail[0].path; // Cloudinary URL
    }
    if (req.files?.images && req.files.images.length > 0) {
      updateData.productImages = req.files.images
        .map((file) => file.path) // Cloudinary URLs
        .join(",");
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Product with this slug, SKU, or barcode already exists",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = updateProduct;
