const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const NotOwner = require('../errors/notOwner');
const { OK_STATUS, OK_CREATED_STATUS } = require('../config/config');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(OK_STATUS).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(OK_CREATED_STATUS).send(movie))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        const message = Object.values(e.errors)
          .map((error) => error.message)
          .join('; ');

        next(new BadRequest(message));
      } else {
        next(e);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(ownerId)) {
        throw new NotOwner('Невозможно удалить чужую карточку фильма');
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(OK_STATUS).send(movie);
          })
          .catch(next);
      }
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о фильме'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
