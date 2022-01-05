import _ from 'lodash';

import { RenderPosition, ModelState } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';
import { changeInStoreAddToWatchlist, changeInStoreFavorite, changeInStoreMarkAsWatched } from '../utils/movie';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';
import { ActionCreator, Operation } from '../reducers/reducer';
import { isEscPressed } from '../utils/common';

export default class MovieDetailsPresenter {
  #model = null;
  #currentMovie = null;
  #currentMovieComments = { list: [], isLoading: false };

  #wrapperElement = null;
  #movieDetailsComponent = new MovieDetails(this.#currentMovie);
  #commentsComponent = new Comments(this.#currentMovieComments);

  #currentScroll = 0;

  constructor(model, wrapperElement) {
    this.#model = model;
    this.#wrapperElement = wrapperElement;

    this.init();
  }

  init = () => {
    this.#movieDetailsComponent.setCloseClickHandler(this.#clickCloseButton);
    this.#movieDetailsComponent.setAddToWatchlistClickHandler(this.#addToWatchlistHandler);
    this.#movieDetailsComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedHandler);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#favoriteHandler);
    this.#movieDetailsComponent.setScrollHandler(this.#onScroll);

    this.#commentsComponent.setDeleteCommentHandler(this.#deleteComment);

    this.#model.subscribe(ModelState.ACTIVE_MOVIE_ID, this.#changeActiveMovieIdHandler);
    this.#model.subscribe(ModelState.ALL_MOVIES, this.#changeAllMoviesListHandler);
  }

  #changeActiveMovieIdHandler = (newMovieId) => {
    this.#removeMovieDetails();

    if (!newMovieId) {
      return;
    }

    const movie = this.#model.getState(ModelState.ALL_MOVIES).find((item) => item.id === newMovieId);
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
        this.#movieDetailsComponent.updateData(this.#currentMovie);
        this.#movieDetailsComponent.renderComments(this.#commentsComponent);
        this.#scrollMovieDetailToCurrent();
      }
    }
  }

  #renderMovieDetails = () => {
    setPageScrollDisable(true);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#movieDetailsComponent.updateData(this.#currentMovie);
    render(this.#wrapperElement, this.#movieDetailsComponent, RenderPosition.AFTEREND);

    this.#currentMovieComments = { list: [], isLoading: true };
    this.#commentsComponent.updateData(this.#currentMovieComments);
    this.#movieDetailsComponent.renderComments(this.#commentsComponent);

    this.#model
      .dispatch(Operation.requestComments(this.#currentMovie.id))
      .then((comments) => {
        if (!_.isEqual(comments, this.#currentMovieComments.list)) {
          this.#currentMovieComments = { list: comments, isLoading: false };
          this.#commentsComponent.updateData(this.#currentMovieComments);
        }
      })
      .catch((reason) => this.#commentsComponent.showFailTitle(reason));
  }

  #removeMovieDetails = () => {
    setPageScrollDisable(false);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#currentMovie = null;
    this.#currentScroll = 0;
    this.#currentMovieComments = { list: [], isLoading: false };

    this.#commentsComponent.updateData(this.#currentMovieComments);

    if (this.#movieDetailsComponent) {
      remove(this.#movieDetailsComponent);
    }
  }

  #scrollMovieDetailToCurrent = () => {
    this.#movieDetailsComponent.element.scrollTo(0, this.#currentScroll);
  }

  #onEscKeyDown = (event) => {
    if (isEscPressed(event)) {
      this.#model.dispatch(ActionCreator.setActiveMovieId(null));
    }
  };

  #clickCloseButton = () => {
    this.#model.dispatch(ActionCreator.setActiveMovieId(null));
  }

  #onScroll = (scrollTop) => {
    this.#currentScroll = scrollTop;
  }

  #addToWatchlistHandler = (movieId) => changeInStoreAddToWatchlist(movieId)

  #markAsWatchedHandler = (movieId) => changeInStoreMarkAsWatched(movieId)

  #favoriteHandler = (movieId) => changeInStoreFavorite(movieId)

  #deleteComment = (commentId) => {
    this.#commentsComponent.setDeleteButtonToRequestState(commentId);
    this.#model.dispatch(Operation.deleteComment(commentId))
      .then(() => {
        this.#currentMovieComments.list = this.#currentMovieComments.list.filter((comment) => comment.id !== commentId);
        this.#commentsComponent.updateData(this.#currentMovieComments);
      })
      .catch((reason) => {
        this.#commentsComponent.setDeleteButtonToDefaultState(commentId);
        throw new Error(reason);
      });
  }
}
