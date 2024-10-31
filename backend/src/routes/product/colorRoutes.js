const router = require("express").Router();
const {
  insert,
  get,
  getById,
  update,
  destroy,
} = require("../../controllers/product/colorController");

router.post("/add", insert);
router.get("/all", get);
router.get("/:id", getById);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
