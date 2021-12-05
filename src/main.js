import { renderTemplate } from './render';
import { createMovieCounter } from './view/movie-counter';
import { createUserRank } from './view/user-rank';
import { createMenu } from './view/menu';
import { createSorter } from './view/sorter';
import { createMovies } from './view/movies';
import { createMovieDetails } from './view/movie-details';
import { generateMovie, generateMoviesList } from './mock/generate-movies-list';

import { RENDERPOSITION } from './constants';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieDetail = false; // generateMovie();
const movieList = {
  main: generateMoviesList(23),
  topRated: generateMoviesList(2),
  mostCommented: generateMoviesList(2),
};

renderTemplate(siteHeaderElement, createUserRank());

renderTemplate(siteMainElement, createMenu(movieList.main));

renderTemplate(siteMainElement, createSorter());

renderTemplate(siteMainElement, createMovies(movieList));

renderTemplate(
  siteFooterElement.querySelector('.footer__statistics'),
  createMovieCounter(666)
);

if (movieDetail) {
  renderTemplate(
    siteFooterElement,
    createMovieDetails(movieDetail),
    RENDERPOSITION.AFTEREND
  );
}
