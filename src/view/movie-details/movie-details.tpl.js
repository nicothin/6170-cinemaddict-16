import dayjs from 'dayjs';
import { TypeOfActionOnMovie } from '../../constants';
import { getFormattedList, getFormattedRuntime } from '../../utils/common';

export const createMovieDetails = (movie) => {
  const filmInfo = movie?.filmInfo ? movie.filmInfo : {};
  const userDetails = movie?.userDetails ? movie.userDetails : {};

  const {
    title,
    alternativeTitle,
    ageRating = 0,
    totalRating = 0,
    poster,
    description,
    director = '',
    writers = [],
    actors = [],
    genre: genres = [],
    release = {
      date: dayjs(),
    },
    runtime = 0,
  } = filmInfo;

  const image = poster ? `<img class="film-details__poster-img" src="${poster}" alt="${title}">` : '';

  const {
    alreadyWatched = false,
    favorite = false,
    watchlist = false,
  } = userDetails;

  const ACTIVE_CLASSNAME = 'film-details__control-button--active';

  const InfoText = {
    WRITER: `Writer${writers.length > 1 ? 's' : ''}`,
    ACTOR: `Actor${actors.length > 1 ? 's' : ''}`,
    GENRE: `Genre${genres.length > 1 ? 's' : ''}`,
  };

  const formattedDirector = getFormattedList(director);
  const formattedWriter = getFormattedList(writers);
  const formattedActor = getFormattedList(actors);
  const formattedGenres = genres.map((item) => `<span class="film-details__genre">${item}</span>`).join(' ');
  const formattedRelease = dayjs(release.date).format('DD MMMM YYYY');
  const formattedRuntime = getFormattedRuntime(runtime);

  const watchlistActiveClassName = watchlist ? ACTIVE_CLASSNAME : '';
  const watchedActiveClassName = alreadyWatched ? ACTIVE_CLASSNAME : '';
  const favoriteActiveClassName = favorite ? ACTIVE_CLASSNAME : '';

  return `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              ${image}

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
                  <td class="film-details__term">${InfoText.WRITER}</td>
                  <td class="film-details__cell">${formattedWriter}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${InfoText.ACTOR}</td>
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
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${InfoText.GENRE}</td>
                  <td class="film-details__cell">${formattedGenres}</tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlistActiveClassName}" data-action-type="${TypeOfActionOnMovie.WATCHLIST}">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedActiveClassName}" data-action-type="${TypeOfActionOnMovie.HISTORY}">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteActiveClassName}" data-action-type="${TypeOfActionOnMovie.FAVORITES}">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container"></div>
      </div>
    </section>
  `.trim();
};
