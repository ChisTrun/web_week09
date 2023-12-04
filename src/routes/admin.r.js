const express = require('express');
const adminController = require('../controllers/admin.c')
const {Permission} = require('../Middlewares/permission');
const {auth} = require('../Middlewares/auth');
const router = express.Router();

router.get('/',auth,Permission([1]),adminController.getAdmin);

module.exports = router;