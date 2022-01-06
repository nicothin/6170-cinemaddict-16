import Component from '../../abstract/component';
import { SHAKE_CLASSNAME, SHAKE_CLASSNAME_REMOVE_DELAY, typeOfActionOnMovie } from '../../constants';
import { createMovieCard } from './movie-card.tpl';

export default class MovieCard extends Component {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCard(this.#movie);
  }

  setLinkClickHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.film-card__link')
      .addEventListener('click', this.#linkClickHandler);
  }

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlist = callback;
    this.element
      .querySelector(`.film-card__controls-item[data-action-type="${typeOfActionOnMovie.WATCHLIST}"]`)
      .addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element
      .querySelector(`.film-card__controls-item[data-action-type="${typeOfActionOnMovie.HISTORY}"]`)
      .addEventListener('click', this.#markAsWatchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favorite = callback;
    this.element
      .querySelector(`.film-card__controls-item[data-action-type="${typeOfActionOnMovie.FAVORITES}"]`)
      .addEventListener('click', this.#favoriteClickHandler);
  }

  shakeYourButtonBaby = (buttonType) => {
    // TODO[@nicothin]: переделать взаимодействие с кнопками карточки и деталей с классов на [data-action-type
    const button = this.element.querySelector(`.film-card__controls-item[data-action-type="${buttonType}"]`);
    button.classList.add(SHAKE_CLASSNAME);
    setTimeout(() => button.classList.remove(SHAKE_CLASSNAME), SHAKE_CLASSNAME_REMOVE_DELAY);
  }

  #linkClickHandler = (event) => {
    event.preventDefault();
    this._callback.click(this.#movie.id);
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
