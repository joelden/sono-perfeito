var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  nome: { type: String, require: true },
  descricao: { type: String, require: true },
  quantidade: { type: Number, require: true },
  ultimaManutencao: { type: Date, require: true },
  proximaManutencao: { type: Date, require: true },
  valor: { type: Number }
});

var Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
