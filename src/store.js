import { isEqual } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movieInitialState, movieReducer } from './reducers/movie-reducer';

export default class MovieStore {
  #store = null;
  #previousState = null;

  constructor() {
    this.#store = createStore(movieReducer, movieInitialState, applyMiddleware(thunk));
    this.#previousState = movieInitialState;
  }

  dispatch(operation) {
    this.#store.dispatch(operation);
  }

  subscribe(state, cb) {
    this.#store.subscribe(() => {
      const nowState = this.#store.getState()[state];
      if (isEqual(nowState, this.#previousState[state])) {
        return;
      }
      cb(nowState);
      this.#previousState[state] = nowState;
    });
  }
}
