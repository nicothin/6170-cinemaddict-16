import { Hashes, ModelState } from '../constants';
import { remove, render } from '../utils/render';

import MoviesPresenter from './movies-presenter';
import StatsPresenter from './stats-presenter';

import PageContentEmpty from '../view/page-content-empty/page-content-empty';
import MoviesPage from '../view/movies-page/movies-page';

export default class PageContentPresenter {
  #model = null;
  #container = null;
  #currentHash = Hashes.ALL;

  #moviesPageInnerComponent = new MoviesPage();
  #loadingComponent = new PageContentEmpty('Loading...');

  #moviesPagePresenter = null;
  #statsPagePresenter = null;

  constructor(model, container) {
    this.#model = model;
    this.#container = container;

    this.#moviesPagePresenter = new MoviesPresenter(model, container);
    this.#statsPagePresenter = new StatsPresenter(model, container);

    this.init();
  }

  init = () => {
    this.#currentHash = this.#model.getState(ModelState.HASH);

    this.#model.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
    this.#model.subscribe(ModelState.HASH, this.#changeHashHandler);
  }

  showLoading = () => {
    render(this.#container, this.#moviesPageInnerComponent);
    render(this.#moviesPageInnerComponent, this.#loadingComponent);
  }

  #renderPageContent = () => {
    // NOTE[@nicothin]: роутер, ѣ
    if (this.#currentHash === Hashes.STATS) {
      this.#moviesPagePresenter.remove();
      this.#statsPagePresenter.render();
    }

    else {
      this.#statsPagePresenter.remove();
      this.#moviesPagePresenter.render();
    }
  }

  #changeAllMoviesListHandler = () => {
    remove(this.#loadingComponent);

    this.#renderPageContent();
  }

  #changeHashHandler = (hash) => {
    if (hash === this.#currentHash) {
      return;
    }

    this.#currentHash = hash;

    this.#renderPageContent();
  }
}
