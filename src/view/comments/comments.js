import SmartComponent from '../../abstract/smart-component';
import { createElement, render } from '../../utils/render';
import { createComments } from './comments.tpl';

export default class Comments extends SmartComponent {
  #element = null;

  constructor(props) {
    super();
    this._data = props;
  }

  get template() {
    return createComments(this._data);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  clearList = () => {
    this.#element.querySelector('.film-details__comments-list').replaceChildren(); // by-by, fucking IE
  }

  renderComment = (commentComponent) => {
    render(this.#element.querySelector('.film-details__comments-list'), commentComponent);
  }

  restoreHandlers = () => {}
}
