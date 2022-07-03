var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')
const auth = require('../middleware/auth');

router.get('/list', auth.userVerify, productController.productList);
router.get('/list/favourite', auth.userVerify, productController.productListFavourite);
router.post('/add/favourite', auth.userVerify, productController.addToFavourite);
router.post('/remove/favourite', auth.userVerify, productController.removeFromFavourite);

module.exports = router;
