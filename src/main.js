import { renderTemplate } from './render';
import { createMovieCounter } from './view/movie-counter';
import { createUserRank } from './view/user-rank';
import { createMenu } from './view/menu';
import { createSorter } from './view/sorter';
import { createMovies } from './view/movies';
import { createMovieDetails } from './view/movie-details';
import { generateMovie } from './mock/generate-movies-list';

import { RENDERPOSITION } from './constants';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieMock = generateMovie();

renderTemplate(siteHeaderElement, createUserRank());

renderTemplate(siteMainElement, createMenu());
renderTemplate(siteMainElement, createSorter());

renderTemplate(siteMainElement, createMovies());

renderTemplate(
  siteFooterElement.querySelector('.footer__statistics'),
  createMovieCounter()
);

renderTemplate(
  siteFooterElement,
  createMovieDetails(movieMock),
  RENDERPOSITION.AFTEREND
);
