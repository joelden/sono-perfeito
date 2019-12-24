var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/adminController');

router.get('/', AdminController.index);

module.exports = router;
