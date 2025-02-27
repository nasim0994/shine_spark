const SubCategory = require("../../../models/subCategoryModel");
const Category = require("../../../models/categoriesModel");
const makeSlug = require("../../../utils/makeSlug");
const { pick } = require("../../../utils/pick");
const { calculatePagination } = require("../../../utils/calculatePagination");

exports.insert = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const newSubCategory = new SubCategory({
      name,
      slug: makeSlug(name) + "-" + Date.now(),
      category: categoryId,
    });

    await newSubCategory.save();

    const category = await Category.findById(categoryId);

    if (!category) {
      await SubCategory.findByIdAndDelete(newSubCategory._id);

      return res.json({
        success: false,
        message: "Parent Category not found.",
      });
    }

    category.subCategories.push(newSubCategory?._id);
    await category.save();

    res.status(201).json({
      success: true,
      message: "SubCategory created and added to Category successfully",
      data: newSubCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const { category } = req?.query;

  try {
    let query = {};
    if (category && category != "undefined" && category != "null")
      query.category = category;

    const result = await SubCategory.find(query)
      .populate("category subSubCategories", "name slug",)
      .skip(skip)
      .limit(limit);

    const total = await SubCategory.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Sub Category get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate(
      "category subSubCategories"
    );

    if (!subCategory) {
      return res.json({
        success: false,
        message: "SubCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving subcategory",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.json({
        success: false,
        message: "SubCategory not found",
      });
    }

    // Check if the category is being changed
    if (categoryId && subCategory?.category !== categoryId) {
      const oldCategoryId = subCategory?.category;
      const oldCategory = await Category.findById(oldCategoryId);
      oldCategory.subCategories.pull(req.params.id);
      await oldCategory.save();

      // Add subcategory to the new category
      const newCategory = await Category.findById(categoryId);
      if (newCategory) {
        newCategory.subCategories.push(req.params.id);
        await newCategory.save();
        subCategory.category = categoryId;
      }
    }

    // Update the other fields of subCategory
    if (name) subCategory.name = name;
    if (name) subCategory.slug = makeSlug(name) + "-" + Date.now();

    await subCategory.save();

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.json({
        success: false,
        message: "SubCategory not found",
      });
    }

    if (subCategory?.subSubCategories.length > 0) {
      return res.json({
        success: false,
        message: "SubCategory has SubSubCategories. Please delete them first.",
      });
    }

    const result = await SubCategory.findByIdAndDelete(req.params.id);

    await Category.updateMany(
      { subCategories: result._id },
      { $pull: { subCategories: result._id } }
    );

    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
