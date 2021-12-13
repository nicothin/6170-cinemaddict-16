import Component from '../../abstract/component';
import { createMoviesPageEmpty } from './movies-page-empty.tpl';

export default class MoviesPageEmpty extends Component {
  #props;

  constructor(props) {
    super();
    this.#props = props;
  }

  get template() {
    return createMoviesPageEmpty();
  }
}
