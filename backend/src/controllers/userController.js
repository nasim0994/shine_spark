const fs = require("fs");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const { createJsonWebToken } = require("../utils/jsonWebToken");

exports.registerUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await User.create(userInfo);

    res.status(200).json({
      success: true,
      message: "Register Success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;




  try {
    // 2. Load User
    const user = await User.findOne({ phone });



    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Match Password
    const isMatch = await bcrypt.compare(password, user?.password);




    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // 5. generate token
    let accessToken = createJsonWebToken({ phone, password }, "7d");

    res.status(200).json({
      success: true,
      message: "Login Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.user.phone });
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req?.file?.filename ? req.file.filename : "";

    const user = await User.findOne({ _id: id });
    const uploadedImage = user?.image;

    if (uploadedImage && uploadedImage !== null) {
      fs.unlink(`./uploads/user/${uploadedImage}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await User.findByIdAndUpdate(id, {
      $set: {
        image: image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Image update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req?.body, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await User.find({});

    res.status(200).json({
      success: true,
      message: "get all users success",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customer = await User.find({}).where("role").equals("user");

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAnUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await User.findById(id);
    if (!isExist) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (isExist?.image && isExist?.image !== null) {
      fs.unlink(`./uploads/user/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "user delete success",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const data = req?.body;
    const id = req?.params?.id;

    const isExit = await User.findById(id);
    if (!isExit)
      return res.json({
        success: false,
        message: "User Not Found",
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

    const result = await User.findByIdAndUpdate(id, data, { new: true });

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
