const multer = require("multer");

const singleUploder = (uploadPath, fileSizeLimit, fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: fileSizeLimit },
  }).single(fieldName);
};

module.exports = singleUploder;
