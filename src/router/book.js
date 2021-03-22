const { Router } = require("express");
const BookController = require("../controller/Book");
const bookController = new BookController();
const authorize = require("../middleware/authorize");
const cloudinary = require('../middleware/cloudinary');
const upload =  require('../middleware/multer');
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await bookController.show();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", authorize, upload.single("image"), async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(image.secure_url);
    console.log(req.body);
    const result = await bookController.store(req.body, image.secure_url);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
