import Component from '../../abstract/component';
import { createElement, render } from '../../utils/render';
import { createMovieList } from './movie-list.tpl';

export default class MovieList extends Component {
  #props;
  #element = null;

  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createMovieList(this.#props);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  clearList = () => {
    this.#element.querySelector('.films-list__container').replaceChildren(); // by-by, fucking IE
  }

  renderMovieCard = (movieCardComponent) => {
    render(this.#element.querySelector('.films-list__container'), movieCardComponent);
  }
}
