import _ from 'lodash';
import { StoreState } from '../constants';
import { ActionCreator } from '../reducers/reducer';
import Store from '../services/store';

export const changeInStoreAddToWatchlist = (movieId) => {
  const store = new Store();
  const allMovies = store.getState(StoreState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.watchlist = !movie.userDetails.watchlist;
    }
    return movie;
  });
  store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

export const changeInStoreMarkAsWatched = (movieId) => {
  const store = new Store();
  const allMovies = store.getState(StoreState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    }
    return movie;
  });
  store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};

export const changeInStoreFavorite = (movieId) => {
  const store = new Store();
  const allMovies = store.getState(StoreState.ALL_MOVIES);
  const newAllMovies = _.cloneDeep(allMovies).map((movie) => {
    if (movie.id === movieId) {
      movie.userDetails.favorite = !movie.userDetails.favorite;
    }
    return movie;
  });
  store.dispatch(ActionCreator.setAllMovies(newAllMovies));
};
