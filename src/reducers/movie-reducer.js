import { axios } from '../axios/axios';
import { MovieStore, MOVIE_MOST_COMMENT_COUNT, MOVIE_TOP_RATED_COUNT } from '../constants';

export const movieInitialState = {
  [MovieStore.ALL]: [],
  [MovieStore.TOP_RATED]: [],
  [MovieStore.MOST_COMMENTED]: [],
};

const ActionType = {
  SET_ALL_MOVIES: 'SET_ALL_MOVIES',
  SET_TOP_RATED_MOVIES: 'SET_TOP_RATED_MOVIES',
  SET_MOST_COMMENTED_MOVIES: 'SET_MOST_COMMENTED_MOVIES',
};

export const ActionCreator = {
  setAllMovies: (state) => ({
    type: ActionType.SET_ALL_MOVIES,
    payload: state,
  }),
  setTopRatedMovies: (state) => ({
    type: ActionType.SET_TOP_RATED_MOVIES,
    payload: state,
  }),
  setMostCommentedMovies: (state) => ({
    type: ActionType.SET_MOST_COMMENTED_MOVIES,
    payload: state,
  }),
};

export const Operation = {
  getAllMovies: () => (dispatch) => {
    axios
      .get('movies')
      .then((response) => {
        const all = response.data;
        const topRated = all.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1).slice(0, MOVIE_TOP_RATED_COUNT);
        const mostCommented = all.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1).slice(0, MOVIE_MOST_COMMENT_COUNT);
        dispatch(ActionCreator.setAllMovies(all));
        dispatch(ActionCreator.setTopRatedMovies(topRated));
        dispatch(ActionCreator.setMostCommentedMovies(mostCommented));
        return response;
      })
      .catch((e) => {
        throw new Error('Ошибка сетевого обмена', e);
      });
  },
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_ALL_MOVIES:
      return { ...state, allMovies: action.payload };
    case ActionType.SET_TOP_RATED_MOVIES:
      return { ...state, topRatedMovies: action.payload };
    case ActionType.SET_MOST_COMMENTED_MOVIES:
      return { ...state, mostCommentedMovies: action.payload };
    default:
      return state;
  }
};
