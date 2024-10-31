const router = require("express").Router();
const {
  insert,
  get,
  getById,
  update,
  destroy,
} = require("../controllers/product/color/colorController");

router.post("/add", insert);
router.get("/", get);
router.get("/:id", getById);
router.put("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
