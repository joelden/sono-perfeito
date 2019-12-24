const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
  index: async (req, res) => {
    User.find()
    .sort([['nome', 'ascending']])
    .exec(function (err, users) {
      if (err) {
        res.render('users', {
          title: 'Usuários Cadastrados',
          message: "Ocorreu um erro ao tentar consultar os usuários da base de dados",
          error: err,
          users: users
        });
      }
      // Em caso de sucesso...
      res.render('users', {title: 'Usuários Cadastrados', users: users});
    });
  },

  customers: async (req, res) => {
    User.find({perfil: "Cliente"})
    .exec(function (err, users) {
      if (err) {
        res.render('users', {
          title: 'Clientes Cadastrados',
          message: "Ocorreu um erro ao tentar consultar os usuários da base de dados",
          error: err,
          users: users
        });
      }
      // Em caso de sucesso...
      res.render('users', {title: 'Usuários Cadastrados', users: users});
    });
  },

  employees: async (req, res) => {
    User.find({perfil: "Colaborador"})
    .exec(function (err, users) {
      if (err) {
        res.render('users', {
          title: 'Funcionários Cadastrados',
          message: "Ocorreu um erro ao tentar consultar os dados dos usuários da base de dados",
          error: err,
          users: users
        });
      }
      // Em caso de sucesso...
      res.render('users', {title: 'Usuários Cadastrados', users: users});
    });
  },

  create_get: async (req, res) => {
    res.render('users/form', {title: "Cadastro de Usuário"});
  },

  create_post: async (req, res, next) => {
    var user = new User(
      {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        telefone: req.body.telefone,
        perfil: req.body.perfil,
        endereco: [{
          logradouro: req.body.logradouro,
          bairro: req.body.bairro,
          numero: req.body.numero,
          cidade: req.body.cidade,
          estado: req.body.estado,
          referencia: req.body.referencia
        }]
      });

    user.save((err) => {
      if(err) {
        res.render('users/form', {
          title: "Cadastro de Usuário",
          success: false,
          message: "Infelismente não foi possível efetuar o cadastro",
          error: err
        });
      }
      // em caso de sucesso...
      res.render('users/form', {
        title: "Cadastro de Usuário",
        success: true,
        message: "Usuário Cadastrado com Sucesso!"
      });
    })
  },

  show: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    await User.findById(id)
    .exec(function (err, user) {
      if (err) {return next (err);}
      // Em caso de sucesso...
      res.render('users/details', { title: "Informações do Usuário", user: user } );
    })
  },

  edit: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    await User.findById(id)
    .exec(function (err, user) {
      if (err) {return next (err);}
      // Em caso de sucesso...
      res.render('users/form_update', {
        title: "Alterar Informações do Usuário",
        user: user
      });
    });
  },

  update: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    const updatedUser = await User.findOneAndUpdate({_id: id}, {
      $set:
        {
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
          telefone: req.body.telefone,
          perfil: req.body.perfil,
          endereco: [{
            logradouro: req.body.logradouro,
            bairro: req.body.bairro,
            numero: req.body.numero,
            cidade: req.body.cidade,
            estado: req.body.estado,
            referencia: req.body.referencia
          }]
        }
      }, (err, user) => {
        if (err) {
          res.render('users/form_update', {
            title: "Alterar Informações do Usuário",
            message: "Não foi realizar as alterações",
            success: false,
            error: err
          })
        } else {
          res.render('users', {
            title: "Informações do Usuário",
            message: "Informações do Usuário Alteradas com Sucesso!",
            success: true,
            user: user
          });
        }
      }
    )
  },

  delete_user: async (req, res) => {
    await User.deleteOne({_id: req.params.id}, function(err) {
      if(err) {
        res.render('users', {
          title: 'Usuários Cadastrados',
          message: "Não foi possível encotrar o ID do usuário",
          success: false,
          error: err,
          users: users
        });
      }
      // em caso de sucesso...
      res.render('users', {
        title: 'Usuários Cadastrados',
        success: true,
        message: "O Usuário Selecionado foi Excluído com Sucesso!"
      });
    });
  }
}
