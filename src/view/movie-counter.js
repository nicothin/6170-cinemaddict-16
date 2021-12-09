import Component from '../abstract/component';

export const createMovieCounter = (counter) => `
  <p>${counter} movies inside</p>
`.trim();

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
