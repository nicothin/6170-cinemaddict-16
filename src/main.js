import { axios } from './axios/axios';
import { render } from './utils/render';
import { RenderPosition } from './constants';
import { generateMovie, generateMoviesList } from './mock/generate-movies-list';

import UserRank from './view/user-rank';
import Menu from './view/menu';
import Sorter from './view/sorter';
import MoviePage from './view/movies';
import MovieList from './view/movie-list';
import MovieCounter from './view/movie-counter';
import MovieDetails from './view/movie-details';
import MovieCard from './view/movie-card';


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
    throw new Error('Network error', e);
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
const menuData = [
  {
    id: 'all',
    text: 'All movies',
    counter: movieList.main.length,
    isActive: true,
    isShowCounter: false,
  },
  {
    id: 'watchlist',
    text: 'Watchlist',
    counter: movieList.main.filter((movie) => movie.userDetails.watchlist).length,
    isActive: false,
    isShowCounter: true,
  },
  {
    id: 'history',
    text: 'History',
    counter: movieList.main.filter((movie) => movie.userDetails.alreadyWatched).length,
    isActive: false,
    isShowCounter: true,
  },
  {
    id: 'favorites',
    text: 'Favorites',
    counter: movieList.main.filter((movie) => movie.userDetails.favorite).length,
    isActive: false,
    isShowCounter: true,
  },
];

const userRankComponent = new UserRank(666);
const menuComponent = new Menu(menuData);
const sorterComponent = new Sorter();
const moviePageComponent = new MoviePage();
const movieMainListComponent = new MovieList({ title: 'All movies. Upcoming', hideTitle: true });
const movieTopRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });
const movieMostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
const movieDetailsComponent = new MovieDetails(movieDetail);
const movieCounterComponent = new MovieCounter(movieList.main.length);

render(siteHeaderElement, userRankComponent);

render(siteMainElement, menuComponent);

render(siteMainElement, sorterComponent);

render(siteMainElement, moviePageComponent);

render(moviePageComponent, movieMainListComponent);
movieList.main.forEach((movie) => {
  render(movieMainListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
});

render(moviePageComponent, movieTopRatedListComponent);
movieList.topRated.forEach((movie) => {
  render(movieTopRatedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
});

render(moviePageComponent, movieMostCommentedListComponent);
movieList.mostCommented.forEach((movie) => {
  render(movieMostCommentedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
});

render(siteFooterElement.querySelector('.footer__statistics'), movieCounterComponent);

render(siteFooterElement, movieDetailsComponent, RenderPosition.AFTEREND);
