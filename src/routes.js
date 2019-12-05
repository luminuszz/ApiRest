const express = require('express');

// eslint-disable-next-line new-cap
const routes = express.Router();


const authMiddleware = require('./app/middlewares/auth');

// Automatizando importação de controllers com "require-dir"
const controllers = require('./app/controllers/index');

// Middlewares Routes
routes.get('/teste', authMiddleware, (req, res) =>
  res.json({ok: true}),
);

// Controllers Routes
routes.post('/users', controllers.UserController.store);
routes.post('/session', controllers.SessionController.store);

module.exports = routes;
