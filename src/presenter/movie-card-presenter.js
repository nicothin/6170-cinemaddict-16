import { ActionCreator } from '../reducers/reducer';
import { TypeOfActionOnMovie } from '../constants';
import { changeMovieUserDetails } from './helpers/change-movie-user-details';
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
    this.#movieCardComponent.setLinkClickHandler(this.#movieCardLinkClickHandler);
    this.#movieCardComponent.setAddToWatchlistClickHandler(this.#movieCardAddToWatchlistHandler);
    this.#movieCardComponent.setMarkAsWatchedClickHandler(this.#movieCardMarkAsWatchedHandler);
    this.#movieCardComponent.setFavoriteClickHandler(this.#movieCardFavoriteHandler);

    this.#wrapperComponent.renderMovieCard(this.#movieCardComponent);
  }

  #movieCardLinkClickHandler = (movieId) => {
    this.#model.dispatch(ActionCreator.setActiveMovieId(movieId));
  }

  #movieCardAddToWatchlistHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.WATCHLIST, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(TypeOfActionOnMovie.WATCHLIST);
      });
  }

  #movieCardMarkAsWatchedHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.HISTORY, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(TypeOfActionOnMovie.HISTORY);
      });
  }

  #movieCardFavoriteHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.FAVORITES, movieId)
      .catch(() => {
        this.#movieCardComponent.shakeYourButtonBaby(TypeOfActionOnMovie.FAVORITES);
      });
  }
}
