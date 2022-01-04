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

  formReset = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((input) => {
      input.checked = false;
    });
    this.element.querySelector('.film-details__add-emoji-label').replaceChildren();

    this.element.querySelector('.film-details__comment-input').value = '';
  }

  restoreHandlers = () => {
    this.#setEmotionInputChangeHandler(this._callback.changeEmotion);
  }

  #setEmotionInputChangeHandler = (callback) => {
    this._callback.changeEmotion = callback;
    this.element.addEventListener('change', this.#setEmotion);
  }

  #setEmotion = (event) => {
    if (event.target.classList.contains('film-details__emoji-item')) {
      const emotion = event.target.value;
      const emotionWrapperElement = this.element.querySelector('.film-details__add-emoji-label');
      const imgElement = createElement(`<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`);
      emotionWrapperElement.replaceChildren();
      render(emotionWrapperElement, imgElement);
    }
  }
}
