import Component from '../../abstract/component';
import { createMoviesPage } from './movies-page.tpl';

export default class MoviesPage extends Component {

  get template() {
    return createMoviesPage();
  }
}
