const express = require('express')
const orderController = require('../controllers/order.c') 
const router = express.Router();

router.get('/',orderController.getAll);
router.get('/detail/OrderID=:OrderID',orderController.detail);
module.exports = router;