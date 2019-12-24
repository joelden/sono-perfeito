var express = require('express');
var router = express.Router();
var ServiceController = require('../controllers/serviceControllers');

router.get('/', ServiceController.index);

router.get('/create', ServiceController.create_get);

router.post('/create/new', ServiceController.create_post);

router.get('/:id', ServiceController.show);

router.get('/edit/:id', ServiceController.edit);

router.post('/edit/update/:id', ServiceController.update)

router.get('/delete/:id', ServiceController.delete_service);

module.exports = router;
