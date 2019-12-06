const express = require('express');
const validate = require('express-validation');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

// Automatizando importação  com "require-dir"
const controllers = require('./app/controllers/index');
const validators = require('./app/validators/index');

// Controllers Routes
routes.post(
    '/users',
    validate(validators.User),
    controllers.UserController.store,
);
routes.post(
    '/session',
    validate(validators.Session),
    controllers.SessionController.store,
);

// Middlewares Routes
routes.use(authMiddleware);

/**
 * Ads
 */
routes.get('/ads', controllers.AdController.index);
routes.get('/ads/:id', controllers.AdController.show);
routes.post('/ads', validate(validators.Ad), controllers.AdController.store);
routes.put(
    '/ads/:id',
    validate(validators.Ad),
    controllers.AdController.uptade,
);
routes.delete('/ads/:id', controllers.AdController.destroy);

/**
 * Purchases
 */
routes.post(
    '/purchase',
    validate(validators.Purchase),
    controllers.PurchaseController.store,
);

module.exports = routes;
