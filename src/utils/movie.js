import _ from 'lodash';
import { ModelState } from '../constants';
import { ActionCreator } from '../reducers/reducer';
import Store from '../services/store';

export const changeInStoreAddToWatchlist = (movieId) => {
  const allMovies = Store.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.watchlist = !movie.userDetails.watchlist;
    }
    return movie;
  });
  Store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

export const changeInStoreMarkAsWatched = (movieId) => {
  const allMovies = Store.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    }
    return movie;
  });
  Store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

export const changeInStoreFavorite = (movieId) => {
  const allMovies = Store.getState(ModelState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.favorite = !movie.userDetails.favorite;
    }
    return movie;
  });
  Store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};
