import _ from 'lodash';

import Store from '../services/store';
import { RenderPosition, ModelState } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';
import { changeInStoreAddToWatchlist, changeInStoreFavorite, changeInStoreMarkAsWatched } from '../utils/movie';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';
import Comment from '../view/comment/comment';
import { ActionCreator, Operation } from '../reducers/reducer';

export default class MovieDetailsPresenter {
  #currentMovie = null;

  #siteFooterElement = null;
  #movieDetailsComponent = null;

  constructor(siteFooterElement) {
    this.#siteFooterElement = siteFooterElement;

    this.init();
  }

  init = () => {
    Store.subscribe(ModelState.ACTIVE_MOVIE_ID, this.#changeActiveMovieIdHandler);
    Store.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
  }

  #changeActiveMovieIdHandler = (newMovieId) => {
    this.#removeMovieDetails();

    if (!newMovieId) {
      return;
    }

    const movie = Store.getState(ModelState.ALL_MOVIES).find((item) => item.id === newMovieId);
    if (movie) {
      this.#currentMovie = movie;
      this.#renderMovieDetails();
    }
  }

  #changeAllMoviesListHandler = (allMovies) => {
    if (this.#currentMovie) {
      const newCurrentMovie = allMovies.find((movie) => movie.id === this.#currentMovie.id);
      if (newCurrentMovie && !_.isEqual(newCurrentMovie, this.#currentMovie)) {
        this.#currentMovie = newCurrentMovie;
        remove(this.#movieDetailsComponent);
        this.#renderMovieDetails();
      }
    }
  }

  #renderMovieDetails = () => {
    setPageScrollDisable(true);
    document.addEventListener('click', this.#onClickCloseButton);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#movieDetailsComponent = new MovieDetails(this.#currentMovie);
    this.#movieDetailsComponent.setAddToWatchlistClickHandler(this.#addToWatchlistHandler);
    this.#movieDetailsComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedHandler);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#favoriteHandler);
    render(this.#siteFooterElement, this.#movieDetailsComponent, RenderPosition.AFTEREND);

    Store
      .dispatch(Operation.requestComments(this.#currentMovie.id))
      .then((comments) => this.#renderComments(comments));
  }

  #removeMovieDetails = () => {
    setPageScrollDisable(false);
    document.removeEventListener('click', this.#onClickCloseButton);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    if (this.#movieDetailsComponent) {
      remove(this.#movieDetailsComponent);
    }

    this.#movieDetailsComponent = null;
    this.#currentMovie = null;
  }

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      Store.dispatch(ActionCreator.setActiveMovieId(null));
    }
  };

  #onClickCloseButton = (event) => {
    if (event.target.classList.contains('film-details__close-btn')) {
      Store.dispatch(ActionCreator.setActiveMovieId(null));
    }
  }

  #renderComments = (comments) => {
    // TODO[@nicothin]: доделать в рамках одного из следующих PR
    if (comments.length) {
      // TODO[@nicothin]: Прояснить. Плохо выглядит: рендерю Comments методом movieDetailsComponent → ...
      const commentsComponent = new Comments(comments);
      this.#movieDetailsComponent.renderComments(commentsComponent);
      comments.forEach((comment) => {
        const commentComponent = new Comment(comment);
        commentsComponent.renderComment(commentComponent);
      });
    }
  }

  #addToWatchlistHandler = (movieId) => changeInStoreAddToWatchlist(movieId)

  #markAsWatchedHandler = (movieId) => changeInStoreMarkAsWatched(movieId)

  #favoriteHandler = (movieId) => changeInStoreFavorite(movieId)
}
