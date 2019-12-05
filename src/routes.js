const express = require('express');

// eslint-disable-next-line new-cap
const routes = express.Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

// Middlewares Routes
routes.get('/teste', authMiddleware, (req, res) =>
  res.json({ok: true}),
);

// Controllers Routes
routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

module.exports = routes;
