import Component from '../abstract/component';

// TODO[@nicothin]: убрать экспорт
export const createShowMore = () => `
  <button class="films-list__show-more">Show more</button>
`.trim();

export default class ShowMore extends Component {
  #clickHandler = (evt) => {
    evt.preventDefault();
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
