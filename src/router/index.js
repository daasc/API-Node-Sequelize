const { Router } = require("express");
const user = require('./user');
const account = require('./account');
const book = require("./book");
const router = Router();

router.use('/user', user);
router.use('/account', account);
router.use('/book', book);
router.get('/', async (req, res) => {
    res.send('api running!'); 
});

module.exports = router; 