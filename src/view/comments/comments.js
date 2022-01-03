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
    this.element.querySelector('.film-details__comments-list').replaceChildren();
  }

  renderComment = (commentComponent) => {
    render(this.element.querySelector('.film-details__comments-list'), commentComponent);
  }

  setEmotion = (emotion) => {
    const emotionWrapperElement = this.element.querySelector('.film-details__add-emoji-label');
    const imgElement = createElement(`<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`);
    emotionWrapperElement.replaceChildren();
    render(emotionWrapperElement, imgElement);
  }

  pseudoFormReset = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((input) => {
      input.checked = false;
    });
    this.element.querySelector('.film-details__comment-input').value = '';
    this.element.querySelector('.film-details__add-emoji-label').replaceChildren();
  }

  restoreHandlers = () => {}
}
