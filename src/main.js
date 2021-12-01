import { renderTemplate } from './render';
import { createMovieCounter } from './view/movieCounter';
import { createUserRank } from './view/userRank';
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
