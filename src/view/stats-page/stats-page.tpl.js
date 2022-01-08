// import dayjs from 'dayjs';
// import { typeOfActionOnMovie } from '../../constants';
// import { getFormattedList, getFormattedRuntime } from '../../utils/common';

export const createStatsPage = () => { // data
  // eslint-disable-next-line no-console
  console.log('createStatsPage');
  // const filmInfo = movie?.filmInfo ? movie.filmInfo : {};
  // const userDetails = movie?.userDetails ? movie.userDetails : {};

  // const {
  //   title,
  //   alternativeTitle,
  //   ageRating = 0,
  //   totalRating = 0,
  //   poster,
  //   description,
  //   director = '',
  //   writers = [],
  //   actors = [],
  //   genre = [],
  //   release = {
  //     date: dayjs(),
  //   },
  //   runtime = 0,
  // } = filmInfo;

  // const {
  //   alreadyWatched = false,
  //   favorite = false,
  //   watchlist = false,
  // } = userDetails;

  // const ACTIVE_CLASSNAME = 'film-details__control-button--active';

  // const infoText = {
  //   writer: `Writer${writers.length > 1 ? 's' : ''}`,
  //   actor: `Actor${actors.length > 1 ? 's' : ''}`,
  //   genre: `Genre${genre.length > 1 ? 's' : ''}`,
  // };

  // const formattedDirector = getFormattedList(director);
  // const formattedWriter = getFormattedList(writers);
  // const formattedActor = getFormattedList(actors);
  // const formattedGenres = genre.map((item) => `<span class="film-details__genre">${item}</span>`).join(' ');
  // const formattedRelease = dayjs(release.date).format('DD MMMM YYYY');
  // const formattedRuntime = getFormattedRuntime(runtime);

  // const watchlistActiveClassName = watchlist ? ACTIVE_CLASSNAME : '';
  // const watchedActiveClassName = alreadyWatched ? ACTIVE_CLASSNAME : '';
  // const favoriteActiveClassName = favorite ? ACTIVE_CLASSNAME : '';

  return `
  <section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Movie buff</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked="">
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">28 <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">69 <span class="statistic__item-description">h</span> 41 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Drama</p>
      </li>
    </ul>

    <!-- Пример диаграммы -->
    <img src="images/cinemaddict-stats-markup.png" alt="Пример диаграммы">

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
`.trim();
};
