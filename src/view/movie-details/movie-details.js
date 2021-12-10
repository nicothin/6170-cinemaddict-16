import Component from '../../abstract/component';
import { createMovieDetails } from './movie-details.tpl';
import { setPageScrollDisable } from '../../utils/dom';
import { remove } from '../../utils/render';

export default class MovieDetails extends Component {
  #movie = null;
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  };

  constructor(movie) {
    super(movie);
    this.#movie = movie;

    setPageScrollDisable(true);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  get template() {
    return createMovieDetails(this.#movie);
  }

  close () {
    setPageScrollDisable(false);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this);
  }
}
