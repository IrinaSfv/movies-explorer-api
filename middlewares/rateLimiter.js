const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: 'Too many request from this IP',
});

module.exports = rateLimiter;
