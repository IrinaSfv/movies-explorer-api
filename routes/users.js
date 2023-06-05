const express = require('express');
const { validateUpdateUserInfo } = require('../middlewares/validation');

const {
  getCurrentUserInfo,
  updateUserInfo,
} = require('../controllers/users');

const userRouter = express.Router();

// возвращает информацию о текущем пользователе
userRouter.get('/users/me', getCurrentUserInfo);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/users/me', validateUpdateUserInfo, updateUserInfo);

module.exports = userRouter;
