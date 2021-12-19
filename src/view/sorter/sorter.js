import Component from '../../abstract/component';
// import { dispatch } from '../../main';
// import { ActionCreator } from '../../reducers/reducer';
import { createSorter } from './sorter.tpl';

export default class Sorter extends Component {
  get template() {
    return createSorter();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);

    this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');

    // dispatch(ActionCreator.setActiveSorting(evt.target.dataset.sortType));
    // console.log(dispatch);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }
}
