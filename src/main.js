import { axios } from './axios/axios';
import { remove, render } from './utils/render';
import {
  MOVIE_COUNT_PER_STEP,
  MOVIE_MOST_COMMENT_COUNT,
  MOVIE_TOP_RATED_COUNT,
  RenderPosition
} from './constants';

import UserRank from './view/user-rank';
import Menu from './view/menu';
import Sorter from './view/sorter';
import MoviePage from './view/movies';
import MovieList from './view/movie-list';
import MovieCounter from './view/movie-counter';
import MovieDetails from './view/movie-details';
import MovieCard from './view/movie-card';
import ShowMore from './view/show-more-button';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

// NOTE[@nicothin]: Кровь из глаз. Временно, пока не ясно с реактивностью.
// TODO[@nicothin]: Впилить redux?
axios
  .get('movies')
  .then((response) => {
    const movieList = {
      main: response.data,
      topRated: response.data.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1).slice(0, MOVIE_TOP_RATED_COUNT),
      mostCommented: response.data.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1).slice(0, MOVIE_MOST_COMMENT_COUNT),
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
    const movieCounterComponent = new MovieCounter(movieList.main.length);
    const showMoreMainListComponent = new ShowMore();

    const renderMovieCard = (movie) => {
      const movieCardComponent = new MovieCard(movie);
      render(movieMainListComponent.element.querySelector('.films-list__container'), movieCardComponent);
      movieCardComponent.setLinkClickHandler(() => {
        const movieDetailsComponent = new MovieDetails(movie);
        render(siteFooterElement, movieDetailsComponent, RenderPosition.AFTEREND);
      });
    };

    render(siteHeaderElement, userRankComponent);

    render(siteMainElement, menuComponent);

    render(siteMainElement, sorterComponent);

    render(siteMainElement, moviePageComponent);

    render(moviePageComponent, movieMainListComponent);

    movieList.main
      .slice(0, Math.min(movieList.main.length, MOVIE_COUNT_PER_STEP))
      .forEach((movie) => renderMovieCard(movie));

    if (movieList.main.length > MOVIE_COUNT_PER_STEP) {
      let showingMovieCardCounter = MOVIE_COUNT_PER_STEP;
      render(movieMainListComponent, showMoreMainListComponent);

      showMoreMainListComponent.setClickHandler(() => {
        movieList.main
          .slice(showingMovieCardCounter, showingMovieCardCounter + MOVIE_COUNT_PER_STEP)
          .forEach((movie) => renderMovieCard(movie));

        showingMovieCardCounter += MOVIE_COUNT_PER_STEP;

        if (showingMovieCardCounter >= movieList.main.length) {
          remove(showMoreMainListComponent);
        }
      });
    }

    render(moviePageComponent, movieTopRatedListComponent);

    movieList.topRated.forEach((movie) => {
      render(movieTopRatedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
    });

    render(moviePageComponent, movieMostCommentedListComponent);

    movieList.mostCommented.forEach((movie) => {
      render(movieMostCommentedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
    });

    render(siteFooterElement.querySelector('.footer__statistics'), movieCounterComponent);

    return response;
  })
  .catch((e) => {
    throw new Error('Network error', e);
  });
