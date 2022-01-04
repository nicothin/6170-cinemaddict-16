import _ from 'lodash';

import { RenderPosition, ModelState } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';
import { changeInStoreAddToWatchlist, changeInStoreFavorite, changeInStoreMarkAsWatched } from '../utils/movie';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';
import Comment from '../view/comment/comment';
import { Operation } from '../reducers/reducer';

export default class MovieDetailsPresenter {
  #model = null;
  #currentMovie = null;
  #currentMovieComments = [];

  #wrapperElement = null;
  #movieDetailsComponent = null;
  #commentsComponent = new Comments(0);

  #currentScroll = 0;

  constructor(model, wrapperElement) {
    this.#model = model;
    this.#wrapperElement = wrapperElement;

    this.init();
  }

  init = () => {
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
        remove(this.#movieDetailsComponent);
        this.#renderMovieDetails();
      }
    }
  }

  #renderMovieDetails = () => {
    setPageScrollDisable(true);
    // document.addEventListener('click', this.#onClickCloseButton);
    // document.addEventListener('keydown', this.#onEscKeyDown);

    this.#movieDetailsComponent = new MovieDetails(this.#currentMovie);
    this.#movieDetailsComponent.setAddToWatchlistClickHandler(this.#addToWatchlistHandler);
    this.#movieDetailsComponent.setMarkAsWatchedClickHandler(this.#markAsWatchedHandler);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#favoriteHandler);
    render(this.#wrapperElement, this.#movieDetailsComponent, RenderPosition.AFTEREND);

    this.#renderComments(this.#currentMovieComments);
    this.#model
      .dispatch(Operation.requestComments(this.#currentMovie.id))
      .then((comments) => {
        if (!_.isEqual(comments, this.#currentMovieComments)) {
          this.#currentMovieComments = comments;
          this.#renderComments(this.#currentMovieComments);
        }
      });

    this.#scrollToCurrent();
    this.#movieDetailsComponent.element.addEventListener('scroll', this.#onScroll);
  }

  #scrollToCurrent = () => {
    this.#movieDetailsComponent.element.scrollTo(0, this.#currentScroll);
  }

  #removeMovieDetails = () => {
    setPageScrollDisable(false);
    // document.removeEventListener('click', this.#onClickCloseButton);
    // document.removeEventListener('keydown', this.#onEscKeyDown);

    if (this.#movieDetailsComponent) {
      remove(this.#movieDetailsComponent);
    }

    this.#movieDetailsComponent = null;
    this.#currentMovie = null;
    this.#currentScroll = 0;

    this.#commentsComponent.formReset();
  }

  // #onEscKeyDown = (event) => {
  //   if (event.key === 'Escape' || event.key === 'Esc') {
  //     this.#model.dispatch(ActionCreator.setActiveMovieId(null));
  //   }
  // };

  // // NOTE[@nicothin]: плохо: завязывает презентер на вьюху
  // #onClickCloseButton = (event) => {
  //   if (event.target.classList.contains('film-details__close-btn')) {
  //     this.#model.dispatch(ActionCreator.setActiveMovieId(null));
  //   }
  // }

  #onScroll = (event) => {
    this.#currentScroll = event.target.scrollTop;
  }

  #renderComments = (comments) => {
    if (comments.length) {
      this.#commentsComponent.updateData({commentsCounter: comments.length});
      this.#commentsComponent.clearList();
      this.#movieDetailsComponent.renderComments(this.#commentsComponent);
      comments.forEach((comment) => {
        const commentComponent = new Comment(comment);
        this.#commentsComponent.renderComment(commentComponent);
      });

      this.#scrollToCurrent();
    }
  }

  #addToWatchlistHandler = (movieId) => changeInStoreAddToWatchlist(movieId)

  #markAsWatchedHandler = (movieId) => changeInStoreMarkAsWatched(movieId)

  #favoriteHandler = (movieId) => changeInStoreFavorite(movieId)
}
