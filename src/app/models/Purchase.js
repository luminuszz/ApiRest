const mongoose = require('mongoose');


// eslint-disable-next-line new-cap
const Purchase = mongoose.Schema({

  purchaseState: {
    type: Boolean,
    required: true,

  },

  idAd: {
    type: String,
    required: true,
  },

  idUser: {
    type: String,
    required: true,
  },


});


module.exports = mongoose.model('Purchase', Purchase);
