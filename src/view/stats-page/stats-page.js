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

  // setScrollHandler = (callback) => {
  //   this._callback.scroll = callback;
  //   this.element.addEventListener('scroll', this.#onScroll);
  // }

  // #onScroll = (event) => {
  //   this._callback.scroll(event.target.scrollTop);
  // }

  restoreHandlers = () => {
    // this.setScrollHandler(this._callback.scroll);
  }
}
