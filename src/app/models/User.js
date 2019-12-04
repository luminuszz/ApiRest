// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');
// Criando Tabela de Usuários.
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,

  },
  password: {
    type: String,
    required: true,

  },

  createdAt: {
    type: Date,
    default: Date.now,

  },

});

// Criando Hook de cripitografia de senha.
UserSchema.pre('save', async function(next) {
  if (! this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
});


// Metodos
UserSchema.methods = {
  // Criando metodo de metodo de comprar senha com o hash da senha
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },

};

// Statics
UserSchema.statics = {
  // Definindo JWT do id
  generateToken({id}) {
    return jwt.sign({id}, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};


module.exports = mongoose.model('User', UserSchema);
