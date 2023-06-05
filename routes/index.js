const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const NotFound = require('../errors/notFound');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

module.exports = router;
