import Component from '../../abstract/component';
import { createUserRank } from './user-rank.tpl';

export default class UserRank extends Component {
  #watchedMoviesCounter = 0;

  constructor(watchedMoviesCounter) {
    super();
    this.#watchedMoviesCounter = watchedMoviesCounter;
  }

  get template() {
    return createUserRank(this.#watchedMoviesCounter);
  }
}
