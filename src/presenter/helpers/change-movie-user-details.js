import dayjs from 'dayjs';
import _ from 'lodash';
import snakecaseKeys from 'snakecase-keys';
import { ModelState, typeOfActionOnMovie } from '../../constants';
import { ActionCreator, Operation } from '../../reducers/reducer';

/**
 * Изменить пользовательские данные фильма
 * @param {object} model Модель, с которой пообщаться
 * @param {string} action Тип действия (см. typeOfActionOnMovie)
 * @param {string} movieId Идентификатор изменяемого фильма
 * @returns {Promise}
 */
export const changeMovieUserDetails = (model, action, movieId) => {
  const allMovies = _.cloneDeep(model.getState(ModelState.ALL_MOVIES));
  const movie = allMovies.find((item) => item.id === movieId);

  switch (action) {
    case typeOfActionOnMovie.WATCHLIST:
      movie.userDetails.watchlist = !movie.userDetails.watchlist;
      break;
    case typeOfActionOnMovie.HISTORY:
      movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
      movie.userDetails.watchingDate = movie.userDetails.alreadyWatched ? dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]') : null;
      break;
    case typeOfActionOnMovie.FAVORITES:
      movie.userDetails.favorite = !movie.userDetails.favorite;
      break;
    default:
      break;
  }

  const data = snakecaseKeys(movie);
  return model
    .dispatch(Operation.changeMovieUserDetails(movieId, data))
    .then(() => {
      model.dispatch(ActionCreator.setAllMovies(allMovies));
    });
};
