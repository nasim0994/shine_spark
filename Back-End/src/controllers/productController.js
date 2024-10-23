const Product = require("../models/productModel");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");
const Brand = require("../models/brandModel");
const slugify = require("slugify");
const fs = require("fs");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addProduct = async (req, res) => {
  const thumbnail = req?.files?.thumbnail[0]?.filename;
  const galleries = req.files.gallery ? req.files.gallery : [];

  if (!thumbnail) {
    return res.json({
      success: false,
      message: "Please upload thumbnail",
    });
  }

  const { title, variant } = req?.body;

  const product = {
    ...req?.body,
    slug: slugify(`${title}-${Date.now()}`),
    thumbnail,
    variant: variant && JSON.parse(variant),
    galleries:
      galleries?.length > 0
        ? galleries?.map((gallery) => ({
            url: gallery.filename,
            name: gallery.originalname,
          }))
        : [],
  };

  try {
    const result = await Product.create(product);
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });

    fs.unlink(`./uploads/products/${thumbnail}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    if (galleries?.length > 0) {
      galleries?.forEach((gallery) => {
        fs.unlink(`./uploads/products/${gallery?.filename}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  }
};

exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);
  const {
    category,
    subCategory,
    subSubCategory,
    brand,
    range,
    sort: priceSort,
    search,
  } = req.query;

  try {
    const targetedCategory = await Categories.findOne({
      slug: category && category,
    });
    const targetedSubCategory = await SubCategory.findOne({
      slug: subCategory && subCategory,
    });
    const targetedSubSubCategory = await SubSubCategory.findOne({
      slug: subSubCategory && subSubCategory,
    });
    const targetedBrand = await Brand.findOne({
      slug: brand && brand,
    });

    const categoryId = targetedCategory?._id;
    const subCategoryId = targetedSubCategory?._id;
    const subSubategoryId = targetedSubSubCategory?._id;
    const brandName = targetedBrand?.name;

    let query = {};
    if (category) query.category = categoryId;
    if (subCategory) query.subCategory = subCategoryId;
    if (subSubCategory) query.subSubCategory = subSubategoryId;
    if (brand) query.brand = brandName;

    const prices = range && JSON.parse(range);
    let sortOption = {};

    if (priceSort && parseInt(priceSort) !== 0) {
      sortOption.sellingPrice = parseInt(priceSort);
    } else {
      sortOption.createdAt = -1;
    }

    if (range) query.sellingPrice = { $gte: prices[0], $lte: prices[1] };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption)
      .populate("category subCategory subSubCategory", "name slug icon");

    const total = await Product.countDocuments(query);
    const pages = Math.ceil(parseInt(total) / parseInt(limit));

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const result = await Product.findById(req?.params?.id).populate(
      "category subCategory subSubCategory"
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const result = await Product.findOne({ slug: req?.params?.slug }).populate(
      "category subCategory subSubCategory",
      "name slug icon"
    );

    if (!result) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Product delete failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

    // delete thumbnail image
    const thumbnail = product?.thumbnail;
    const fullPath = `./uploads/products/${thumbnail}`;
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req?.params?.id;
  const images = req?.files?.map((file) => file.filename);

  const { title, variants } = req?.body;

  try {
    const isProduct = await Product.findById(id);
    // console.log(isProduct);
    if (!isProduct) {
      images?.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    if (images && images.length > 0) {
      const product = {
        ...req?.body,
        slug: slugify(`${title}-${Date.now()}`),
        images,
        variants: JSON.parse(variants),
      };

      const imagePaths = isProduct?.images;
      imagePaths.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
    } else {
      const product = {
        ...req?.body,
        images: isProduct?.images,
        slug: slugify(`${title}-${Date.now()}`),
        variants: JSON.parse(variants),
      };

      await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    if (images.length > 0) {
      images.forEach((imagePath) => {
        const fullPath = `./uploads/products/${imagePath}`;
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get Flash products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .limit(req.query.limit)
      .sort({ createdAt: -1 })
      .populate("category subCategory subSubCategory", "name slug icon");

    res.status(200).json({
      success: true,
      message: "Featured Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
