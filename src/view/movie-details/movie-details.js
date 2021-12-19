import Component from '../../abstract/component';
import { createMovieDetails } from './movie-details.tpl';

export default class MovieDetails extends Component {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieDetails(this.#movie);
  }
}
