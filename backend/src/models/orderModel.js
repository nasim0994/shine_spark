const mongoose = require("mongoose");

const productSchema = {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  discount: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
  }
};

const OrderSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      note: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    couponDiscountTK: {
      type: Number,
    },
    products: [productSchema],
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
