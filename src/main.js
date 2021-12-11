import { remove, render } from './utils/render';
import { StoreState, MOVIE_COUNT_PER_STEP, RenderPosition } from './constants';
import { Operation } from './reducers/movie-reducer';
import MovieStore from './store';

import UserRank from './view/user-rank/user-rank';
import Menu from './view/menu/menu';
import Sorter from './view/sorter/sorter';
import MoviesPage from './view/movies-page/movies-page';
import MovieList from './view/movie-list/movie-list';
import MovieCounter from './view/movie-counter/movie-counter';
import MovieDetails from './view/movie-details/movie-details';
import MovieCard from './view/movie-card/movie-card';
import ShowMore from './view/show-more-button/show-more-button';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieStore = new MovieStore();

const moviePageComponent = new MoviesPage();

const changeMainMoviesHandler = (allMovies) => {
  const watchListCounter = allMovies.filter((movie) => movie.userDetails.watchlist).length || 0;
  const alreadyWatchedCounter = allMovies.filter((movie) => movie.userDetails.alreadyWatched).length || 0;
  const favoriteCounter = allMovies.filter((movie) => movie.userDetails.favorite).length || 0;

  const menuData = [
    {
      id: 'all',
      text: 'All movies',
      counter: allMovies.length,
      isActive: true,
      isShowCounter: false,
    },
    {
      id: 'watchlist',
      text: 'Watchlist',
      counter: watchListCounter,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'history',
      text: 'History',
      counter: alreadyWatchedCounter,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'favorites',
      text: 'Favorites',
      counter: favoriteCounter,
      isActive: false,
      isShowCounter: true,
    },
  ];

  const userRankComponent = new UserRank(alreadyWatchedCounter);
  const menuComponent = new Menu(menuData);
  const sorterComponent = new Sorter();
  const movieMainListComponent = new MovieList({ title: 'All movies. Upcoming', hideTitle: true });

  render(siteHeaderElement, userRankComponent);
  render(siteMainElement, menuComponent);
  render(siteMainElement, sorterComponent);
  render(siteMainElement, moviePageComponent);
  render(moviePageComponent, movieMainListComponent);

  const renderMovieCard = (movie) => {
    const movieCardComponent = new MovieCard(movie);
    render(movieMainListComponent.element.querySelector('.films-list__container'), movieCardComponent);
    movieCardComponent.setLinkClickHandler(() => {
      const movieDetailsComponent = new MovieDetails(movie);
      render(siteFooterElement, movieDetailsComponent, RenderPosition.AFTEREND);
    });
  };

  allMovies
    .slice(0, Math.min(allMovies.length, MOVIE_COUNT_PER_STEP))
    .forEach((movie) => renderMovieCard(movie));

  if (allMovies.length > MOVIE_COUNT_PER_STEP) {
    const showMoreMainListComponent = new ShowMore();

    let showingMovieCardCounter = MOVIE_COUNT_PER_STEP;
    render(movieMainListComponent, showMoreMainListComponent);

    showMoreMainListComponent.setClickHandler(() => {
      allMovies
        .slice(showingMovieCardCounter, showingMovieCardCounter + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => renderMovieCard(movie));

      showingMovieCardCounter += MOVIE_COUNT_PER_STEP;

      if (showingMovieCardCounter >= allMovies.length) {
        remove(showMoreMainListComponent);
      }
    });
  }

  const movieCounterComponent = new MovieCounter(allMovies.length);
  render(siteFooterElement.querySelector('.footer__statistics'), movieCounterComponent);
};

const changeTopRatedMoviesHandler = (topRatedMovies) => {
  const movieTopRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });
  render(moviePageComponent, movieTopRatedListComponent);

  topRatedMovies.forEach((movie) => {
    render(movieTopRatedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
  });
};

const changeMostCommentedMoviesHandler = (mostCommentedMovies) => {
  const movieMostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
  render(moviePageComponent, movieMostCommentedListComponent);

  mostCommentedMovies.forEach((movie) => {
    render(movieMostCommentedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
  });
};

movieStore.subscribe(StoreState.ALL, changeMainMoviesHandler);
movieStore.subscribe(StoreState.TOP_RATED, changeTopRatedMoviesHandler);
movieStore.subscribe(StoreState.MOST_COMMENTED, changeMostCommentedMoviesHandler);

movieStore.dispatch(Operation.getAllMovies());
