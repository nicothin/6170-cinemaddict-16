import { ActionCreator } from '../reducers/reducer';
import { typeOfActionOnMovie } from '../constants';
import { changeMovieUserDetails } from '../utils/movie';
import MovieCard from '../view/movie-card/movie-card';

export default class MovieCardPresenter {
  #model = null;
  #wrapperComponent = null;
  #movieCardComponent = null;
  #movie = null;

  constructor(model, wrapperComponent, movie) {
    this.#model = model;
    this.#wrapperComponent = wrapperComponent;
    this.#movie = movie;

    this.init();
  }

  init = () => {
    this.#movieCardComponent = new MovieCard(this.#movie);
    this.#movieCardComponent.setLinkClickHandler(this.#linkClickHandler);
    this.#movieCardComponent.setAddToWatchlistClickHandler(this.#addToWatchlistHandler);
    this.#movieCardComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedHandler);
    this.#movieCardComponent.setFavoriteClickHandler(this.#favoriteHandler);

    this.#wrapperComponent.renderMovieCard(this.#movieCardComponent);
  }

  #linkClickHandler = (movieId) => {
    this.#model.dispatch(ActionCreator.setActiveMovieId(movieId));
  }

  #addToWatchlistHandler = (movieId) => {
    changeMovieUserDetails(this.#model, typeOfActionOnMovie.WATCHLIST, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(typeOfActionOnMovie.WATCHLIST);
      });
  }

  #markAsWatchedHandler = (movieId) => {
    changeMovieUserDetails(this.#model, typeOfActionOnMovie.HISTORY, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(typeOfActionOnMovie.HISTORY);
      });
  }

  #favoriteHandler = (movieId) => {
    changeMovieUserDetails(this.#model, typeOfActionOnMovie.FAVORITES, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(typeOfActionOnMovie.FAVORITES);
      });
  }
}
