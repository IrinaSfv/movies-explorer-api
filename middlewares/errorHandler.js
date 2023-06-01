const { INTERNAL_SERVER_STATUS } = require('../config/config');

const errorHandler = (err, req, res, next) => { // централизованный обработчик
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL_SERVER_STATUS, message } = err;
  res
    .status(statusCode)
    // проверяем статус и выставляем сообщение в зависимости от него
    .send({
      message: statusCode === INTERNAL_SERVER_STATUS
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

module.exports = { errorHandler };
