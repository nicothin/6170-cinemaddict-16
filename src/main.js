import { renderTemplate } from './render';
import { createMovieCounter } from './view/movie-counter';
import { createUserRank } from './view/user-rank';
import { createMenu } from './view/menu';
import { createSorter } from './view/sorter';
import { createMovies } from './view/movies';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteHeaderElement, createUserRank());

renderTemplate(siteMainElement, createMenu());
renderTemplate(siteMainElement, createSorter());

renderTemplate(siteMainElement, createMovies());

renderTemplate(
  siteFooterElement.querySelector('.footer__statistics'),
  createMovieCounter()
);
