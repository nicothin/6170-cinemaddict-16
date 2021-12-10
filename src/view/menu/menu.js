import Component from '../../abstract/component';
import { createMenu } from './menu.tpl';

export default class Menu extends Component {
  #menuData;

  constructor(menuData) {
    super();
    this.#menuData = menuData;
  }

  get template() {
    return createMenu(this.#menuData);
  }
}
