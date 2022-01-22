import he from 'he';
import _ from 'lodash';

import { RenderPosition, ModelState, Emotions, TypeOfActionOnMovie } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';
import { changeMovieUserDetails } from './helpers/change-movie-user-details';
import { isEscPressed } from '../utils/common';
import { ActionCreator, Operation } from '../reducers/reducer';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';

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
    this.#movieDetailsComponent.setCloseClickHandler(this.#movieDetailsCloseButtonClickHandler);
    this.#movieDetailsComponent.setAddToWatchlistClickHandler(this.#movieDetailsAddToWatchlistHandler);
    this.#movieDetailsComponent.setMarkAsWatchedClickHandler(this.#movieDetailsMarkAsWatchedHandler);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#movieDetailsFavoriteHandler);
    this.#movieDetailsComponent.setScrollHandler(this.#movieDetailsScrollHandler);

    this.#commentsComponent.setDeleteCommentHandler(this.#commentsDeleteHandler);
    this.#commentsComponent.setSubmitCommentHandler(this.#commentsSubmitHandler);

    this.#model.subscribe(ModelState.ACTIVE_MOVIE_ID, this.#modelActiveMovieIdChangeHandler);
    this.#model.subscribe(ModelState.ALL_MOVIES, this.#modelAllMoviesListChangeHandler);
  }

  #renderMovieDetails = () => {
    setPageScrollDisable(true);
    document.addEventListener('keydown', this.#documentEscKeyDownHandler);
    document.addEventListener('keydown', this.#documentCtrlEnterKeyDownHandler);

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
    document.removeEventListener('keydown', this.#documentEscKeyDownHandler);
    document.removeEventListener('keydown', this.#documentCtrlEnterKeyDownHandler);

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

  #documentEscKeyDownHandler = (event) => {
    if (isEscPressed(event)) {
      this.#model.dispatch(ActionCreator.setActiveMovieId(null));
    }
  };

  #documentCtrlEnterKeyDownHandler = (event) => {
    if (event.code === 'Enter' && (event.ctrlKey || event.metaKey)) {
      this.#commentsComponent.submitForm();
    }
  };

  #modelActiveMovieIdChangeHandler = (newMovieId) => {
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

  #modelAllMoviesListChangeHandler = (allMovies) => {
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

  #movieDetailsCloseButtonClickHandler = () => {
    this.#model.dispatch(ActionCreator.setActiveMovieId(null));
  }

  #movieDetailsScrollHandler = (scrollTop) => {
    this.#currentScroll = scrollTop;
  }

  #movieDetailsAddToWatchlistHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.WATCHLIST, movieId)
      .catch(() => {
        this.#movieDetailsComponent.shakeYourButtonBaby(TypeOfActionOnMovie.WATCHLIST);
      });
  }

  #movieDetailsMarkAsWatchedHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.HISTORY, movieId)
      .catch(() => {
        this.#movieDetailsComponent.shakeYourButtonBaby(TypeOfActionOnMovie.HISTORY);
      });
  }

  #movieDetailsFavoriteHandler = (movieId) => {
    changeMovieUserDetails(this.#model, TypeOfActionOnMovie.FAVORITES, movieId)
      .catch(() => {
        this.#movieDetailsComponent.shakeYourButtonBaby(TypeOfActionOnMovie.FAVORITES);
      });
  }

  #commentsDeleteHandler = (commentId) => {
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

  #commentsSubmitHandler = (formData) => {
    const data = {
      comment: he.encode(formData.get('comment')),
      emotion: formData.get('comment-emoji'),
    };

    if (!data.comment || !Emotions.find((item) => item === data.emotion)) {
      this.#commentsComponent.shakeYourFormBaby();
    }

    else {
      this.#commentsComponent.disableForm();
      this.#model
        .dispatch(Operation.sendComment(this.#currentMovie.id, data))
        .then((response) => {
          this.#currentMovieComments = { list: response.data.comments, isLoading: false };
          this.#commentsComponent.updateData(this.#currentMovieComments);
          this.#commentsComponent.enableForm();

          const updatedMovie = response.data.movie;
          const oldAllMovies = this.#model.getState(ModelState.ALL_MOVIES);
          const newAllMovies = oldAllMovies.map((movie) => movie.id === updatedMovie.id ? updatedMovie : movie);
          this.#model.dispatch(ActionCreator.setAllMovies(newAllMovies));
        })
        .catch((reason) => {
          this.#commentsComponent.shakeYourFormBaby();
          this.#commentsComponent.enableForm();
          throw new Error(reason);
        });
    }
  }
}
