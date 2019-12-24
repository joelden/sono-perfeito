const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

  index: async (req, res) => {
    User.findOne({email: req.body.email})
    .exec((err, user) => {
      if (err, user) {
        res.render('login', {
          title: 'Login',
          message: "Ocorreu um erro ao tentar realizar a autenticação",
          error: err
        })
      }
    })
    // Em caso de sucesso...
    res.redirect('/admin');
  },

  logout: async (req, res) => {
    res.send({title: "informações do Usuário"});
  }
}
