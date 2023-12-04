const express = require('express')
const productController = require('../controllers/product.c') 
const router = express.Router();

router.get('/',productController.getAll);
router.get('/ProID=:ProID',productController.getByProID)
router.get('/per_page=:per_page/page=:page',productController.getAllPaging);
router.get('/per_page=:per_page/page=:page/CatID=:CatID',productController.getByCatID);
router.post('/remove',productController.removeProduct);
router.post('/add',productController.addProduct);
router.post('/update',productController.updateProduct);

module.exports = router;