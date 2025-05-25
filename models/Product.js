const mongoose = require("mongoose");
//Schema for Product
const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productNameLocal: {
      type: String,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productDescriptionLocal: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    productThumbnail: {
      type: String,
      required: true,
    },
    productImages: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    discountType: {
      type: String,
      required: true,
      enum: ["percentage", "flat"],
    },
    offerEndsAt: {
      type: Date,
    },

    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },

    //Brand
    brand: {
      type: String,
      required: true,
    },

    manufacturer: {
      type: String,
      required: true,
    },
    modelNumber: { type: String, required: true },
    //Unique Fields
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, required: true, unique: true },
    //Rating and Reviews
    rating: {
      averageRating: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        images: { type: String },
      },
    ],

    //Stock
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    minOrderQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
    maxOrderQuantity: {
      type: Number,
      required: true,
      default: 100,
    },

    //Variants
    variants: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],

    //specification and attributes
    specification: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],

    //Tags & SEO
    tags: [{ type: String }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [{ type: String }],

    //Flags
    isFeatured: { type: Boolean, default: false },
    isHot: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    notAvailable: { type: Boolean, default: false },
    isOutOfStock: { type: Boolean, default: false },

    //OwnerShip
    seller: { type: String, required: true },
    addedBy: { type: String },

    //warranty & return
    isReturnable: { type: Boolean, required: true },
    returnDays: { type: Number, required: true },
    warrantyType: {
      type: String,
      required: true,
      enum: ["manufacturer", "seller"],
    },
    warrantyPeriod: { type: Number, required: true },

    //Soft Delete
    isDeleted: { type: Boolean, default: false },

    //Extra fields
    customFields: [
      {
        fieldName: { type: String },
        fieldValue: { type: String },
      },
    ],
  },

  //Shipping info
  {
    shippingInfo: {
      weight: {
        type: Number,
        required: false,
      },
      dimensions: {
        length: { type: Number, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
      },
      shippingFrom: {
        type: String,
        required: false,
      },

      shippingTo: {
        type: String,
        required: false,
      },
      shippingCost: {
        type: Number,
        required: false,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
