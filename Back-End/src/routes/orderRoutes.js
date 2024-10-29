const {
  addOrder,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateStatus,
  getOrderByTransactionId,
  getProductWaysReport,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/post-order", addOrder);
router.get("/all-orders", getAllOrders);
router.get("/report/product-ways", getProductWaysReport);

router.get("/:id", getOrderById);
router.get("/user-orders/:id", getOrdersByUserId);
router.get("/transaction/:transactionId", getOrderByTransactionId);

router.delete("/:id", deleteOrderById);

router.patch("/update-status/:id", updateStatus);

module.exports = router;
