import Store from '../services/store';
import { ActionCreator } from '../reducers/reducer';

export default class MovieCardPresenter {
  #store = new Store();

  #wrapperComponent = null;
  #movie = null;

  constructor(component, movie) {
    this.#wrapperComponent = component;
    this.#movie = movie;

    this.init();
  }

  init = () => {
    this.#wrapperComponent.renderMovieCard(this.#movie, this.#linkClickHandler);
  }

  #linkClickHandler = (movieId) => {
    this.#store.dispatch(ActionCreator.setActiveMovieId(movieId));
  }
}
