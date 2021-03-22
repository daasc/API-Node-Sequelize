const { Router } = require("express");
const AccountController = require("../controller/Account");
const accountController = new AccountController();
const authorize = require("../middleware/authorize");

const router = Router();

router.get("/", authorize, async (req, res) => {
  try {
    const result = await accountController.show();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await accountController.store(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
