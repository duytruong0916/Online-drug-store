const express = require('express');
const router = express.Router();
const {productById, read, list} = require('../controllers/product')

router.get('/product/:productid', read);
router.get('/products', list);
router.param('productid', productById);

module.exports = router;
