import { MOVIE_COUNT_PER_STEP, MOVIE_TOP_RATED_COUNT, MOVIE_MOST_COMMENT_COUNT } from '../constants';
import { remove, render } from '../utils/render';
import MovieList from '../view/movie-list/movie-list';
import MoviesPageEmpty from '../view/movies-page-empty/movies-page-empty';
import MoviesPage from '../view/movies-page/movies-page';
import ShowMore from '../view/show-more-button/show-more-button';

export class MoviesPagePresenter {
  #moviePageContainer = null;
  #moviesPageInnerComponent = new MoviesPage();
  #moviesPageEmpty = new MoviesPageEmpty();

  #moviesList = [];
  #topRatedList = [];
  #mostCommentedList = [];

  #mainListComponent = new MovieList({ title: 'All movies. Upcoming', hideTitle: true });
  #topRatedListComponent = new MovieList({ title: 'Top rated', modifiers: 'films-list--extra' });;
  #mostCommentedListComponent = new MovieList({ title: 'Most commented', modifiers: 'films-list--extra' });
  #showMoreMainListComponent = new ShowMore();

  #renderedMovieCardCounter = MOVIE_COUNT_PER_STEP;

  constructor(moviePageContainer) {
    this.#moviePageContainer = moviePageContainer;
  }

  init = () => {
    render(this.#moviePageContainer, this.#moviesPageInnerComponent);

    this.#renderMoviesPage();
  }

  changeMoviesListHandler = (list) => {
    if (!Array.isArray(list) || (Array.isArray(list) && list.length === 0)) {
      this.#resetState();
    }
    else {
      this.#moviesList = list;
      this.#topRatedList = list.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating ? 1 : -1).slice(0, MOVIE_TOP_RATED_COUNT);
      this.#mostCommentedList = list.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1).slice(0, MOVIE_MOST_COMMENT_COUNT);
    }

    this.#renderMoviesPage();
  }

  #resetState = () => {
    this.#moviesList = [];
    this.#topRatedList = [];
    this.#mostCommentedList = [];
  }

  #renderMoviesPage = () => {
    if (this.#moviesList.length === 0) {
      remove(this.#mainListComponent);
      remove(this.#topRatedListComponent);
      remove(this.#mostCommentedListComponent);

      render(this.#moviesPageInnerComponent, this.#moviesPageEmpty);
      return;
    }

    remove(this.#moviesPageEmpty);

    this.#renderMainList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  #renderMovieCards = (component, list, from = 0, to = list.length) => {
    list
      .slice(from, to)
      .forEach((movie) => component.renderMovieCard(movie));
  }

  #renderMainList = () => {
    render(this.#moviesPageInnerComponent, this.#mainListComponent);
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

  #renderTopRatedList = () => {
    render(this.#moviesPageInnerComponent, this.#topRatedListComponent);
    this.#renderMovieCards(
      this.#topRatedListComponent,
      this.#topRatedList,
    );
  }

  #renderMostCommentedList = () => {
    render(this.#moviesPageInnerComponent, this.#mostCommentedListComponent);
    this.#renderMovieCards(
      this.#mostCommentedListComponent,
      this.#mostCommentedList,
    );
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
}
