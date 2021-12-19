export const MOVIE_COUNT_PER_STEP = 5;
export const MOVIE_TOP_RATED_COUNT = 2;
export const MOVIE_MOST_COMMENT_COUNT = 2;

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const Filters = {
  ALL: 'ALL',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const Sorting = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const StoreState = {
  ALL_MOVIES: 'allMovies',
  CURRENT_FILTER: 'currentFilter',
  ACTIVE_MOVIE_ID: 'activeMovieId',
};
