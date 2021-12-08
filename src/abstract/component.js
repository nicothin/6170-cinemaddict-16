import { createElement } from '../utils/render';

export default class Component {
  #element = null;
  _callback = {};

  constructor() {
    if (new.target === Component) {
      throw new Error('Can\'t instantiate Component, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Component method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }
}
