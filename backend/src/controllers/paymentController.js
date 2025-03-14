const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

exports.initPayment = async (req, res) => {
  const orderData = req?.body;
  const { user, shippingInfo, totalPrice, currency } = orderData;

  try {
    const transactionId = uuidv4();

    const data = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASSWORD,
      total_amount: totalPrice,
      currency: currency,
      tran_id: transactionId,
      success_url: `${process.env.BACKEND_URL}/payment/payment-success?transactionId=${transactionId}`,
      fail_url: `${process.env.BACKEND_URL}/payment-fail?transactionId=${transactionId}`,
      cancel_url: `${process.env.BACKEND_URL}/payment-fail?transactionId=${transactionId}`,
      ipn_url: `${process.env.BACKEND_URL}/ipn`,
      shipping_method: "",
      product_name: "product",
      product_category: "category",
      product_profile: "general",
      cus_name: user?.name,
      cus_email: user?.email,
      cus_add1: shippingInfo?.address,
      cus_add2: "",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: user?.phone,
      cus_fax: "",
      ship_name: user?.name,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const response = await axios({
      method: "POST",
      url: process.env.PAYMENT_URL,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    // creating a order ----------------------------------

    let invoiceNumber = "00001";

    const orders = await Order.find({});
    if (orders?.length > 0) {
      orders?.map((order) => {
        const newNumber = Math.max(parseInt(order?.invoiceNumber)) + 1;

        if (newNumber < 10) {
          invoiceNumber = "0000" + newNumber;
        } else if (newNumber < 100) {
          invoiceNumber = "000" + newNumber;
        } else if (newNumber < 1000) {
          invoiceNumber = "00" + newNumber;
        } else if (newNumber < 10000) {
          invoiceNumber = "0" + newNumber;
        } else {
          invoiceNumber = newNumber;
        }
      });
    }
    const orderData = {
      ...req?.body,
      invoiceNumber,
      transactionId,
      isPaid: false,
    };

    if (response?.data?.status === "SUCCESS") {
      await Order.create(orderData);
    } else {
      res.json({
        success: false,
        message: response?.data?.failedreason,
      });
    }

    res.status(201).json({
      success: true,
      message: "Payment initialization successful",
      data: response?.data?.GatewayPageURL,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.paymentSuccess = async (req, res) => {
  const { transactionId } = req?.query;

  const order = await Order.findOne({ transactionId });

  if (!order) {
    return res.json({
      success: false,
      message: "Order does not exist!",
    });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Order.findOneAndUpdate(
      { transactionId },
      {
        $set: {
          isPaid: true,
        },
      },
      { new: true }
    );

    order?.products?.forEach(async (product) => {
      const { productId, quantity, color, size } = product;

      const selectedProduct = await Product.findOne({
        _id: productId,
      });
      // console.log(selectedProduct);

      if (color && size) {
        const selectedVariant = selectedProduct?.variants?.find(
          (variant) => variant.color === color && variant.size === size
        );

        // console.log(selectedVariant, "color & size");
        const updatedQuantity = selectedVariant?.quantity - quantity;

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              variants: [
                ...selectedProduct?.variants?.map((variant) => {
                  if (variant.color === color && variant.size === size) {
                    return {
                      ...variant,
                      quantity: updatedQuantity,
                    };
                  }
                  return variant;
                }),
              ],
            },
          },
          { new: true }
        );
      } else if (color) {
        const selectedVariant = selectedProduct?.variants?.find(
          (variant) => variant.color === color
        );

        // console.log(selectedVariant, "color");
        const updatedQuantity = selectedVariant?.quantity - quantity;

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              variants: [
                ...selectedProduct?.variants?.map((variant) => {
                  if (variant.color === color) {
                    return {
                      ...variant,
                      quantity: updatedQuantity,
                    };
                  }
                  return variant;
                }),
              ],
            },
          },
          { new: true }
        );
      } else {
        const updatedQuantity = selectedProduct?.quantity - quantity;

        await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              quantity: updatedQuantity,
            },
          },
          { new: true }
        );
      }
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  res.redirect(`${process.env.FRONTEND_URL}/payment/success/${transactionId}`);
};

exports.paymentFailed = async (req, res) => {
  const { transactionId } = req?.query;

  try {
    await Order.findOneAndDelete({ transactionId });

    res.redirect(`${process.env.FRONTEND_URL}/payment/failed/${transactionId}`);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
