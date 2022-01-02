import Store from '../services/store';
import { ModelState } from '../constants';
import { remove, render } from '../utils/render';

import MovieCounter from '../view/movie-counter/movie-counter';
import UserRank from '../view/user-rank/user-rank';

export default class GeneralPresenter {
  #siteHeaderElement = null
  #siteFooterElement = null

  #currentUserRank = 0
  #currentMovieCounter = 0

  #userRankComponent = null
  #movieCounterComponent = null;

  constructor(siteHeaderElement, siteFooterElement)  {
    this.#siteHeaderElement = siteHeaderElement;
    this.#siteFooterElement = siteFooterElement;

    // NOTE[@nicothin]: зачем мне INIT, если есть конструктор?
    this.init();
  }

  init = () => {
    Store.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
  }

  #changeAllMoviesListHandler = (movies) => {
    const newUserRank = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
    if (newUserRank !== this.#currentUserRank) {
      this.#currentUserRank = newUserRank;
      this.#renderUserRank();
    }

    const newMovieCounter = movies.length;
    if (newMovieCounter !== this.#currentMovieCounter) {
      this.#currentMovieCounter = newMovieCounter;
      this.#renderMovieCounter();
    }
  }

  #renderUserRank = () => {
    if (this.#userRankComponent) {
      remove(this.#userRankComponent);
    }
    if (this.#currentUserRank > 0) {
      this.#userRankComponent = new UserRank(this.#currentUserRank);
      render(this.#siteHeaderElement, this.#userRankComponent);
    }
  }

  #renderMovieCounter = () => {
    if (this.#movieCounterComponent) {
      remove(this.#movieCounterComponent);
    }
    this.#movieCounterComponent = new MovieCounter(this.#currentMovieCounter);
    render(this.#siteFooterElement, this.#movieCounterComponent);
  }
}
