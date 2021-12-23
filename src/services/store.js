import { isEqual } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from '../reducers/reducer';

class Store {
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

  dispatch = (operation) => this.#store.dispatch(operation);

  subscribe = (state, cb) => {
    this.#subscribers.push({ state, cb });
  }

  getState = (state) => {
    const currentState = this.#store.getState();
    return currentState[state] === undefined ? undefined : currentState[state];
  }
}

export default new Store();
