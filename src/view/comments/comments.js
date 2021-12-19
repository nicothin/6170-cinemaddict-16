import Component from '../../abstract/component';
import { createElement, render } from '../../utils/render';
import { createComments } from './comments.tpl';

export default class Comments extends Component {
  #element = null;
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createComments(this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  renderComment = (commentComponent) => {
    render(this.#element.querySelector('.film-details__comments-list'), commentComponent);
  }
}
