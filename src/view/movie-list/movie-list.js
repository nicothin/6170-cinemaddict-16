import Component from '../../abstract/component';
import { createElement, render } from '../../utils/render';
import MovieCard from '../movie-card/movie-card';
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

  renderMovieCard = (movie) => {
    const movieCardComponent = new MovieCard(movie);
    render(this.#element.querySelector('.films-list__container'), movieCardComponent);
  }
}
