import { axios } from '../services/axios';
import { Filters, Sorting, StoreState } from '../constants';

const ActionType = {
  SET_ALL_MOVIES: 'SET_ALL_MOVIES',
  SET_ACTIVE_FILTER: 'SET_ACTIVE_FILTER',
  SET_ACTIVE_SORTING: 'SET_ACTIVE_SORTING',
  SET_ACTIVE_MOVIE: 'SET_ACTIVE_MOVIE',
};

export const initialState = {
  [StoreState.ALL_MOVIES]: [],
  [StoreState.ACTIVE_FILTER]: Filters.ALL,
  [StoreState.ACTIVE_SORTING]: Sorting.DEFAULT,
  [StoreState.ACTIVE_MOVIE]: null,
};

export const ActionCreator = {
  setAllMovies: (state) => ({
    type: ActionType.SET_ALL_MOVIES,
    payload: state,
  }),
  setActiveFilter: (state) => ({
    type: ActionType.SET_ACTIVE_FILTER,
    payload: state,
  }),
  setActiveSorting: (state) => ({
    type: ActionType.SET_ACTIVE_SORTING,
    payload: state,
  }),
  setActiveMovie: (state) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: state,
  }),
};

export const Operation = {
  getAllMovies: () => (dispatch) => {
    axios
      .get('movies')
      .then((response) => {
        const all = response.data;
        // const topRated = response.data.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1).slice(0, MOVIE_TOP_RATED_COUNT);
        // const mostCommented = response.data.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1).slice(0, MOVIE_MOST_COMMENT_COUNT);
        dispatch(ActionCreator.setAllMovies(all));
        // dispatch(ActionCreator.setTopRatedMovies(topRated));
        // dispatch(ActionCreator.setMostCommentedMovies(mostCommented));
        return response;
      })
      .catch((e) => {
        throw new Error('Ошибка сетевого обмена', e);
      });
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_ALL_MOVIES:
      return { ...state, [StoreState.ALL_MOVIES]: action.payload };
    case ActionType.SET_ACTIVE_FILTER:
      return { ...state, [StoreState.ACTIVE_FILTER]: action.payload };
    case ActionType.SET_ACTIVE_SORTING:
      return { ...state, [StoreState.ACTIVE_SORTING]: action.payload };
    case ActionType.SET_ACTIVE_MOVIE:
      return { ...state, [StoreState.ACTIVE_MOVIE]: action.payload };
    default:
      return state;
  }
};
