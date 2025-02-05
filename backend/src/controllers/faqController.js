const Faq = require("../models/faqModel");

exports.addFaq = async (req, res) => {
  const data = req?.body;
  try {
    const result = await Faq.create(data);

    res.status(201).json({
      success: true,
      message: "Faq created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getFaqById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const faq = await Faq.findById(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: "Faq not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Faq fetched successfully",
      data: faq,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getFaq = async (req, res) => {
  try {
    const result = await Faq.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Faq not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Faq fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteFaq = async (req, res) => {
  const id = req?.params?.id;

  try {
    const faq = await Faq.findById(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: "Faq not found",
      });
    }

    await Faq.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateFaq = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await Faq.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Faq not found",
      });
    }

    const result = await Faq.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Faq updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
