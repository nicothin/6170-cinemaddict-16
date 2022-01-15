import SmartComponent from '../../abstract/smart-component';
import { createStatsPage } from './stats-page.tpl.js';

export default class StatsPage extends SmartComponent {

  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createStatsPage(this._data);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.filterChange = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  #filterChangeHandler = (event) => {
    this._callback.filterChange(event.target.value);
  }

  restoreHandlers = () => {
    this.setFilterChangeHandler(this._callback.filterChange);
  }
}
