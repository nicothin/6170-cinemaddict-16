import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movieInitialState, movieReducer } from './reducers/movie-reducer';

export const movieStore = createStore(movieReducer, movieInitialState, applyMiddleware(thunk));
