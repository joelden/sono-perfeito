const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

  index: async (req, res) => {
    res.render('admin', {title: "Área Administrativa"});
  }
}
