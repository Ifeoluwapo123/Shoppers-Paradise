const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const productController = require('../controllers/productsController');

router.use(bodyparser.urlencoded({extended:false}));
router.use(express.json());
router.use(express.static('public'));

//all products that are not uploaded by users
router.get('/', productController.otherProducts);

//products uploaded by users
router.get('/:id', productController.userProducts);

//users delete their product(s)
router.post('/delete', productController.deleteProducts);

module.exports = {router: router};

      