import Store from './services/store';

import { Operation } from './reducers/reducer';
import GeneralPresenter from './presenter/general-presenter';
import MainMenuPresenter from './presenter/main-menu-presenter';
import MoviesPagePresenter from './presenter/movies-page-presenter';
import MovieDetailsPresenter from './presenter/movie-details-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const store = new Store();

new GeneralPresenter(siteHeaderElement, siteFooterElement);

new MainMenuPresenter(siteMainElement);

new MoviesPagePresenter(siteMainElement);

new MovieDetailsPresenter(siteFooterElement);

store.dispatch(Operation.requestAllMovies());
