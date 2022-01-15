import Model from './services/store';

import { ActionCreator, Operation } from './reducers/reducer';
import GeneralPresenter from './presenter/general-presenter';
import MainMenuPresenter from './presenter/main-menu-presenter';
import PageContentPresenter from './presenter/page-content-presenter';
import MovieDetailsPresenter from './presenter/movie-details-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const hash = window.location.hash.replace('#', '');
if (hash) {
  Model.dispatch(ActionCreator.setHash(hash));
}

new GeneralPresenter(Model, siteHeaderElement, siteFooterElement);

new MainMenuPresenter(Model, siteMainElement);

new MovieDetailsPresenter(Model, siteFooterElement);

const moviesPage = new PageContentPresenter(Model, siteMainElement);

Model.dispatch(Operation.requestAllMovies());
moviesPage.showLoading();
