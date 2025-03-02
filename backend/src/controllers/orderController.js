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
      select: "title thumbnail sellingPrice isVariant variants",

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
      .lean()
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({});
    const pages = Math.ceil(total / limit);

    const totalSaleAggregation = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalSale = totalSaleAggregation[0]?.totalSale || 0;

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      totalSale,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get today's orders
exports.getTodaysOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  const today = new Date();

  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));

  try {
    const orders = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("user.id")
      .populate("products.productId")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // .lean()

    const totalSaleAggregation = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalSale = totalSaleAggregation[0]?.totalSale || 0;

    const total = await Order.countDocuments({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "Today's orders get success",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      totalSale,
      data: orders,
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

// Report
exports.getProductWaysReport = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const report = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $addFields: {
          discountedPrice: {
            $subtract: [
              { $toDouble: "$products.price" },
              {
                $multiply: [
                  { $toDouble: "$products.price" },
                  { $divide: [{ $toDouble: "$products.discount" }, 100] },
                ],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: { $toDouble: "$products.quantity" } },
          totalSalePrice: {
            $sum: {
              $multiply: [
                { $toDouble: "$discountedPrice" },
                { $toDouble: "$products.quantity" },
              ],
            },
          },
          title: { $first: "$productDetails.title" },
          thumbnail: { $first: "$productDetails.thumbnail" },
          isVariant: { $first: "$productDetails.isVariant" },
          totalStock: { $first: "$productDetails.totalStock" },
          discount: { $first: { $toDouble: "$productDetails.discount" } },
          skuList: {
            $push: {
              sku: "$products.sku",
              orderedQuantity: { $toDouble: "$products.quantity" },
              sellingPrice: { $toDouble: "$products.price" },
              purchasePrice: {
                $cond: {
                  if: { $eq: ["$productDetails.isVariant", true] },
                  then: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$productDetails.variant.variants",
                          as: "variant",
                          cond: { $eq: ["$$variant.sku", "$products.sku"] },
                        },
                      },
                      0,
                    ],
                  },
                  else: { $toDouble: "$productDetails.purchasePrice" },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          title: 1,
          thumbnail: 1,
          totalQuantity: 1,
          totalSalePrice: 1,
          totalStock: 1,
          skuList: {
            $map: {
              input: "$skuList",
              as: "skuItem",
              in: {
                sku: "$$skuItem.sku",
                orderedQuantity: "$$skuItem.orderedQuantity",
                sellingPrice: "$$skuItem.sellingPrice",
                purchasePrice: {
                  $cond: {
                    if: { $eq: ["$isVariant", true] },
                    then: {
                      $toDouble: "$$skuItem.purchasePrice.purchasePrice",
                    },
                    else: { $toDouble: "$$skuItem.purchasePrice" },
                  },
                },
              },
            },
          },
        },
      },
      { $skip: skip || 1 },
      { $limit: limit },
    ]);

    const totalCountResult = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
        },
      },
      { $count: "total" },
    ]);

    const total = totalCountResult.length > 0 ? totalCountResult[0].total : 0;
    const pages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: "Product ways report fetched successfully",
      meta: {
        total,
        pages,
        page,
        limit,
      },
      data: report,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
