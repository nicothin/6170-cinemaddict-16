import { renderTemplate } from './render';
import { createMovieCounter } from './view/movie-counter';
import { createUserRank } from './view/user-rank';
import { createMenu } from './view/menu';
import { createSorter } from './view/sorter';
import { createMovies } from './view/movies';
import { createMovieDetails } from './view/movie-details';
import { generateMovie, generateMoviesList } from './mock/generate-movies-list';

import { RenderPosition } from './constants';
import { axios } from './axios/axios';

axios
  .get('movies')
  .then((response) => {
    const all = response.data;
    const topRated = all.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1).slice(0, 2);
    const mostCommented = all.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1).slice(0, 2);
    // eslint-disable-next-line no-console
    console.log([all, topRated, mostCommented]);
    return response;
  })
  .catch((e) => {
    throw new Error('Ошибка сетевого обмена', e);
  });

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieDetail = generateMovie();
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
    RenderPosition.AFTEREND
  );
}
