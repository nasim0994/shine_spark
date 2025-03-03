const TopHeader = require("../models/topHeaderModel");

exports.addTopHeader = async (req, res) => {
  const data = req?.body;
  try {
    const result = await TopHeader.create(data);

    res.status(201).json({
      success: true,
      message: "TopHeader created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getTopHeaderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await TopHeader.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "TopHeader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "TopHeader fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getTopHeader = async (req, res) => {
  try {
    const result = await TopHeader.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "TopHeader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "TopHeader fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteTopHeader = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await TopHeader.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "TopHeader not found",
      });
    }

    await TopHeader.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "TopHeader deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateTopHeader = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await TopHeader.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "TopHeader not found",
      });
    }

    const result = await TopHeader.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "TopHeader updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
