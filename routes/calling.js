var express = require('express');
var router = express.Router();
var CallingController = require('../controllers/callingController');

router.get('/', CallingController.index);

router.get('/create', CallingController.create_get);

router.post('/create/new', CallingController.create_post);

router.get('/:id', CallingController.show);

router.get('/edit/:id', CallingController.edit);

router.post('/edit/update/:id', CallingController.update)

router.get('/delete/:id', CallingController.delete_calling);

module.exports = router;
