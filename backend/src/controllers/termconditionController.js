const Model = require("../models/termconditionModel");

exports.add = async (req, res) => {
  try {
    const isExist = await Model.findOne({});
    if (isExist) {
      return res.json({
        success: false,
        message: "Terms & Condition already exists",
      });
    }

    const result = await Model.create(req.body);

    res.status(201).json({
      success: true,
      message: "Terms & Condition created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const privacy = await Model.findOne({});
    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Terms & Condition not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Terms & Condition fetched successfully",
      data: privacy,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;

  try {
    const privacy = await Model.findById(id);

    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Terms & Condition not found",
      });
    }

    const updatedPrivacy = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Terms & Condition updated successfully",
      data: updatedPrivacy,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
