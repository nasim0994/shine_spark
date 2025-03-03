const express = require("express");
const {
  getTopHeader,
  addTopHeader,
  getTopHeaderById,
  deleteTopHeader,
  updateTopHeader,
} = require("../controllers/topHeaderController");
const router = express.Router();

router.get("/all", getTopHeader);
router.post("/add", addTopHeader);
router.get("/:id", getTopHeaderById);
router.delete("/delete/:id", deleteTopHeader);
router.patch("/update/:id", updateTopHeader);

module.exports = router;
