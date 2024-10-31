const FlashDeal = require("../models/flashDealModel");

exports.addFlashDeal = async (req, res) => {
  try {
    const flashDealInfo = req?.body;

    const result = await FlashDeal.create(flashDealInfo);
    res.status(200).json({
      success: true,
      message: "flash Deal add success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.find({}).populate(
      "flashProducts.product"
    );

    res.status(200).json({
      success: true,
      message: "flash Deal get success",
      data: flashDeal,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getActiveFlashDeal = async (req, res) => {
  try {
    const flashDeal = await FlashDeal.find({ status: true }).populate(
      "flashProducts.product"
    );

    res.status(200).json({
      success: true,
      message: "flash Deal get success",
      data: flashDeal,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFlashDealById = async (req, res) => {
  try {
    const id = req.params.id;

    const flashDeal = await FlashDeal.findById(id).populate(
      "flashProducts.product"
    );
    if (!flashDeal) {
      return res.json({ message: "Flash Deal not found" });
    }

    res.status(200).json({
      success: true,
      message: "flash Deal get success",
      data: flashDeal,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateFlashDealstatus = async (req, res) => {
  try {
    const id = req.params.id;

    const flashDeal = await FlashDeal.findById(id);
    if (!flashDeal) {
      return res.json({ message: "Flash Deal not found" });
    }

    const filter = { _id: id };
    const update = { status: !flashDeal.status };
    await FlashDeal.findOneAndUpdate(filter, update);

    res.status(200).json({
      success: true,
      message: "flash Deal status update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteFlashDeal = async (req, res) => {
  try {
    const { id } = req?.params;
    const flashDeal = await FlashDeal.findById(id);

    if (!flashDeal) {
      return res.json({
        success: false,
        message: "FlashDeal not found",
      });
    }

    await FlashDeal.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "FlashDeal delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateFlashDeal = async (req, res) => {
  try {
    const { id } = req?.params;
    const flashDealInfo = req?.body;

    const flashDeal = await FlashDeal.findById(id);

    if (!flashDeal) {
      return res.json({
        success: false,
        message: "FlashDeal not found",
      });
    }

    await FlashDeal.findByIdAndUpdate(id, flashDealInfo, { new: true });

    res.status(200).json({
      success: true,
      message: "FlashDeal update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
