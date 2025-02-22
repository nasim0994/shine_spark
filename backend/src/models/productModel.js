const mongoose = require("mongoose");
const FlashDeal = require("./flashDealModel");

const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    galleries: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
    subSubCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubSubCategory",
    },
    brand: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    isVariant: {
      type: Boolean,
      default: false,
    },
    variants: [
      {
        color: {
          label: {
            type: String,
          },
          value: {
            type: String,
          },
        },
        size: {
          type: String,
        },
        stock: {
          type: Number,
        },
        sku: {
          type: String,
        },
        colorImage: {
          type: String,
        },
        sellingPrice: {
          type: Number,
        },
        purchasePrice: {
          type: Number,
        },
      }
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviewer: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
    },
    sizechart: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// product cannot delete if flash sale is active
productSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()._id;
  const result = await FlashDeal.countDocuments({
    "flashProducts.product": productId,
  });

  if (result > 0) {
    const error = new Error(
      "Cannot delete the product as it is part of an active flash deal."
    );

    return next(error);
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
