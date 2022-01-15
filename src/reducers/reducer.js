import { axios } from '../services/axios';
import { Hashes, ModelState } from '../constants';

const ActionType = {
  SET_ALL_MOVIES: 'SET_ALL_MOVIES',
  SET_HASH: 'SET_HASH',
  SET_ACTIVE_MOVIE_ID: 'SET_ACTIVE_MOVIE_ID',
};

export const initialState = {
  [ModelState.ALL_MOVIES]: null,
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
      // NOTE[@nicothin]: имитатор пустоты пришедшего ответа:
      // dispatch(ActionCreator.setAllMovies([]));
      return response;
    })
    .catch((reason) => {
      throw new Error(reason);
    }),

  changeMovieUserDetails: (movieId, data) => async () => axios
    .put(`movies/${movieId}`, data)
    .catch((reason) => {
      throw new Error(reason);
    }),

  requestComments: (movieId) => async () => axios
    .get(`comments/${movieId}`)
    .then((response) => response.data)
    .catch((reason) => {
      throw new Error(reason);
    }),

  deleteComment: (commentId) => async () => axios
    .delete(`comments/${commentId}`)
    .catch((reason) => {
      throw new Error(reason);
    }),

  sendComment: (movieId, data) => async () => axios
    .post(`comments/${movieId}`, data)
    .catch((reason) => {
      throw new Error(reason);
    }),
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
