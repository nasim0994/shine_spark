const router = require("express").Router();
const singleUploder = require("../utils/singleUploder");
const {
  insert,
  get,
  getById,
  update,
  destroy,
} = require("../controllers/product/category/categoryController");

let upload = singleUploder("./uploads/categories", 1024 * 1024, "icon");

router.post("/add", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed, max size 100kb", error: err });
    }

    insert(req, res, next);
  });
});

router.get("/all", get);
router.get("/:id", getById);

router.patch("/update/:id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed, max size 100kb", error: err });
    }

    update(req, res, next);
  });
});
router.delete("/delete/:id", destroy);

module.exports = router;
