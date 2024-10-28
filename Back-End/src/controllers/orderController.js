const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addOrder = async (req, res) => {
  let invoiceNumber = "00001";

  try {
    let data = req?.body;

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
      ...data,
      invoiceNumber,
    };

    // Update stock for each product in the order
    for (const product of orderData?.products) {
      const { productId, quantity, skuId } = product;

      try {
        await updateStock(productId, quantity, skuId);
      } catch (error) {
        return res.json({
          success: false,
          message: error.message,
        });
      }
    }

    const result = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

async function updateStock(productId, quantityOrdered, skuId) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if enough stock is available
    if (product?.totalStock < quantityOrdered) {
      throw new Error("Insufficient stock available");
    }

    // Update total stock
    product.totalStock -= quantityOrdered;

    // Update variant stock if the product has variants
    if (product?.isVariant && product?.variant?.variants?.length > 0) {
      const selectedVariant = product?.variant?.variants?.find(
        (variant) => variant?.id === skuId
      );

      if (selectedVariant) {
        selectedVariant.stock =
          parseInt(selectedVariant?.stock, 10) - quantityOrdered;

        product.markModified("variant.variants");
      } else {
        throw new Error("Variant not found for the specified sku");
      }
    }

    // Save the updated product
    await product.save();
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error; // or handle the error as needed
  }
}

exports.getOrdersByUserId = async (req, res) => {
  const id = req?.params?.id;

  try {
    const orders = await Order.find({ "user.id": id });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const order = await Order.findById(id).populate({
      path: "products.productId",
      select: "title thumbnail",

      populate: {
        path: "category",
        select: "name",
      },
    });

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);

  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const orders = await Order.find({})
      .populate("user.id")
      .populate("products.productId")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments({});
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      meta: {
        total,
        pages,
        page,
        limit,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req?.params?.id;
  const status = req?.body?.status;

  try {
    const result = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderByTransactionId = async (req, res) => {
  const transactionId = req?.params?.transactionId;

  try {
    const order = await Order.findOne({ transactionId });

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
