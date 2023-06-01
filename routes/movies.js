const express = require('express');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const movieRouter = express.Router();

// возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/movies', getMovies);

// создаёт фильм с переданными данными
movieRouter.post('/movies', validateCreateMovie, createMovie);

// удаляет сохранённый фильм по id
movieRouter.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
