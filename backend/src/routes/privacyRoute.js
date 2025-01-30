const express = require("express");
const {
  addPrivacy,
  getPrivacy,
  updatePrivacy,
} = require("../controllers/privacyController");

const router = express.Router();

router.get("/", getPrivacy);
router.post("/add", addPrivacy);
router.patch("/update/:id", updatePrivacy);

module.exports = router;
