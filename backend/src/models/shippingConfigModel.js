const mongoose = require("mongoose");

const shippingConfigSchema = new mongoose.Schema(
  {
    shipping: [
      {
        area: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        charge: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: false }
);

const ShippingConfig = mongoose.model("ShippingConfig", shippingConfigSchema);

module.exports = ShippingConfig;
