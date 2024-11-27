const Model = require("../../../models/categoriesModel");
const makeSlug = require("../../../utils/makeSlug");
const fs = require("fs");

// Helper function to delete a file (icon)
const deleteIcon = (iconPath) => {
  if (iconPath && fs.existsSync(iconPath)) {
    fs.unlink(iconPath, (err) => {
      if (err) console.error("Failed to delete icon:", err);
    });
  }
};

exports.insert = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const { name, order } = req.body;

    if (!name || !order || !icon) {
      throw new Error("Name,  order, and icon are required.");
    }

    const newCategory = new Model({
      name,
      slug: makeSlug(name),
      order,
      icon: `/categories/${icon}`,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    deleteIcon(`/uploads/${icon}`);
    res.json({
      success: false,
      message: "Error creating category",
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const categories = await Model.find({})
      .sort({ order: 1 })
      .populate({
        path: "subCategories",
        select: "name slug subSubCategories",
        populate: {
          path: "subSubCategories",
          select: "name slug",
        },
      });
    res.status(200).json({
      success: true,
      message: "Categories get successfully",
      data: categories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Model.findById(req.params.id).populate({
      path: "subCategories",
      select: "name slug subSubCategories",
      populate: {
        path: "subSubCategories",
        select: "name slug",
      },
    });

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category get successfully",
      data: category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const { name, order } = req.body;
    const category = await Model.findById(req.params.id);

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    if (icon) {
      deleteIcon(`./uploads/${category?.icon}`);
      category.icon = `/category/${icon}`;
    }

    if (name) category.name = name;
    if (name) category.slug = makeSlug(name);
    if (order) category.order = order;
    if (icon) category.icon = `/categories/${icon}`;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    deleteIcon(`./uploads/${icon}`);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const category = await Model.findById(req.params.id);

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    if (category?.subCategories?.length > 0) {
      return res.json({
        success: false,
        message: "Category has subcategories! please delete them first",
      });
    }

    const result = await Model.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    deleteIcon(`./uploads/${result?.icon}`);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
