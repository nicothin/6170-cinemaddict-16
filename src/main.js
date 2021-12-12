import { render } from './utils/render';
import { StoreState } from './constants';
import MovieStore from './store';

import UserRank from './view/user-rank/user-rank';
import Menu from './view/menu/menu';
import Sorter from './view/sorter/sorter';
import MovieCounter from './view/movie-counter/movie-counter';
import { MoviesPagePresenter } from './presenter/movies-page-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieStore = new MovieStore();

const menuData = [
  {
    id: 'all',
    text: 'All movies',
    counter: 99,
    isActive: true,
    isShowCounter: false,
  },
  {
    id: 'watchlist',
    text: 'Watchlist',
    counter: 99,
    isActive: false,
    isShowCounter: true,
  },
  {
    id: 'history',
    text: 'History',
    counter: 7,
    isActive: false,
    isShowCounter: true,
  },
  {
    id: 'favorites',
    text: 'Favorites',
    counter: 4,
    isActive: false,
    isShowCounter: true,
  },
];

const userRankComponent = new UserRank(3);
render(siteHeaderElement, userRankComponent);

const menuComponent = new Menu(menuData);
render(siteMainElement, menuComponent);

const sorterComponent = new Sorter();
render(siteMainElement, sorterComponent);

const movieCounterComponent = new MovieCounter(666);
render(siteFooterElement, movieCounterComponent);

// Добавление презентеров

const moviesPagePresenter = new MoviesPagePresenter(siteMainElement);

moviesPagePresenter.init();

movieStore.subscribe(StoreState.ALL_MOVIES, moviesPagePresenter.changeMoviesListHandler);

movieStore.getAllMovies();
