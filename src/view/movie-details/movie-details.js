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
}
