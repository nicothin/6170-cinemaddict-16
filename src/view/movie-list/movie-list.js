import Component from '../../abstract/component';
import { createMovieList } from './movie-list.tpl';

export default class MovieList extends Component {
  #props;

  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createMovieList(this.#props);
  }
}
