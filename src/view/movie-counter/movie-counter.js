import Component from '../../abstract/component';
import { createMovieCounter } from './movie-counter.tpl';

export default class MovieCounter extends Component {
  #counter;

  constructor(counter) {
    super();
    this.#counter = counter;
  }

  get template() {
    return createMovieCounter(this.#counter);
  }
}
