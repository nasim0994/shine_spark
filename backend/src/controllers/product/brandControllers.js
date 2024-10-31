const fs = require("fs");
const Brand = require("../../models/brandModel");
const slugify = require("slugify");

exports.insert = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    if (!icon) {
      return res.json({
        success: false,
        message: "Brand icon is required",
      });
    }

    const brand = {
      icon: `/brands/${icon}`,
      slug: slugify(req.body.name),
      ...req.body,
    };

    const result = await Brand.create(brand);

    res.status(200).json({
      success: true,
      message: "Brand created success",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/brands/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      success: true,
      message: "Brand get success",
      data: brands,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.json({
        success: false,
        message: "Brand not found",
      });
    }

    const result = await Brand.findByIdAndDelete(id);

    if (result?.icon) {
      fs.unlink(`./uploads/${brand?.icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findById(id);

    res.status(200).json({
      success: true,
      message: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const icon = req?.file?.filename;

  console.log(icon);

  try {
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.json({
        success: false,
        message: "Brand not found",
      });
    }

    let newData;

    if (icon) {
      fs.unlink(`./uploads/${brand?.icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        icon: `/brands/${icon}`,
        slug: slugify(data?.name),
      };
    } else {
      newData = { ...data, slug: slugify(data?.name) };
    }

    await Brand.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
    });
  } catch (error) {
    fs.unlink(`./uploads/brands/${icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      success: false,
      message: error,
    });
  }
};
