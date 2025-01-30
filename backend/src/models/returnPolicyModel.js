const mongoose = require("mongoose");

const ReturnPolicySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const ReturnPolicy = mongoose.model("ReturnPolicy", ReturnPolicySchema);

module.exports = ReturnPolicy;
