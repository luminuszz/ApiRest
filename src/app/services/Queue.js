const kue = require('kue');
const redisConfig = require('../../config/redis');
const jobs = require('../jobs');
const PurchaseMail = require('../jobs/purchaseMail');
const Queue = kue.createQueue({redis: redisConfig});


Queue.process(PurchaseMail.key, PurchaseMail.handle);

module.exports = Queue;
