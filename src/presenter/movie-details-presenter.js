import Store from '../services/store';
import { RenderPosition, StoreState } from '../constants';
import { remove, render } from '../utils/render';
import { setPageScrollDisable } from '../utils/dom';

import MovieDetails from '../view/movie-details/movie-details';
import Comments from '../view/comments/comments';
import Comment from '../view/comment/comment';

export default class MovieDetailsPresenter {
  #store = new Store();

  #currentMovieId = null;

  #siteFooterElement = null;
  #movieDetailsComponent = null;

  constructor(siteFooterElement) {
    this.#siteFooterElement = siteFooterElement;

    this.init();
  }

  init = () => {
    this.#store.subscribe(StoreState.ACTIVE_MOVIE_ID, this.#changeActiveMovieIdHandler);
  }

  #changeActiveMovieIdHandler = (newMovieId) => {
    if (this.#movieDetailsComponent && (newMovieId === null || newMovieId !== this.#currentMovieId)) {
      this.#removeMovieDetails();
    }
    if (newMovieId) {
      const movie = this.#store.getState(StoreState.ALL_MOVIES).find((item) => item.id === newMovieId);
      if (movie) {
        this.#renderMovieDetails(movie);
      }
    }
  }

  #renderMovieDetails = (movie) => {
    setPageScrollDisable(true);
    document.addEventListener('click', this.#onClickCloseButton);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#movieDetailsComponent = new MovieDetails(movie);
    render(this.#siteFooterElement, this.#movieDetailsComponent, RenderPosition.AFTEREND);

    this.#store.requestComments(movie.id).then((comments) => this.#renderComments(comments));
  }

  #removeMovieDetails = () => {
    setPageScrollDisable(false);
    document.removeEventListener('click', this.#onClickCloseButton);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    remove(this.#movieDetailsComponent);

    this.#movieDetailsComponent = null;
    this.#currentMovieId = null;

    this.#store.setActiveMovieId(null);
  }

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.#removeMovieDetails();
    }
  };

  #onClickCloseButton = (event) => {
    if (event.target.classList.contains('film-details__close-btn')) {
      this.#removeMovieDetails();
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
}