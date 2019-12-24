var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CallingSchema = new Schema({
  chamado: { type: String },
  resumo: { type: String, require: true },
  status: { type: String, require: true },
  encaminhadoPara: { type: Schema.Types.ObjectId, ref: 'User' },
  ultimaManutencao: { type: Date, require: true },
  proximaManutencao: { type: Date, require: true },
  valor: { type: Number }
});

var Calling = mongoose.model("Calling", CallingSchema);

module.exports = Calling;
