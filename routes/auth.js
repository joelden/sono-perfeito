var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authController');

router.get('/', AuthController.index);

router.get('/logout', AuthController.logout);

module.exports = router;
