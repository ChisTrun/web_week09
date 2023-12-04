const express = require('express');
const accController = require('../controllers/acc.c')
const router = express.Router();

router.get('/login/:success?',accController.getLogin);
router.get('/signup/:success?',accController.getSignup);
router.post('/login',accController.postLogin);
router.post('/signup',accController.postSignup);
router.post('/logout',accController.postLogout);

module.exports = router;