import SmartComponent from '../../abstract/smart-component';
import { createElement, render } from '../../utils/render';
import { createComments } from './comments.tpl';

export default class Comments extends SmartComponent {

  constructor(props) {
    super();
    this._data = props;
  }

  get template() {
    return createComments(this._data);
  }

  showFail = (reason) => {
    this.element.querySelector('.film-details__comments-title').innerHTML = 'Loading comments failed';
    throw new Error(reason);
  }

  setDeleteButtonToRequestState = (commentId) => {
    const button = this.element.querySelector(`.film-details__comment[data-comment-id="${commentId}"] .film-details__comment-delete`);
    button.setAttribute('disabled', 'disabled');
    button.innerHTML = button.dataset.requestText;
  }

  setDeleteButtonToDefaultState = (commentId) => {
    const button = this.element.querySelector(`.film-details__comment[data-comment-id="${commentId}"] .film-details__comment-delete`);
    button.removeAttribute('disabled');
    button.innerHTML = button.dataset.defaultText;
  }

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.addEventListener('click', this.#deleteClickHandler);
  }

  #deleteClickHandler = (event) => {
    if (event.target.classList.contains('film-details__comment-delete')) {
      event.preventDefault();
      this._callback.deleteComment(
        event.target.closest('.film-details__comment').dataset.commentId
      );
    }
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

  restoreHandlers = () => {
    this.#setEmotionInputChangeHandler(this._callback.changeEmotion);
    this.setDeleteCommentHandler(this._callback.deleteComment);
  }
}
