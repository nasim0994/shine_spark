const router = require("express").Router();
const multer = require("multer");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  getAllCustomers,
  updateImage,
  updateInfo,
  deleteAnUser,
  updatePassword,
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe);
router.get("/allUsers", verifyAdmin, getAllUsers);
router.get("/allCustomers", verifyAdmin, getAllCustomers);

router.put("/updateImage/:id", verifyToken, upload, updateImage);
router.put("/update/info/:id", verifyToken, updateInfo);
router.patch("/update/password/:id", verifyToken, updatePassword);
router.delete("/delete/:id", verifyAdmin, deleteAnUser);

module.exports = router;
