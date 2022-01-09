import SmartComponent from '../../abstract/smart-component';
import { createSorter } from './sorter.tpl';

export default class Sorter extends SmartComponent {

  constructor(props) {
    super();
    this._data = props;
  }

  get template() {
    return createSorter(this._data);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'A') {
      return;
    }

    event.preventDefault();
    this._callback.sortTypeChange(event.target.dataset.sortType);
  }

  restoreHandlers = () => {
    this.setSortTypeChangeHandler(this._callback.sortTypeChange);
  }
}
