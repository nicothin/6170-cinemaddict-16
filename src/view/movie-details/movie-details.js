import Component from '../../abstract/component';
import { createElement, render } from '../../utils/render';
import { createMovieDetails } from './movie-details.tpl';

export default class MovieDetails extends Component {
  #element = null;
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieDetails(this.#movie);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  renderComments = (commentsComponent) => {
    render(this.#element.querySelector('.film-details__bottom-container'), commentsComponent);
  }

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlist = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#markAsWatchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favorite = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  #addToWatchlistClickHandler = (event) => {
    event.preventDefault();
    this._callback.addToWatchlist(this.#movie.id);
  }

  #markAsWatchedClickHandler = (event) => {
    event.preventDefault();
    this._callback.markAsWatched(this.#movie.id);
  }

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favorite(this.#movie.id);
  }
}
