const Color = require("../../models/colorModel");

exports.insert = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.json({
        success: false,
        message: "Name and code are required.",
      });
    }

    const existingColor = await Color.findOne({ name });
    if (existingColor) {
      return res.json({
        success: false,
        message: "Color name must be unique.",
      });
    }

    const newColor = new Color({
      name,
      code,
    });

    await newColor.save();

    res.status(201).json({
      success: true,
      message: "Color created successfully",
      data: newColor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error creating color",
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const colors = await Color.find({});

    res.status(200).json({
      success: true,
      data: colors,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving colors",
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);

    if (!color) {
      return res.json({
        success: false,
        message: "Color not found",
      });
    }

    res.status(200).json({
      success: true,
      data: color,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving color",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, code } = req.body;
    const color = await Color.findById(req.params.id);

    if (!color) {
      return res.json({
        success: false,
        message: "Color not found",
      });
    }

    await Color.findByIdAndUpdate(req.params.id, { name, code }, { new: true });

    res.status(200).json({
      success: true,
      message: "Color updated successfully",
      data: color,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error updating color",
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);

    if (!color) {
      return res.json({
        success: false,
        message: "Color not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Color deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error deleting color",
      message: error.message,
    });
  }
};
