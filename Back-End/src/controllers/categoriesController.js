const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const makeSlug = require("../utils/makeSlug");
const fs = require("fs");

exports.addCategory = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const { name } = req.body;

    const category = {
      ...req?.body,
      icon: `/categories/${icon}`,
      slug: makeSlug(name),
    };

    const result = await Categories.create(category);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/categories/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.find({}).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const category = await Categories.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Category not found",
      });
    }

    const slug = slugify(data?.name).toLowerCase();

    const newData = {
      ...data,
      slug,
    };

    const result = await Categories.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const category = await Categories.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Category not found",
      });
    }

    if (category?.subCategories.length > 0) {
      return res.json({
        success: false,
        message:
          "Category has sub categories, please delete sub categories first",
      });
    }

    const result = await Categories.findByIdAndDelete(id);

    if (result?.icon) {
      fs.unlink(`./uploads/${result?.icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Category delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
