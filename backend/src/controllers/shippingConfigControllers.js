const fs = require("fs");
const ShippingConfig = require("../models/shippingConfigModel");

exports.addShippingConfig = async (req, res) => {
  const data = req?.body;

  try {
    const isExist = await ShippingConfig.findOne();
    if (isExist) {
      return res.json({
        success: false,
        message: "Shipping already exist",
      });
    }

    const result = await ShippingConfig.create(data);

    res.status(201).json({
      success: true,
      message: "ShippingConfig Setting add success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getShippingConfig = async (req, res) => {
  try {
    const result = await ShippingConfig.findOne();

    res.status(200).json({
      success: true,
      message: "ShippingConfig Setting get success",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateShippingConfig = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await ShippingConfig.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "ShippingConfig Setting not found",
      });
    }

    const result = await ShippingConfig.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!result) {
      return res.json({
        success: false,
        message: "ShippingConfig Setting not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "ShippingConfig Setting updated success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
