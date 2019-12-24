const mongoose = require('mongoose');
const Service = require('../models/Service');

module.exports = {
  index: async (req, res) => {
    Service.find()
    .sort([['nome', 'ascending']])
    .exec(function (err, services) {
      if (err) {return next (err);}
      // Em caso de sucesso...
      res.render('services', {title: 'Serviços', services: services});
    });
  },

  create_get: async (req, res) => {
    res.render('services/form', {title: "Cadastro de Serviços"});
  },

  create_post: async (req, res, next) => {
    var service = new Service(
      {
        nome: req.body.nome,
        descrição: req.body.descricao
      });

    service.save((err) => {
      if(err) {return next(err);}
      // em caso de sucesso...
      res.render('services/form', {title: "Serviço Cadastrado com Sucesso!"});
    })
  },

  show: async (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.id);

    await Service.findById(id)
    .exec((err, services) => {
      if (err) {
        res.send("Não foi possível localizar o Serviço - " + err);
      };
      // em caso de sucesso...
      res.render('services/detail', {title: 'Serviços Cadastrados', service: service});
    })
  },

  edit: async (req, res) => {
    res.send('Alterar informações');
  },

  update: async (req, res) => {
    res.send('Informações Alteradas');
  },

  delete_service: async (req, res) => {
    res.send('Apagas as informações');
  }

}
