var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Sono Perfeito'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login', error: null});
});

router.get('/authenticate', function(req, res, next) {
  res.redirect('/auth/admin');
});

router.get('/register', function(req, res, next) {
  res.render('login/register', {title: 'Criar usuário', error: null});
});

module.exports = router;
