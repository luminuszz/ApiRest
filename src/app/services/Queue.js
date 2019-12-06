const kue = require('kue');
const redisConfig = require('../../config/redis');
const Sentry = require('@sentry/node');
const PurchaseMail = require('../jobs/purchaseMail');
const Queue = kue.createQueue({redis: redisConfig});


Queue.process(PurchaseMail.key, PurchaseMail.handle);

Queue.on('error', Sentry.captureException);

module.exports = Queue;
