const { Router } = require("express");
const UserController = require("../controller/User");
const userController = new UserController();
const authorize = require("../middleware/authorize");
const bruteForce =  require('../middleware/bruteForce');
const router = Router();

router.get("/", authorize, async (req, res) => {
  try {
    const result = await userController.show();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await userController.store(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  "/authenticate",
  bruteForce.globalBruteforce.prevent,
  bruteForce.userBruteforce.getMiddleware({
    key: (req, res, next) => {
      next(req.body.email);
    }
  }),
  async (req, res) => {
    try {
      const result = await userController.authenticate(req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);


module.exports = router;
