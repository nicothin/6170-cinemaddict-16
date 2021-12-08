import Component from '../abstract/component';

const createMoviesPage = () => '<section class="films"></section>';

export default class MoviePage extends Component {

  get template() {
    return createMoviesPage();
  }
}
