import Component from '../../abstract/component';
import { createSorter } from './sorter.tpl';

export default class Sorter extends Component {
  get template() {
    return createSorter();
  }
}
