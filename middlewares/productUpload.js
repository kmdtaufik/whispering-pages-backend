const multer = require("multer");
const path = require("path");

//Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.field}${fileExtension}`;
    cb(null, uniqueName);
  },
});

//product upload
const productUpload = multer({ storage });
module.exports = productUpload;
