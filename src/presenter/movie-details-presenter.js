import _ from 'lodash';

import { RenderPosition, ModelState } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';
import { changeInStoreAddToWatchlist, changeInStoreFavorite, changeInStoreMarkAsWatched } from '../utils/movie';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';
import { ActionCreator } from '../reducers/reducer';

export default class MovieDetailsPresenter {
  #model = null;
  #currentMovie = null;
  #currentMovieComments = [];

  #wrapperElement = null;
  #movieDetailsComponent = new MovieDetails(this.#currentMovie);
  #commentsComponent = new Comments(0);

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
        this.#scrollMovieDetailToCurrent();
      }
    }
  }

  #renderMovieDetails = () => {
    setPageScrollDisable(true);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#movieDetailsComponent.updateData(this.#currentMovie);
    render(this.#wrapperElement, this.#movieDetailsComponent, RenderPosition.AFTEREND);

    // this.#renderComments();

    // if (this.#currentMovieComments.length) {
    //   this.#renderComments(this.#currentMovieComments);
    // }
    // else {
    //   this.#model
    //     .dispatch(Operation.requestComments(this.#currentMovie.id))
    //     .then((comments) => {
    //       if (!_.isEqual(comments, this.#currentMovieComments)) {
    //         this.#currentMovieComments = comments;
    //         this.#renderComments(this.#currentMovieComments);
    //       }
    //     });
    // }

    // this.#scrollMovieDetailToCurrent();
    // this.#movieDetailsComponent.element.addEventListener('scroll', this.#onScroll);
  }

  #removeMovieDetails = () => {
    setPageScrollDisable(false);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    if (this.#movieDetailsComponent) {
      remove(this.#movieDetailsComponent);
    }

    // this.#movieDetailsComponent = null;
    this.#currentMovie = null;
    this.#currentScroll = 0;
    // this.#currentMovieComments = [];

    // this.#commentsComponent.formReset();
  }

  #scrollMovieDetailToCurrent = () => {
    this.#movieDetailsComponent.element.scrollTo(0, this.#currentScroll);
  }

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.#model.dispatch(ActionCreator.setActiveMovieId(null));
    }
  };

  #clickCloseButton = () => {
    this.#model.dispatch(ActionCreator.setActiveMovieId(null));
  }

  #onScroll = (scrollTop) => {
    this.#currentScroll = scrollTop;
  }

  #renderComments = () => {
    this.#commentsComponent.updateData({ commentsCounter: this.#currentMovieComments.length });
    this.#movieDetailsComponent.renderComments(this.#commentsComponent);
    // if (this.#currentMovieComments.length) {}

    // this.#commentsComponent.clearList();
    // this.#movieDetailsComponent.renderComments(this.#commentsComponent);

    // if (comments.length) {
    //   this.#movieDetailsComponent.renderComments(this.#commentsComponent);
    //   comments.forEach((comment) => {
    //     const commentComponent = new Comment(comment);
    //     this.#commentsComponent.renderComment(commentComponent);
    //   });
    // }

    // this.#scrollToCurrent();
  }

  #addToWatchlistHandler = (movieId) => changeInStoreAddToWatchlist(movieId)

  #markAsWatchedHandler = (movieId) => changeInStoreMarkAsWatched(movieId)

  #favoriteHandler = (movieId) => changeInStoreFavorite(movieId)
}
