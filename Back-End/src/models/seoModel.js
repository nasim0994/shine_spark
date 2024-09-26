const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    basic: {
      type: Object,
      require: true,
    },
    og: {
      type: Object,
    },
    custom: {
      type: Object,
    },
  },
  { timestamps: false }
);

const SEO = mongoose.model("SEO", seoSchema);

module.exports = SEO;
