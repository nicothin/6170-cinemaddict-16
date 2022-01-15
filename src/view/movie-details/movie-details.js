import SmartComponent from '../../abstract/smart-component';
import { SHAKE_CLASSNAME, SHAKE_CLASSNAME_REMOVE_DELAY, TypeOfActionOnMovie } from '../../constants';
import { render } from '../../utils/render';
import { createMovieDetails } from './movie-details.tpl';

export default class MovieDetails extends SmartComponent {

  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createMovieDetails(this._data);
  }

  renderComments = (commentsComponent) => {
    render(this.element.querySelector('.film-details__bottom-container'), commentsComponent);
  }

  setCloseClickHandler = (callback) => {
    this._callback.close = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  }

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlist = callback;
    this.element
      .querySelector(`.film-details__control-button[data-action-type="${TypeOfActionOnMovie.WATCHLIST}"]`)
      .addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setMarkAsWatchedClickHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element
      .querySelector(`.film-details__control-button[data-action-type="${TypeOfActionOnMovie.HISTORY}"]`)
      .addEventListener('click', this.#markAsWatchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favorite = callback;
    this.element
      .querySelector(`.film-details__control-button[data-action-type="${TypeOfActionOnMovie.FAVORITES}"]`)
      .addEventListener('click', this.#favoriteClickHandler);
  }

  setScrollHandler = (callback) => {
    this._callback.scroll = callback;
    this.element.addEventListener('scroll', this.#onScroll);
  }

  shakeYourButtonBaby = (buttonType) => {
    const button = this.element.querySelector(`.film-details__control-button[data-action-type="${buttonType}"]`);
    button.classList.add(SHAKE_CLASSNAME);
    setTimeout(() => button.classList.remove(SHAKE_CLASSNAME), SHAKE_CLASSNAME_REMOVE_DELAY);
  }

  #closeClickHandler = (event) => {
    event.preventDefault();
    this._callback.close();
  }

  #addToWatchlistClickHandler = (event) => {
    event.preventDefault();
    this._callback.addToWatchlist(this._data.id);
  }

  #markAsWatchedClickHandler = (event) => {
    event.preventDefault();
    this._callback.markAsWatched(this._data.id);
  }

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favorite(this._data.id);
  }

  #onScroll = (event) => {
    this._callback.scroll(event.target.scrollTop);
  }

  restoreHandlers = () => {
    this.setCloseClickHandler(this._callback.close);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlist);
    this.setMarkAsWatchedClickHandler(this._callback.markAsWatched);
    this.setFavoriteClickHandler(this._callback.favorite);
    this.setScrollHandler(this._callback.scroll);
  }
}
