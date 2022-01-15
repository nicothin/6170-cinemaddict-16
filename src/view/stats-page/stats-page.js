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

  setFilterHandler = (callback) => {
    this._callback.change = callback;
    this.element.addEventListener('change', this.#filterChange);
  }

  #filterChange = (event) => {
    this._callback.change(event.target.value);
  }

  restoreHandlers = () => {
    this.setFilterHandler(this._callback.change);
  }
}
