const mongoose = require('mongoose');
const Calling = require('../models/Calling');
const Service = require('../models/Service');
const User = require('../models/User');

module.exports = {
  index: async (req, res) => {
    Calling.find()
    .populate('encaminhadoPara')
    .exec(function (err, callings) {
      if (err) {
        res.render('calling', {
          title: 'Chamados',
          message: "Ocorreu um erro ao tentar consultar os dados dos chamdados na base de dados",
          error: err
        });
      }
      // Em caso de sucesso...
      res.render('calling', {title: 'Chamados', callings: callings});
    });
  },

  create_get: async (req, res) => {

    User.find({perfil: "Colaborador"})
    .exec(function (err, users) {
      if (err) {
        res.json({
          message: "Ocorreu um erro ao tentar consultar os dados dos colaradores na base de dados",
          error: err
        });
      } else {
        res.render('calling/form', {title: "Abrir Chamado", users: users});
      }
    })
  },

  create_post: async (req, res) => {
    var calling = new Calling(
      {
        chamado: req.body.chamado,
        resumo: req.body.resumo,
        status: req.body.status,
        encaminhadoPara: mongoose.Types.ObjectId(req.body.encaminhadoPara),
        ultimaManutencao: req.body.ultimaManutencao,
        proximaManutencao: req.body.proximaManutencao
      });

    calling.save((err) => {
      if(err) {
        res.render('calling/form', {
          title: "Abrir Chamado",
          success: false,
          message: "Infelismente não foi possível abrir o chamado",
          error: err
        });
      }
      // em caso de sucesso...
      res.render('calling/form', {
        title: "Abrir Chamado",
        success: true,
        message: "Chamado encaminhado para "
      });
    })
  },

  show: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    await Calling.findById(id)
    .exec(function (err, calling) {
      if (err) {return next (err);}
      // Em caso de sucesso...
      res.render('calling/details', { title: "Informações Detalhadas", calling: calling } );
    })
  },

  edit: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    var calling = await Calling.findById(id).populate('encaminhadoPara');

    var user = await User.find({perfil: "Colaborador"}, (err, users) => {
      return users;
    });

    res.render('calling/form_update', {
      title: "Chamados",
      calling: calling,
      users: user
    })
  },

  update: async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    const updatedCalling = await Calling.findOneAndUpdate({_id: id}, {
      $set:
      {
        chamado: req.body.chamado,
        resumo: req.body.resumo,
        status: req.body.status,
        encaminhadoPara: req.body.encaminhadoPara,
        ultimaManutencao: req.body.ultimaManutencao,
        proximaManutencao: req.body.proximaManutencao
      }
    }, (err, calling) => {
      if (err) {
        res.render('calling/form_update', {
          title: "Alterar Dados do Chamado",
          message: "Não foi realizar as alterações",
          success: false,
          error: err
        })
      } else {
        res.render('calling', {
          title: "Alterar Dados do Chamado",
          message: "Informações Alteradas com Sucesso!",
          success: true,
          calling: calling
        })
      }
    })
  },

  delete_calling: async (req, res) => {
    await Calling.deleteOne({_id: req.params.id}, function(err) {
      if(err) {
        res.render('calling', {
          title: 'Chamados',
          message: "Não foi possível encotrar o ID do chamado",
          success: false,
          error: err,
          users: users
        });
      }
      // em caso de sucesso...
      res.render('users', {
        title: 'Chamados',
        success: true,
        message: "Chamado Excluído"
      });
    });
  }
}
