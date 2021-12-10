import Component from '../../abstract/component';
import { createShowMore } from './show-more-button.tpl';

export default class ShowMore extends Component {
  #clickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  }

  get template() {
    return createShowMore();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }
}
