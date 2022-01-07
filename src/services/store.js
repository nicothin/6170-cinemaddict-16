import { isEqual } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from '../reducers/reducer';

class Store {
  #reduxStore = {};
  #previousStore = {};
  #subscribers = new Set();

  constructor() {
    this.#reduxStore = createStore(reducer, initialState, applyMiddleware(thunk));
    this.#reduxStore.subscribe(() => {
      const nowStore = this.#reduxStore.getState();
      this.#subscribers.forEach((subscriber) => {
        if (!isEqual(nowStore[subscriber.state], this.#previousStore[subscriber.state])) {
          subscriber.cb(nowStore[subscriber.state]);
        }
      });
      this.#previousStore = nowStore;
    });
  }

  dispatch = (operation) => this.#reduxStore.dispatch(operation);

  subscribe = (state, cb) => {
    this.#subscribers.add({ state, cb });
  }

  getState = (state) => {
    const currentState = this.#reduxStore.getState();
    return currentState[state] === undefined ? undefined : currentState[state];
  }
}

export default new Store();
