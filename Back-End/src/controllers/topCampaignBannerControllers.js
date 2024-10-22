const fs = require("fs");
const TopCampaignBanner = require("../models/topCampaignBannerModel");

exports.addTopCampaignBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;
    if (!image) {
      return res.json({
        success: false,
        message: "Image is requred",
      });
    }

    const result = await TopCampaignBanner.create({ image: image });

    if (!result) {
      if (image) {
        fs.unlink(`./uploads/banner/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      return res.json({
        success: false,
        message: "Top Campaign Banner not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Top Campaign Banner added success",
      data: result,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/banner/${image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTopCampaignBanner = async (req, res) => {
  try {
    const banner = await TopCampaignBanner.find({});

    if (!banner) {
      return res.json({
        success: false,
        message: "banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "banner found successfully",
      data: banner,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const banner = req?.file?.filename;
    if (!banner) {
      return res.json({
        success: false,
        message: "banner is required",
      });
    }

    const id = req?.params?.id;
    const isBanner = await TopCampaignBanner.findOne({ _id: id });

    if (isBanner) {
      await TopCampaignBanner.findByIdAndUpdate(
        id,
        { image: banner },
        { new: true }
      );

      fs.unlink(`./uploads/banner/${isBanner?.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      res.status(200).json({
        success: true,
        message: "Top Campaign Banner updated success",
      });
    }
  } catch (error) {
    if (banner) {
      fs.unlink(`./uploads/banner/${banner}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};
