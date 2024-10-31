const slugify = require("slugify");
const SubSubCategory = require("../models/subSubCategoryModel");

exports.addSubSubCategory = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;

    const sub_subCategory = {
      name,
      slug: slugify(`${name}-${Date.now()}`).toLowerCase(),
      category: categoryId,
      subCategory: subCategoryId,
    };

    const result = await SubSubCategory.create(sub_subCategory);

    res.status(200).json({
      success: true,
      message: "Sub SubCategory created success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubSubCategories = async (req, res) => {
  const { category, subCategory } = req?.query;
  try {
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;
    if (subCategory && subCategory != "undefined" && subCategory != "null")
      query.subCategory = subCategory;

    let subSubCategories = await SubSubCategory.find(query).populate(
      "category subCategory",
      "name slug"
    );

    res.status(200).json({
      success: true,
      message: "Sub Sub Category get success",
      data: subSubCategories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSubSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subSubCategory = await SubSubCategory.findOne({ _id: id }).populate(
      "category subCategory",
      "name slug"
    );

    res.status(200).json({
      success: true,
      message: "Sub sub Category found successfully",
      data: subSubCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name, categoryId, subCategoryId } = req?.body;

    const category = await SubSubCategory.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Sub Sub Category not found",
      });
    }

    const slug = slugify(`${name}-${Date.now()}`).toLowerCase();

    await SubSubCategory.updateOne(
      { _id: id },
      {
        name: name,
        slug: slug,
        category: categoryId,
        subCategory: subCategoryId,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sub Sub Category updated success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.json({
        success: false,
        message: "Sub SubCategory not found!",
      });
    }

    await SubSubCategory.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Sub SubCategory delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
