import { isEqual } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Filters, Sorting } from './constants';
import { initialState, reducer, Operation, ActionCreator } from './reducers/reducer';

export default class MovieStore {
  #store = {};
  #previousStore = {};
  #subscribers = [];

  constructor() {
    this.#store = createStore(reducer, initialState, applyMiddleware(thunk));
    this.#store.subscribe(() => {
      const nowStore = this.#store.getState();
      this.#subscribers.forEach((subscriber) => {
        if (!isEqual(nowStore[subscriber.state], this.#previousStore[subscriber.state])) {
          subscriber.cb(nowStore[subscriber.state]);
        }
      });
      this.#previousStore = nowStore;
    });
  }

  getAllMovies() {
    this.#store.dispatch(Operation.getAllMovies());
  }

  setActiveFilter(filter) {
    const newFilter = Filters[filter];
    if (!newFilter) {
      throw Error('Incorrect filter');
    }
    this.#store.dispatch(ActionCreator.setActiveFilter(newFilter));
  }

  setActiveSorting(sorting) {
    const newSorting = Sorting[sorting];
    if (!newSorting) {
      throw Error('Incorrect sorting');
    }
    this.#store.dispatch(ActionCreator.setActiveSorting(newSorting));
  }

  setActiveMovie(movie) {
    this.#store.dispatch(ActionCreator.setActiveMovie(movie));
  }

  subscribe = (state, cb) => {
    this.#subscribers.push({state, cb});
  }
}
