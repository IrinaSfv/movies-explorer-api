require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Переменные окружения
const { PORT, MONGO_URL_DEV } = require('./config/config');

const { NODE_ENV, MONGO_URL } = process.env;

const app = express();
// Подключаем Helmet для установки заголовков, связанных с безопасностью
app.use(helmet());

app.use(express.json());

// Подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

// Подключаем cors
app.use(cors);

// Подключаем логгер запросов
app.use(requestLogger);

app.use(rateLimiter);

// Подключаем роуты
app.use(router);

// Подключаем логгер ошибок
app.use(errorLogger);

// Обрабатываем ошибки
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // центральный обработчик ошибок

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
