const mongoose = require("mongoose");

const PrivacySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Privacy = mongoose.model("Privacy", PrivacySchema);

module.exports = Privacy;
