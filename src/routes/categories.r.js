const express = require('express')
const categoriesController = require('../controllers/categories.c') 
const router = express.Router();

router.get('/',categoriesController.getAll);
router.get('/CatID=:CatID',categoriesController.getByCatID);
router.post('/remove',categoriesController.removeCat);
router.post('/add',categoriesController.addCat);
router.post('/update',categoriesController.updateCat);

module.exports = router;