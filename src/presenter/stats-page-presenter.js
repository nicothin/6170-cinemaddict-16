import { ModelState } from '../constants';
import { remove, render } from '../utils/render';
import StatsPage from '../view/stats-page/stats-page';

export default class StatsPagePresenter {
  #model = null;
  #container = null;
  #statsPageComponent = null;

  constructor(model, container)  {
    this.#model = model;
    this.#container = container;
    this.#statsPageComponent = new StatsPage();

    this.init();
  }

  init = () => {
    // render(this.#container, this.#statsPageComponent);

    this.#model.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
  }

  render = () => {
    render(this.#container, this.#statsPageComponent);
  }

  remove = () => {
    remove(this.#statsPageComponent);
  }

  #changeAllMoviesListHandler = () => { // movies
    // console.log('changeAllMoviesListHandler');
  //   const newMoviesCounter = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  //   if (newMoviesCounter !== this.#moviesCounter) {
  //     this.#moviesCounter = newMoviesCounter;
  //     this.#userRankComponent.updateData({ counter: newMoviesCounter });
  //     this.#movieCounterComponent.updateData({ counter: newMoviesCounter });
  //   }
  }
}
