import { axios } from '../services/axios';
import { Hashes, ModelState } from '../constants';

const ActionType = {
  SET_ALL_MOVIES: 'SET_ALL_MOVIES',
  SET_HASH: 'SET_HASH',
  SET_ACTIVE_MOVIE_ID: 'SET_ACTIVE_MOVIE_ID',
};

export const initialState = {
  // TODO[@nicothin]: подумать как будет откатываться изменение, если сервер ответит на PUT не 200
  // [StoreState.ORIGINAL_MOVIES]: [], // возможно, хранением массива, мутируемого только после ответа 200
  [ModelState.ALL_MOVIES]: [],
  [ModelState.HASH]: Hashes.ALL,
  [ModelState.ACTIVE_MOVIE_ID]: null,
};

export const ActionCreator = {
  setAllMovies: (state) => ({
    type: ActionType.SET_ALL_MOVIES,
    payload: state,
  }),
  setHash: (state) => ({
    type: ActionType.SET_HASH,
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
      return { ...state, [ModelState.ALL_MOVIES]: action.payload };
    case ActionType.SET_HASH:
      return { ...state, [ModelState.HASH]: action.payload };
    case ActionType.SET_ACTIVE_MOVIE_ID:
      return { ...state, [ModelState.ACTIVE_MOVIE_ID]: action.payload };
    default:
      return state;
  }
};
