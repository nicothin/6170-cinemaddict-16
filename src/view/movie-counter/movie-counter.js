import SmartComponent from '../../abstract/smart-component';
import { createMovieCounter } from './movie-counter.tpl';

export default class MovieCounter extends SmartComponent {

  /**
   * Счётчик просмотренных фильмов
   * @param {{ counter: number }} props
   */

  constructor(props) {
    super();

    this._data = props;
  }

  get template() {
    return createMovieCounter(this._data);
  }

  restoreHandlers = () => {}
}
