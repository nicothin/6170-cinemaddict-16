import Component from '../abstract/component';

const createMovieList = ({ title, hideTitle = false, modifiers = '' }) => `
    <section class="films-list ${modifiers}">
      <h2 class="films-list__title${hideTitle ? ' visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container"></div>
    </section>
`.trim();

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
