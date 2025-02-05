const express = require("express");
const router = express.Router();
const {
    getFaq,
    getFaqById,
    addFaq,
    updateFaq,
    deleteFaq,
} = require("../controllers/faqController");

router.get("/all", getFaq);
router.post("/add", addFaq);
router.get("/:id", getFaqById);
router.delete("/delete/:id", deleteFaq);
router.patch("/update/:id", updateFaq);

module.exports = router;
