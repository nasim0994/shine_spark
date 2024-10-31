const router = require("express").Router();
const verifyAdmin = require("../../middleware/verifyAdmin");
const singleUploder = require("../../utils/singleUploder");

const {
  insert,
  get,
  update,
  destroy,
  getById,
} = require("../../controllers/product/brandControllers");

let upload = singleUploder("./uploads/brands", 100 * 1024, "icon");

router.post("/add", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        message: err.message || "File upload failed, max size 100kb",
        error: err,
      });
    }

    insert(req, res, next);
  });
});

router.get("/all", get);
router.get("/:id", getById);
router.patch("/update/:id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        message: err.message || "File upload failed, max size 100kb",
        error: err,
      });
    }

    update(req, res, next);
  });
});
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;
