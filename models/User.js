const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  telefone: {
    type: String
  },
  perfil: {
    type: String
  },
  endereco: [
    {
      logradouro: String,
      bairro: String,
      numero: String,
      cidade: String,
      estado: String,
      referencia: String
    }
  ]
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
