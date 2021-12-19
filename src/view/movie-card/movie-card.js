import Component from '../../abstract/component';
import { createMovieCard } from './movie-card.tpl';

export default class MovieCard extends Component {
  #movie = null;

  #linkClickHandler = (event) => {
    event.preventDefault();
    this._callback.click(this.#movie.id);
  }

  constructor(movie) {
    super(movie);
    this.#movie = movie;
  }

  get template() {
    return createMovieCard(this.#movie);
  }

  setLinkClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  }
}
