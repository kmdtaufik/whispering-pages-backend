const mongoose = require("mongoose");

//Schema for Product
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    notAvailable: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
