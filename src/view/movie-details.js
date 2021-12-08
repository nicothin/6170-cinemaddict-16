import dayjs from 'dayjs';
import Component from '../abstract/component';
import { EMOTIONS } from '../constants';
import { generateComment } from '../mock/generate-comments';
import { getFormattedList, getFormattedRuntime } from '../utils/common';
import { setPageScrollDisable } from '../utils/dom';
import { remove } from '../utils/render';
import { createComment } from './comment';

const createMovieDetails = (movie) => {
  const { title, alternativeTitle, ageRating, totalRating, poster, description, director, writers, actors, genre, release, runtime } = movie.filmInfo;
  const { alreadyWatched, favorite, watchlist } = movie.userDetails;

  const ACTIVE_CLASSNAME = 'film-details__control-button--active';

  const infoText = {
    writer: `Writer${writers.length > 1 ? 's' : ''}`,
    actor: `Actor${actors.length > 1 ? 's' : ''}`,
    genre: `Genre${genre.length > 1 ? 's' : ''}`,
  };

  const formattedDirector = getFormattedList(director);
  const formattedWriter = getFormattedList(writers);
  const formattedActor = getFormattedList(actors);
  const formattedGenres = genre.map((item) => `<span class="film-details__genre">${item}</span>`).join(' ');
  const formattedRelease = dayjs(release.date).format('DD MMMM YYYY');
  const formattedRuntime = getFormattedRuntime(runtime);
  const commentsCounter = movie.comments.length;

  const watchlistActiveClassName = watchlist ? ACTIVE_CLASSNAME : '';
  const watchedActiveClassName = alreadyWatched ? ACTIVE_CLASSNAME : '';
  const favoriteActiveClassName = favorite ? ACTIVE_CLASSNAME : '';

  const comments = movie.comments.map((comment) => createComment(
    generateComment(comment)
  )).join(' ');

  const emotionsList = EMOTIONS.map((emotion) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>
`).join(' ');

  return `
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${formattedDirector}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${infoText.writer}</td>
                <td class="film-details__cell">${formattedWriter}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${infoText.actor}</td>
                <td class="film-details__cell">${formattedActor}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formattedRelease}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formattedRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${infoText.genre}</td>
                <td class="film-details__cell">${formattedGenres}</tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistActiveClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedActiveClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteActiveClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCounter}</span></h3>

          <ul class="film-details__comments-list">
            ${comments}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emotionsList}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>
`.trim();
};

export default class MovieDetails extends Component {
  #movie = null;
  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  };

  constructor(movie) {
    super(movie);
    this.#movie = movie;

    setPageScrollDisable(true);
    this.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  get template() {
    return createMovieDetails(this.#movie);
  }

  close () {
    setPageScrollDisable(false);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this);
  }
}
