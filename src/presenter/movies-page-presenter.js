import _ from 'lodash';
import { MOVIE_COUNT_PER_STEP, MOVIE_TOP_RATED_COUNT, MOVIE_MOST_COMMENT_COUNT, RenderPosition, Hashes, ModelState, Sorting } from '../constants';
import { remove, render } from '../utils/render';

import MovieCardPresenter from './movie-card-presenter';

import MovieList from '../view/movie-list/movie-list';
import PageContentEmpty from '../view/page-content-empty/page-content-empty';
import MoviesPage from '../view/movies-page/movies-page';
import ShowMore from '../view/show-more-button/show-more-button';
import Sorter from '../view/sorter/sorter';
import dayjs from 'dayjs';

export default class MoviesPagePresenter {
  #model = null;
  #wrapperElement = null;

  #allMovies = [];
  #moviesList = [];
  #topRatedMoviesList = [];
  #mostCommentedMoviesList = [];

  #currentHash = Hashes.ALL;
  #currentSortType = Sorting.DEFAULT;

  #moviesPageInnerComponent = new MoviesPage();
  #noMoviesComponent = new PageContentEmpty('There are no movies in our database');
  #noWatchlistComponent = new PageContentEmpty('There are no movies to watch now');
  #noHistoryComponent = new PageContentEmpty('There are no watched movies now');
  #noFavoritesComponent = new PageContentEmpty('There are no favorite movies now');
  #sorterComponent = new Sorter({ type: this.#currentSortType });
  #mainListComponent = new MovieList({ title: 'All movies. Upcoming', hideTitle: true });
  #topRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });;
  #mostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
  #showMoreMainListComponent = new ShowMore();

  #renderedMovieCardCounter = MOVIE_COUNT_PER_STEP;

  constructor(model, wrapperElement) {
    this.#model = model;
    this.#wrapperElement = wrapperElement;

    this.init();
  }

  init = () => {
    this.#currentHash = this.#model.getState(ModelState.HASH);

    this.#model.subscribe(ModelState.ALL_MOVIES, this.#modelAllMoviesListChangeHandler);
    this.#model.subscribe(ModelState.HASH, this.#modelHashChangeHandler);
  }

