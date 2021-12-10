import { isEqual } from 'lodash';
import { remove, render } from './utils/render';
import { MovieStore, MOVIE_COUNT_PER_STEP, RenderPosition } from './constants';
import { movieInitialState, Operation as MovieOperation } from './reducers/movie-reducer';
import { movieStore } from './store';

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

const moviePageComponent = new MoviesPage();

const previousStore = movieInitialState;

const changeMainMoviesHandler = () => {
  const newStore = movieStore.getState();
  if(isEqual(previousStore[MovieStore.ALL], newStore[MovieStore.ALL])) {
    return;
  }
  previousStore[MovieStore.ALL] = newStore[MovieStore.ALL];

  const menuData = [
    {
      id: 'all',
      text: 'All movies',
      counter: newStore[MovieStore.ALL].length,
      isActive: true,
      isShowCounter: false,
    },
    {
      id: 'watchlist',
      text: 'Watchlist',
      counter: newStore[MovieStore.ALL].filter((movie) => movie.userDetails.watchlist).length,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'history',
      text: 'History',
      counter: newStore[MovieStore.ALL].filter((movie) => movie.userDetails.alreadyWatched).length,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'favorites',
      text: 'Favorites',
      counter: newStore[MovieStore.ALL].filter((movie) => movie.userDetails.favorite).length,
      isActive: false,
      isShowCounter: true,
    },
  ];

  const watchListCounter = menuData.find((item) => item.id === 'watchlist').counter || 0;

  const userRankComponent = new UserRank(watchListCounter);
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

  newStore[MovieStore.ALL]
    .slice(0, Math.min(newStore[MovieStore.ALL].length, MOVIE_COUNT_PER_STEP))
    .forEach((movie) => renderMovieCard(movie));

  if (newStore[MovieStore.ALL].length > MOVIE_COUNT_PER_STEP) {
    const showMoreMainListComponent = new ShowMore();

    let showingMovieCardCounter = MOVIE_COUNT_PER_STEP;
    render(movieMainListComponent, showMoreMainListComponent);

    showMoreMainListComponent.setClickHandler(() => {
      newStore[MovieStore.ALL]
        .slice(showingMovieCardCounter, showingMovieCardCounter + MOVIE_COUNT_PER_STEP)
        .forEach((movie) => renderMovieCard(movie));

      showingMovieCardCounter += MOVIE_COUNT_PER_STEP;

      if (showingMovieCardCounter >= newStore[MovieStore.ALL].length) {
        remove(showMoreMainListComponent);
      }
    });
  }

  const movieCounterComponent = new MovieCounter(newStore[MovieStore.ALL].length);
  render(siteFooterElement.querySelector('.footer__statistics'), movieCounterComponent);
};

const changeTopRatedMoviesHandler = () => {
  const newStore = movieStore.getState();
  if (isEqual(previousStore[MovieStore.TOP_RATED], newStore[MovieStore.TOP_RATED])) {
    return;
  }
  previousStore[MovieStore.TOP_RATED] = newStore[MovieStore.TOP_RATED];

  const movieTopRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });
  render(moviePageComponent, movieTopRatedListComponent);

  newStore[MovieStore.TOP_RATED].forEach((movie) => {
    render(movieTopRatedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
  });
};

const changeMostCommentedMoviesHandler = () => {
  const newStore = movieStore.getState();
  if (isEqual(previousStore[MovieStore.MOST_COMMENTED], newStore[MovieStore.MOST_COMMENTED])) {
    return;
  }
  previousStore[MovieStore.MOST_COMMENTED] = newStore[MovieStore.MOST_COMMENTED];

  const movieMostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
  render(moviePageComponent, movieMostCommentedListComponent);

  newStore[MovieStore.MOST_COMMENTED].forEach((movie) => {
    render(movieMostCommentedListComponent.element.querySelector('.films-list__container'), new MovieCard(movie));
  });
};

movieStore.subscribe(() => {
  changeMainMoviesHandler();
  changeTopRatedMoviesHandler();
  changeMostCommentedMoviesHandler();
});

movieStore.dispatch(MovieOperation.getAllMovies());
