const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");

exports.addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const sub_category = {
      name,
      category: categoryId,
      slug: slugify(`${name}-${Date.now()}`).toLowerCase(),
    };

    const result = await SubCategory.create(sub_category);

    res.status(200).json({
      success: true,
      message: "Sub Category created successfully",
      message: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name, categoryId } = req?.body;

    const category = await SubCategory.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Sub Category not found",
      });
    }

    const slug = slugify(`${name}-${Date.now()}`).toLowerCase();

    await SubCategory.updateOne(
      { _id: id },
      {
        name: name,
        slug: slug,
        category: categoryId,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sub Category updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      res.json({
        success: false,
        message: "Sub Category not found!",
      });
    }

    await SubCategory.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Sub Category deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubCategories = async (req, res) => {
  const { category } = req?.query;
  try {
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;

    let subCategories = await SubCategory.find(query).populate(
      "category",
      "name"
    );

    res.status(200).json({
      success: true,
      message: "Sub Category get success",
      message: subCategories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findOne({ _id: id }).populate(
      "category"
    );

    res.status(200).json({
      success: true,
      message: "sub category get successfully",
      message: subCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
