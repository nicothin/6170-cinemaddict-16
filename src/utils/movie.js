import _ from 'lodash';
import { ModelState } from '../constants';
import { ActionCreator } from '../reducers/reducer';
import Model from '../services/store';

/**
 * Переключить метку Добавлено в лист просмотра в модели
 * @param {string} movieId Идентификатор фильма
 */
export const changeInStoreAddToWatchlist = (movieId) => {
  const allMovies = Model.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.watchlist = !movie.userDetails.watchlist;
    }
    return movie;
  });
  Model.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

/**
 * Переключить метку Просмотрено в модели
 * @param {string} movieId Идентификатор фильма
 */
export const changeInStoreMarkAsWatched = (movieId) => {
  const allMovies = Model.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    }
    return movie;
  });
  Model.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

/**
 * Переключить метку Избранное в модели
 * @param {string} movieId Идентификатор фильма
 */
export const changeInStoreFavorite = (movieId) => {
  const allMovies = Model.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.favorite = !movie.userDetails.favorite;
    }
    return movie;
  });
  Model.dispatch(ActionCreator.setAllMovies(newAllMovies));
};
