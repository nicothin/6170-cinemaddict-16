import { axios } from '../services/axios';
import { Filters, StoreState } from '../constants';

const ActionType = {
  SET_ALL_MOVIES: 'SET_ALL_MOVIES',
  SET_CURRENT_FILTER: 'SET_CURRENT_FILTER',
  SET_ACTIVE_MOVIE_ID: 'SET_ACTIVE_MOVIE_ID',
};

export const initialState = {
  // TODO[@nicothin]: подумать как будет откатываться изменение, если сервер ответит на PUT не 200
  // [StoreState.ORIGINAL_MOVIES]: [], // возможно, хранением массива, мутируемого только после ответа 200
  [StoreState.ALL_MOVIES]: [],
  [StoreState.CURRENT_FILTER]: Filters.ALL,
  [StoreState.ACTIVE_MOVIE_ID]: null,
};

export const ActionCreator = {
  setAllMovies: (state) => ({
    type: ActionType.SET_ALL_MOVIES,
    payload: state,
  }),
  setCurrentFilter: (state) => ({
    type: ActionType.SET_CURRENT_FILTER,
    payload: state,
  }),
  setActiveMovieId: (id) => ({
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: id,
  }),
};

export const Operation = {
  requestAllMovies: () => (dispatch) => axios
    .get('movies')
    .then((response) => {
      const all = response.data;
      dispatch(ActionCreator.setAllMovies(all));
      return response;
    }),
  requestComments: (movieId) => async () => axios
    .get(`comments/${movieId}`)
    .then((response) => response.data),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_ALL_MOVIES:
      return { ...state, [StoreState.ALL_MOVIES]: action.payload };
    case ActionType.SET_CURRENT_FILTER:
      return { ...state, [StoreState.CURRENT_FILTER]: action.payload };
    case ActionType.SET_ACTIVE_MOVIE_ID:
      return { ...state, [StoreState.ACTIVE_MOVIE_ID]: action.payload };
    default:
      return state;
  }
};
