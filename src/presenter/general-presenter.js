import { ModelState } from '../constants';
import { render } from '../utils/render';

import MovieCounter from '../view/movie-counter/movie-counter';
import UserRank from '../view/user-rank/user-rank';

export default class GeneralPresenter {
  #model = null;
  #siteHeaderElement = null;
  #siteFooterElement = null;

  #moviesCounter = 0;

  #userRankComponent = new UserRank(this.#moviesCounter);
  #movieCounterComponent = new MovieCounter(this.#moviesCounter);

  constructor(model, siteHeaderElement, siteFooterElement)  {
    this.#model = model;
    this.#siteHeaderElement = siteHeaderElement;
    this.#siteFooterElement = siteFooterElement;

    this.init();
  }

  init = () => {
    render(this.#siteHeaderElement, this.#userRankComponent);
    render(this.#siteFooterElement, this.#movieCounterComponent);

    this.#model.subscribe(ModelState.ALL_MOVIES, this.#modelAllMoviesListChangeHandler);
  }

  #modelAllMoviesListChangeHandler = (movies) => {
    const newMoviesCounter = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
    if (newMoviesCounter !== this.#moviesCounter) {
      this.#moviesCounter = newMoviesCounter;
      this.#userRankComponent.updateData({ counter: newMoviesCounter });
      this.#movieCounterComponent.updateData({ counter: movies.length });
    }
  }
}
