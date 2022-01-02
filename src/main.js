import Model from './services/store';

import { ActionCreator, Operation } from './reducers/reducer';
import GeneralPresenter from './presenter/general-presenter';
import MainMenuPresenter from './presenter/main-menu-presenter';
import MoviesPagePresenter from './presenter/movies-page-presenter';
import MovieDetailsPresenter from './presenter/movie-details-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

new GeneralPresenter(siteHeaderElement, siteFooterElement);

new MainMenuPresenter(Model, siteMainElement);

new MoviesPagePresenter(siteMainElement);

new MovieDetailsPresenter(siteFooterElement);

Model.dispatch(Operation.requestAllMovies());

const hash = window.location.hash.replace('#', '');
if (hash) {
  Model.dispatch(ActionCreator.setHash(hash));
}
