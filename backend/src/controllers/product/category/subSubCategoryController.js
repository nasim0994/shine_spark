const SubSubCategory = require("../../../models/subSubCategoryModel");
const SubCategory = require("../../../models/subCategoryModel");
const makeSlug = require("../../../utils/makeSlug");

exports.insert = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;

    const newSubSubCategory = new SubSubCategory({
      name,
      category: categoryId,
      subCategory: subCategoryId,
      slug: makeSlug(name) + "-" + Date.now(),
    });

    await newSubSubCategory.save();

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      await SubSubCategory.findByIdAndDelete(newSubSubCategory._id);
      return res.json({
        success: false,
        message: "SubCategory not found.",
      });
    }

    subCategory.subSubCategories.push(newSubSubCategory._id);
    await subCategory.save();

    res.status(201).json({
      success: true,
      message: "SubSubCategory created and added to SubCategory successfully",
      data: newSubSubCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await SubSubCategory.find({}).populate(
      "category subCategory"
    );
    res.status(200).json({
      success: true,
      message: "SubSubCategory get successfully",
      data: result,
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
    const subSubCategory = await SubSubCategory.findById(req.params.id);

    if (!subSubCategory) {
      return res.json({
        success: false,
        message: "SubSubCategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "SubSubCategory get successfully",
      data: subSubCategory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;
    const subSubCategory = await SubSubCategory.findById(req.params.id);

    if (!subSubCategory) {
      return res.json({
        success: false,
        message: "SubSubCategory not found",
      });
    }

    // Check if the category is being changed
    if (subCategoryId && subSubCategory?.subCategory !== subCategoryId) {
      const oldSubCategoryId = subSubCategory?.subCategory;
      const oldSubCategory = await SubCategory.findById(oldSubCategoryId);
      oldSubCategory.subSubCategories.pull(req.params.id);
      await oldSubCategory.save();

      // Add subcategory to the new category
      const newSubCategory = await SubCategory.findById(subCategoryId);
      if (newSubCategory) {
        newSubCategory.subSubCategories.push(req.params.id);
        await newSubCategory.save();
        subSubCategory.subCategory = subCategoryId;
      }
    }

    if (name) subSubCategory.name = name;
    if (name) subSubCategory.slug = makeSlug(name) + "-" + Date.now();
    if (categoryId) subSubCategory.category = categoryId;

    await subSubCategory.save();

    res.status(200).json({
      success: true,
      message: "SubSubCategory updated successfully",
      data: subSubCategory,
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
    const subSubCategory = await SubSubCategory.findByIdAndDelete(
      req.params.id
    );

    if (!subSubCategory) {
      return res.json({
        success: false,
        message: "SubSubCategory not found",
      });
    }

    // Update the parent subcategory by removing the subsubcategory
    await SubCategory.updateMany(
      { subSubCategories: subSubCategory._id },
      { $pull: { subSubCategories: subSubCategory._id } }
    );

    res.status(200).json({
      success: true,
      message: "SubSubCategory deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
