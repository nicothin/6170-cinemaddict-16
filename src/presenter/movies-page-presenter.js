import _ from 'lodash';
import Store from '../services/store';
import { MOVIE_COUNT_PER_STEP, MOVIE_TOP_RATED_COUNT, MOVIE_MOST_COMMENT_COUNT, RenderPosition, Hashes, ModelState, Sorting } from '../constants';
import { remove, render } from '../utils/render';

import MovieCardPresenter from './movie-card-presenter';

import MovieList from '../view/movie-list/movie-list';
import MoviesPageEmpty from '../view/movies-page-empty/movies-page-empty';
import MoviesPage from '../view/movies-page/movies-page';
import ShowMore from '../view/show-more-button/show-more-button';
import Sorter from '../view/sorter/sorter';

export default class MoviesPagePresenter {
  #container = null;

  #allMovies = [];
  #moviesList = [];
  #topRatedList = [];
  #mostCommentedList = [];
  #currentFilter = Hashes.ALL;
  #currentSortType = Sorting.DEFAULT;

  #moviesPageInnerComponent = new MoviesPage();
  #moviesPageEmptyComponent = new MoviesPageEmpty();
  #sorterComponent = new Sorter();
  #mainListComponent = new MovieList({ title: 'All movies. Upcoming', hideTitle: true });
  #topRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });;
  #mostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
  #showMoreMainListComponent = new ShowMore();

  #renderedMovieCardCounter = MOVIE_COUNT_PER_STEP;

  constructor(container) {
    this.#container = container;

    this.init();
  }

  init = () => {
    render(this.#container, this.#moviesPageInnerComponent);

    this.#renderMoviesPage();

    Store.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
    Store.subscribe(ModelState.HASH, this.#changeFilterHandler);
  }

  #changeFilterHandler = (newFilter) => {
    if (newFilter === this.#currentFilter) {
      return;
    }

    this.#currentFilter = newFilter;
  }

  #getFilteredMovieList = (allMovies) => {
    switch (this.#currentFilter) {
      case Hashes.WATCHLIST:
        return allMovies.filter((movie) => movie.userDetails.watchlist);
      case Hashes.HISTORY:
        return allMovies.filter((movie) => movie.userDetails.alreadyWatched);
      case Hashes.FAVORITES:
        return allMovies.filter((movie) => movie.userDetails.favorite);
      default:
        return _.cloneDeep(allMovies);
    }
  }

  #getMovieListSortedByRating = (list) => _.cloneDeep(list).sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1);

  #getMovieListSortedByCommentsCount = (list) => _.cloneDeep(list).sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

  #resetState = () => {
    this.#moviesList = [];
    this.#topRatedList = [];
    this.#mostCommentedList = [];
  }

  #changeAllMoviesListHandler = (allMovies) => {
    if (allMovies.length === 0) {
      this.#resetState();
    }
    else {
      this.#allMovies = allMovies;
      this.#moviesList = this.#getFilteredMovieList(allMovies);
      this.#topRatedList = this.#getMovieListSortedByRating(allMovies).slice(0, MOVIE_TOP_RATED_COUNT);
      this.#mostCommentedList = this.#getMovieListSortedByCommentsCount(allMovies).slice(0, MOVIE_MOST_COMMENT_COUNT);
    }

    this.#renderMoviesPage();
  }

  #renderMoviesPage = () => {
    if (this.#allMovies.length === 0) {
      remove(this.#mainListComponent);
      remove(this.#topRatedListComponent);
      remove(this.#mostCommentedListComponent);

      render(this.#moviesPageInnerComponent, this.#moviesPageEmptyComponent);
      return;
    }

    remove(this.#moviesPageEmptyComponent);

    this.#renderSorter();
    this.#renderMainList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  #renderSorter = () => {
    render(this.#moviesPageInnerComponent, this.#sorterComponent, RenderPosition.BEFOREBEGIN);
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMainList = () => {
    render(this.#moviesPageInnerComponent, this.#mainListComponent, RenderPosition.AFTERBEGIN);
    this.#mainListComponent.clearList();
    this.#renderMovieCards(
      this.#mainListComponent,
      this.#moviesList,
      0,
      Math.min(this.#moviesList.length, MOVIE_COUNT_PER_STEP)
    );

    if (this.#moviesList.length > MOVIE_COUNT_PER_STEP) {
      this.#renderShowMoreMainList();
    }
  }

  #renderMovieCards = (wrapperComponent, list, from = 0, to = list.length) => {
    list
      .slice(from, to)
      .forEach((movie) => new MovieCardPresenter(wrapperComponent, movie));
  }

  #renderShowMoreMainList = () => {
    render(this.#mainListComponent, this.#showMoreMainListComponent);
    this.#showMoreMainListComponent.setClickHandler(this.#clickShowMoreMainListHandler);
  }

  #clickShowMoreMainListHandler = () => {
    const newCounter = this.#renderedMovieCardCounter + MOVIE_COUNT_PER_STEP;
    this.#renderMovieCards(
      this.#mainListComponent,
      this.#moviesList,
      this.#renderedMovieCardCounter,
      newCounter
    );
    this.#renderedMovieCardCounter = newCounter;

    if (this.#renderedMovieCardCounter >= this.#moviesList.length) {
      remove(this.#showMoreMainListComponent);
    }
  }

  #renderTopRatedList = () => {
    render(this.#moviesPageInnerComponent, this.#topRatedListComponent);
    this.#topRatedListComponent.clearList();
    this.#renderMovieCards(
      this.#topRatedListComponent,
      this.#topRatedList,
    );
  }

  #renderMostCommentedList = () => {
    render(this.#moviesPageInnerComponent, this.#mostCommentedListComponent);
    this.#mostCommentedListComponent.clearList();
    this.#renderMovieCards(
      this.#mostCommentedListComponent,
      this.#mostCommentedList,
    );
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortMoviesList();

    this.#mainListComponent.clearList();
    this.#renderMainList();
  }

  #sortMoviesList = () => {
    if (this.#currentSortType === Sorting.RATING) {
      this.#moviesList = this.#getMovieListSortedByRating(this.#allMovies);
      return;
    }
    this.#moviesList = this.#allMovies;
  }

}
