const express = require('express');
const mongoose = require('mongoose');


class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.Node_ENV !== 'production';
    this.database();
    this.middleswares();
    this.routes();
  }
  database() {
    mongoose.connect('mongodb://localhost:27017/bankapi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    mongoose.set('useCreateIndex', true);
  }


  middleswares() {
    this.express.use(express.json());
  }
  routes() {
    this.express.use(require('./routes'));
  }
}


module.exports= new App().express;
