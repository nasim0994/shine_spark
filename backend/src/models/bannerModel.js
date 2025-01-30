const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    tag: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
