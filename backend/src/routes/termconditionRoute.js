const express = require("express");
const router = express.Router();
const { get, add, update } = require("../controllers/termconditionController");

router.get("/", get);
router.post("/add", add);
router.patch("/update/:id", update);

module.exports = router;
