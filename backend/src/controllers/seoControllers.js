const fs = require("fs");
const SEO = require("../models/seoModel");

exports.addSEO = async (req, res) => {
  const data = req?.body;

  try {
    const result = await SEO.create(data);

    res.status(201).json({
      success: true,
      message: "SEO Setting created success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSEO = async (req, res) => {
  try {
    const result = await SEO.findOne();

    res.status(200).json({
      success: true,
      message: "SEO Setting get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSEO = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await SEO.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "SEO Setting not found",
      });
    }

    const result = await SEO.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "SEO Setting not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "SEO Setting updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
