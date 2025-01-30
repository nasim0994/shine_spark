const Privacy = require("../models/privacyModel");

exports.addPrivacy = async (req, res) => {
  try {
    const isExist = await Privacy.findOne({});
    if (isExist) {
      return res.json({
        success: false,
        message: "Privacy policy already exists",
      });
    }

    const result = await Privacy.create(req.body);

    res.status(201).json({
      success: true,
      message: "Privacy policy created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.findOne({});
    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Privacy policy fetched successfully",
      data: privacy,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePrivacy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const privacy = await Privacy.findById(id);

    if (!privacy) {
      return res.status(404).json({
        success: false,
        message: "Privacy policy not found",
      });
    }

    const updatedPrivacy = await Privacy.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Privacy policy updated successfully",
      data: updatedPrivacy,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
