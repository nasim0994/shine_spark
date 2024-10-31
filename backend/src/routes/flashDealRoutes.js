const {
  addFlashDeal,
  getAllFlashDeal,
  updateFlashDealstatus,
  getActiveFlashDeal,
  deleteFlashDeal,
  getFlashDealById,
  updateFlashDeal,
} = require("../controllers/flashDealControllers");

const router = require("express").Router();

router.post("/add-flashDeal", addFlashDeal);
router.get("/all", getAllFlashDeal);
router.get("/active", getActiveFlashDeal);
router.get("/:id", getFlashDealById);
router.patch("/update/:id", updateFlashDeal);
router.patch("/update-status/:id", updateFlashDealstatus);
router.delete("/delete/:id", deleteFlashDeal);

module.exports = router;
