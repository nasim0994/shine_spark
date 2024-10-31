const router = require("express").Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProductById,
  updateProduct,
  getFeaturedProducts,
  updateFeatured,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});
const upload = multer({ storage: storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery" },
]);

router.post("/add-product", upload, addProduct);
router.get("/all-products", getAllProducts);
router.get("/featured-products", getFeaturedProducts);

router.get("/:id", getProductById);
router.get("/getbyslug/:slug", getProductBySlug);
router.patch("/update-product/:id", upload, updateProduct);
router.delete("/delete/:id", deleteProductById);

router.put("/update/feature/:id", updateFeatured);

module.exports = router;
