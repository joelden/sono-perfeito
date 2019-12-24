var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');

router.get('/', UserController.index);

router.get('/customers', UserController.customers);

router.get('/employees', UserController.employees);

router.get('/create', UserController.create_get);

router.post('/create/new', UserController.create_post);

router.get('/:id', UserController.show);

router.get('/edit/:id', UserController.edit);

router.post('/edit/update/:id', UserController.update)

router.get('/delete/:id', UserController.delete_user);

module.exports = router;
