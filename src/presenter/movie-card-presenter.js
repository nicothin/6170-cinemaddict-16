import Store from '../services/store';
import { ActionCreator } from '../reducers/reducer';
import MovieCard from '../view/movie-card/movie-card';
import { changeInStoreAddToWatchlist, changeInStoreFavorite, changeInStoreMarkAsWatched } from '../utils/movie';

export default class MovieCardPresenter {
  #wrapperComponent = null;
  #movie = null;

  constructor(wrapperComponent, movie) {
    this.#wrapperComponent = wrapperComponent;
    this.#movie = movie;

    this.init();
  }

  init = () => {
    const movieCardComponent = new MovieCard(this.#movie);
    movieCardComponent.setLinkClickHandler(this.#linkClickHandler);
    movieCardComponent.setAddToWatchlistClickHandler(this.#addToWatchlistHandler);
    movieCardComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedHandler);
    movieCardComponent.setFavoriteClickHandler(this.#favoriteHandler);

    this.#wrapperComponent.renderMovieCard(movieCardComponent);
  }

  #linkClickHandler = (movieId) => {
    Store.dispatch(ActionCreator.setActiveMovieId(movieId));
  }

  #addToWatchlistHandler = (movieId) => changeInStoreAddToWatchlist(movieId)

  #markAsWatchedHandler = (movieId) => changeInStoreMarkAsWatched(movieId)

  #favoriteHandler = (movieId) => changeInStoreFavorite(movieId)
}
