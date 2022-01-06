import dayjs from 'dayjs';
import { typeOfActionOnMovie } from '../../constants';
import { getFormattedRuntime, getSliceText } from '../../utils/common';

export const createMovieCard = (movie) => {
  const { title, totalRating, release, runtime, genre, poster, description } = movie.filmInfo;
  const { alreadyWatched, favorite, watchlist } = movie.userDetails;

  const ACTIVE_CLASSNAME = 'film-card__controls-item--active';

  const formattedRelease = dayjs(release.date).format('YYYY');
  const formattedGenres = genre.join(', ');
  const formattedRuntime = getFormattedRuntime(runtime);
  const formattedDescription = getSliceText(description, 139);
  const commentsCounter = movie.comments.length;

  const watchlistActiveClassName = watchlist ? ACTIVE_CLASSNAME : '';
  const watchedActiveClassName = alreadyWatched ? ACTIVE_CLASSNAME : '';
  const favoriteActiveClassName = favorite ? ACTIVE_CLASSNAME : '';

  return `
  <article id="movie-${movie.id}" class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formattedRelease}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${formattedGenres}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${formattedDescription}</p>
      <span class="film-card__comments">${commentsCounter} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistActiveClassName}" data-action-type="${typeOfActionOnMovie.WATCHLIST}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedActiveClassName}" data-action-type="${typeOfActionOnMovie.HISTORY}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteActiveClassName}" data-action-type="${typeOfActionOnMovie.FAVORITES}" type="button">Mark as favorite</button>
    </div>
  </article>
`.trim();
};
