const express = require('express');

// eslint-disable-next-line new-cap
const routes = express.Router();


const authMiddleware = require('./app/middlewares/auth');

// Automatizando importação de controllers com "require-dir"
const controllers = require('./app/controllers/index');

// Controllers Routes
routes.post('/users', controllers.UserController.store);
routes.post('/session', controllers.SessionController.store);

// Middlewares Routes
routes.use(authMiddleware);

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index);
routes.get('/ads/:id', controllers.AdController.show);
routes.post('/ads', controllers.AdController.store);
routes.put('/ads/:id', controllers.AdController.uptade);
routes.delete('/ads/:id', controllers.AdController.destroy);

/**
 * Purchases
 */
routes.post('/purchase', controllers.PurchaseController.store);

module.exports = routes;
