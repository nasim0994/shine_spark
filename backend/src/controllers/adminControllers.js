const bcrypt = require('bcrypt');
const fs = require("fs");
const Admin = require("../models/userModel");

exports.updateProfile = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isExit = await Admin.findById(id);
    if (!isExit)
      return res.json({
        success: false,
        message: "User Not Found",
      });

    const result = await Admin.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile update success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isExit = await Admin.findById(id);
    if (!isExit)
      return res.json({
        success: false,
        message: "Admin Not Found",
      });

    const isMatch = await bcrypt.compare(
      data?.currentPassword,
      isExit?.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password does not match",
      });
    }

    const hash = await bcrypt.hash(data?.password, 10);
    data.password = hash;

    const result = await Admin.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password update success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const data = req?.body;
    const result = await Admin.create(data);

    if (!result) {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Admin add success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

exports.defaultAdminCreate = async (req, res) => {
  try {
    const isExists = await Admin.findOne({ role: "superAdmin" });

    if (!isExists) {

      const admin = new Admin({
        name: "Default Admin",
        username: "admin",
        phone: "00000000000",
        password: "12345678",
        role: "superAdmin",
      });

      await admin.save();
      console.log("Default admin user created successfully");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({})
      .sort({ createdAt: -1 })
      .where("role")
      .equals(["admin", "superAdmin"]);

    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Admin.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    if (isExist?.image && isExist?.image !== null) {
      fs.unlink(`./uploads/user/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Admin delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
