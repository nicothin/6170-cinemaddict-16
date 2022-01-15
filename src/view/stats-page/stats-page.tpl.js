import { StatsFilter } from '../../constants';
import { getFormattedRuntime } from '../../utils/common';

export const createStatsPage = (data) => {

  const { user, counter, duration, topGenre, activeFilter } = data;

  const userTemplate = user ? `
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="${user.avatar}" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${user.rank}</span>
    </p>`.trim() :
    '';

  const infoText = {
    movies: counter === 1 ? 'movie' : 'movies',
  };

  const formattedDuration = getFormattedRuntime(duration, 'statistic__item-description');

  return `
  <section class="statistic">
    ${userTemplate}

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${StatsFilter.ALL_TIME}" ${activeFilter === StatsFilter.ALL_TIME ? 'checked' : ''}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${StatsFilter.TODAY}" ${activeFilter === StatsFilter.TODAY ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${StatsFilter.WEEK}" ${activeFilter === StatsFilter.WEEK ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${StatsFilter.MONTH}" ${activeFilter === StatsFilter.MONTH ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${StatsFilter.YEAR}" ${activeFilter === StatsFilter.YEAR ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${counter} <span class="statistic__item-description">${infoText.movies}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${formattedDuration}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
`.trim();
};
