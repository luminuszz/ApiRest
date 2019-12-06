const express = require('express');
const validate = require('express-validation');
const handle = require('express-async-handler');
// eslint-disable-next-line new-cap
const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

// Automatizando importação  com "require-dir"
const controllers = require('./app/controllers/index');
const validators = require('./app/validators/index');

// Controllers Routes
routes.post(
    '/users',
    validate(validators.User),
    handle(controllers.UserController.store),
);
routes.post(
    '/session',
    validate(validators.Session),
    handle(controllers.SessionController.store),
);

// Middlewares Routes
routes.use(authMiddleware);

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index));
routes.get('/ads/:id', handle(controllers.AdController.show));
routes.post(
    '/ads',
    validate(validators.Ad),
    handle(controllers.AdController.store),
);
routes.put(
    '/ads/:id',
    validate(validators.Ad),
    handle(controllers.AdController.uptade),
);
routes.delete('/ads/:id', handle(controllers.AdController.destroy));

/**
 * Purchases
 */
routes.post(
    '/purchase',
    validate(validators.Purchase),
    handle(controllers.PurchaseController.store),
);

module.exports = routes;
