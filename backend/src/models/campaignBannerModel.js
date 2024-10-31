const mongoose = require("mongoose");

const campaignBannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const CampaignBanner = mongoose.model("CampaignBanner", campaignBannerSchema);

module.exports = CampaignBanner;
