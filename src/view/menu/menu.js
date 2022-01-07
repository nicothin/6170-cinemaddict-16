import SmartComponent from '../../abstract/smart-component';
import { createMenu } from './menu.tpl';

export default class Menu extends SmartComponent {

  /**
   * Главное меню проекта
   * @param {{
   * filters: [{
   *   id: Filters.WATCHLIST,
   *   text: 'Watchlist',
   *   counter: 0,
   *   isActive: false,
   *   isShowCounter: true,
   * }],
   * isStats: boolean
   * }} props Список фильтров и флаг активности страницы статистика (ЧЕЛОДЛАНЬ)
   */

  constructor(props) {
    super();

    this._data = props;
  }

  get template() {
    return createMenu(this._data);
  }

  setLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.addEventListener('click', this.#linkClickHandler);
  }

  #linkClickHandler = (event) => {
    if (event.target.hash) {
      this._callback.linkClick(event.target.hash);
    }
  }

  restoreHandlers = () => {
    this.setLinkClickHandler(this._callback.linkClick);
  }
}
