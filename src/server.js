const express = require('express');
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');
const mongoose = require('mongoose');
const validate = require('express-validation');
const Youch = require('youch');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.Node_ENV !== 'production';
    this.sentry();
    this.database();
    this.middleswares();
    this.routes();
    this.exceptions();
  }
  sentry( ) {
    Sentry.init(sentryConfig);
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
    this.express.use(Sentry.Handlers.requestHandler());
  }
  routes() {
    this.express.use(require('./routes'));
  }

  exceptions() {
    /**
    *  if (process.env.Node_ENV === 'production') {
    * }
    */
    this.express.use(Sentry.Handlers.errorHandler());
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.Node_ENV !== 'production') {
        const youch = new Youch(err, req);

        return res.send( await youch.toHTML());
      }
      {return res.status(err.status || 500).json({error: 'Internal Error'});}
    });
  }
}

module.exports = new App().express;
