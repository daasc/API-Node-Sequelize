const multer = require("multer");
const crypto = require('crypto');
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) callback(err);
      const filename = `${hash.toString("hex")}-${file.originalname}`;
      callback(null, filename);
    });
  },
});
const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, callback) => {
  const allowwedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
  if (allowwedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type"));
  }
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
