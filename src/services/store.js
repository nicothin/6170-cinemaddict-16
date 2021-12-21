import { isEqual } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer, Operation, ActionCreator } from '../reducers/reducer';

export default class Store {
  #store = {};
  #previousStore = {};
  #subscribers = [];

  constructor() {
    // TODO[@nicothin]: разобраться точнее как это работает. Прототипы?
    if (Store._instance) {
      return Store._instance;
    }
    Store._instance = this;

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

  requestAllMovies = () => this.#store.dispatch(Operation.requestAllMovies())

  requestComments = (movieId) => this.#store.dispatch(Operation.requestComments(movieId))

  setAllMovies = (allMovies) => this.#store.dispatch(ActionCreator.setAllMovies(allMovies))

  setActiveMovieId = (movieId) => this.#store.dispatch(ActionCreator.setActiveMovieId(movieId))
}
