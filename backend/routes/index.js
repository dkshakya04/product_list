var express = require('express');
var router = express.Router();
var userRoutes = require('./userRoutes');
var productRoutes = require('./productRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRoutes);
router.use('/product', productRoutes);

module.exports = router;