  render = () => {
    render(this.#wrapperElement, this.#moviesPageInnerComponent);

    if (this.#allMovies.length === 0) {
      remove(this.#mainListComponent);
      remove(this.#topRatedListComponent);
      remove(this.#mostCommentedListComponent);

      render(this.#moviesPageInnerComponent, this.#noMoviesComponent);
      return;
    }

    this.#removeAllEmptyText();

    this.#renderSorter();
    this.#renderMainList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  remove = () => {
    remove(this.#sorterComponent);
    remove(this.#moviesPageInnerComponent);
  }

  #removeAllEmptyText = () => {
    remove(this.#noMoviesComponent);
    remove(this.#noWatchlistComponent);
    remove(this.#noHistoryComponent);
    remove(this.#noFavoritesComponent);
  }

  #renderMainList = () => {

    if (this.#moviesList.length > 0) {
      this.#removeAllEmptyText();

      this.#sorterComponent.updateData({ type: this.#currentSortType });

      render(this.#moviesPageInnerComponent, this.#mainListComponent, RenderPosition.AFTERBEGIN);

      this.#mainListComponent.clearList();

      this.#renderMovieCards(
        this.#mainListComponent,
        this.#moviesList,
        0,
        Math.min(this.#moviesList.length, this.#renderedMovieCardCounter)
      );

      if (this.#moviesList.length > this.#renderedMovieCardCounter) {
        this.#renderShowMoreMainList();
      }
      else {
        remove(this.#showMoreMainListComponent);
      }
    }

    else {
      remove(this.#sorterComponent);
      remove(this.#mainListComponent);

      switch (this.#currentHash) {
        case Hashes.WATCHLIST:
          render(this.#moviesPageInnerComponent, this.#noWatchlistComponent, RenderPosition.AFTERBEGIN);
          break;
        case Hashes.HISTORY:
          render(this.#moviesPageInnerComponent, this.#noHistoryComponent, RenderPosition.AFTERBEGIN);
          break;
        case Hashes.FAVORITES:
          render(this.#moviesPageInnerComponent, this.#noFavoritesComponent, RenderPosition.AFTERBEGIN);
          break;
        default:
          render(this.#moviesPageInnerComponent, this.#noMoviesComponent, RenderPosition.AFTERBEGIN);
      }
    }
  }

  #modelAllMoviesListChangeHandler = (allMovies) => {
    if (allMovies.length === 0) {
      this.#allMovies = [];
      this.#moviesList = [];
      this.#topRatedMoviesList = [];
      this.#mostCommentedMoviesList = [];
    }
    else {
      this.#allMovies = allMovies;
      this.#moviesList = this.#getMovieList(allMovies, this.#currentHash);

      this.#topRatedMoviesList = this.#getMovieListSortedByRating(allMovies).slice(0, MOVIE_TOP_RATED_COUNT);
      const haveOnlyZeroRatedMovies = this.#topRatedMoviesList.length === this.#topRatedMoviesList.filter((movie) => movie.filmInfo.totalRating === 0).length;
      if (haveOnlyZeroRatedMovies) {
        this.#topRatedMoviesList = [];
      }

      this.#mostCommentedMoviesList = this.#getMovieListSortedByCommentsCount(allMovies).slice(0, MOVIE_MOST_COMMENT_COUNT);
      const haveOnlyMoviesWithoutComments = this.#mostCommentedMoviesList.length === this.#mostCommentedMoviesList.filter((movie) => movie.comments.length === 0).length;
      if (haveOnlyMoviesWithoutComments) {
        this.#mostCommentedMoviesList = [];
      }
    }
  }

  #modelHashChangeHandler = (hash) => {
    if (hash === this.#currentHash) {
      return;
    }

    this.#currentHash = hash;
    this.#renderedMovieCardCounter = MOVIE_COUNT_PER_STEP;
    this.#currentSortType = Sorting.DEFAULT;
    this.#moviesList = this.#getMovieList(this.#allMovies, this.#currentHash);
  }

  #getMovieList = (allMovies, currentFilter) => {
    let filteredMoviesList = [];
    switch (currentFilter) {
      case Hashes.WATCHLIST:
        filteredMoviesList = allMovies.filter((movie) => movie.userDetails.watchlist);
        break;
      case Hashes.HISTORY:
        filteredMoviesList = allMovies.filter((movie) => movie.userDetails.alreadyWatched);
        break;
      case Hashes.FAVORITES:
        filteredMoviesList = allMovies.filter((movie) => movie.userDetails.favorite);
        break;
      default:
        filteredMoviesList = _.cloneDeep(allMovies);
    }

    return this.#currentSortType !== Sorting.DEFAULT ?
      this.#sortMoviesList(filteredMoviesList, this.#currentSortType) :
      filteredMoviesList;
  }

  #getMovieListSortedByRating = (list) => _.cloneDeep(list).sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1);

  #getMovieListSortedByDate = (list) => _.cloneDeep(list).sort((a, b) => dayjs(b.filmInfo.release.date).isAfter(dayjs(a.filmInfo.release.date)) ? 1 : -1);

  #getMovieListSortedByCommentsCount = (list) => _.cloneDeep(list).sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);

  #renderSorter = () => {
    render(this.#moviesPageInnerComponent, this.#sorterComponent, RenderPosition.BEFOREBEGIN);
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCards = (wrapperComponent, list, from = 0, to = list.length) => {
    list
      .slice(from, to)
      .forEach((movie) => new MovieCardPresenter(this.#model, wrapperComponent, movie));
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
    if (this.#topRatedMoviesList.length) {
      render(this.#moviesPageInnerComponent, this.#topRatedListComponent);
      this.#topRatedListComponent.clearList();
      this.#renderMovieCards(
        this.#topRatedListComponent,
        this.#topRatedMoviesList,
      );
    }
  }

  #renderMostCommentedList = () => {
    if (this.#mostCommentedMoviesList.length) {
      render(this.#moviesPageInnerComponent, this.#mostCommentedListComponent);
      this.#mostCommentedListComponent.clearList();
      this.#renderMovieCards(
        this.#mostCommentedListComponent,
        this.#mostCommentedMoviesList,
      );
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#moviesList = this.#getMovieList(this.#allMovies, this.#currentHash);

    // NOTE[@nicothin]: увы, по ТЗ при смене сортировки нужно сбросить счетчик показанных (WTF?)
    this.#renderedMovieCardCounter = MOVIE_COUNT_PER_STEP;

    this.#renderMainList();
  }

  #sortMoviesList = (list, sortType) => {
    switch (sortType) {
      case Sorting.RATING:
        return this.#getMovieListSortedByRating(list);
      case Sorting.DATE:
        return this.#getMovieListSortedByDate(list);
      default:
        return list;
    }
  }
}
