import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { ModelState, StatsFilter } from '../constants';
import { getUserData } from '../utils/common';
import { remove, render } from '../utils/render';
import StatsPage from '../view/stats-page/stats-page';

dayjs.extend(isSameOrAfter);

export default class StatsPagePresenter {
  #model = null;
  #wrapperElement = null;
  #statsPageComponent = null;
  #statsData = {
    user: null,
    counter: 0,
    duration: 0,
    topGenre: '',
    activeFilter: StatsFilter.ALL_TIME,
    chartData: []
  };

  constructor(model, wrapperElement)  {
    this.#model = model;
    this.#wrapperElement = wrapperElement;
    this.#statsPageComponent = new StatsPage(this.#statsData);

    this.init();
  }

  init = () => {
    this.#model.subscribe(ModelState.ALL_MOVIES, this.#modelAllMoviesListChangeHandler);

    this.#statsPageComponent.setFilterChangeHandler(this.#statsFilterChangeHandler);
  }

  render = () => {
    render(this.#wrapperElement, this.#statsPageComponent);
    this.#statsPageComponent.setFilterChangeHandler(this.#statsFilterChangeHandler);
  }

  remove = () => {
    remove(this.#statsPageComponent);
  }

  #updateStatsData = (watchedMovies, activeFilter = StatsFilter.ALL_TIME) => {
    const total = watchedMovies.reduce((data, movie) => {
      movie.filmInfo.genre.forEach((genre) => {
        const listItem = data.genresList.find((item) => item.genre === genre);
        if (listItem) {
          listItem.counter += 1;
        }
        else {
          data.genresList.push({ genre, counter: 1 });
        }
      });
      return {
        duration: data.duration + movie.filmInfo.runtime,
        genresList: data.genresList
      };
    }, {
      duration: 0,
      genresList: []
    });

    total.genresList.sort((a, b) => b.counter - a.counter);

    const chartDataBar100Percent = total.genresList[0]?.counter;

    this.#statsData = {
      user: getUserData(this.#getAllWatchedMovies().length),
      counter: watchedMovies.length,
      duration: total.duration,
      topGenre: total.genresList[0]?.genre,
      activeFilter,
      chartData: total.genresList.map((item) => ({ ...item, barSize: Math.round(item.counter * 100 / chartDataBar100Percent) })),
    };
  }

  #getAllWatchedMovies = () => this.#model
    .getState(ModelState.ALL_MOVIES)
    .filter((movie) => movie.userDetails.alreadyWatched);

  #modelAllMoviesListChangeHandler = (movies) => {
    const watchedMovies = movies.filter((movie) => movie.userDetails.alreadyWatched);
    this.#updateStatsData(watchedMovies);
    this.#statsPageComponent.updateData(this.#statsData);
  }

  #statsFilterChangeHandler = (filter) => {
    let watchedMovies = this.#getAllWatchedMovies();
    const now = dayjs();

    switch (filter) {
      case StatsFilter.TODAY:
        watchedMovies = watchedMovies.filter((movie) => now.diff(movie.userDetails.watchingDate, 'day') === 0);
        break;
      case StatsFilter.WEEK:
        watchedMovies = watchedMovies.filter((movie) => now.diff(movie.userDetails.watchingDate, 'week') === 0);
        break;
      case StatsFilter.MONTH:
        watchedMovies = watchedMovies.filter((movie) => now.diff(movie.userDetails.watchingDate, 'month') === 0);
        break;
      case StatsFilter.YEAR:
        watchedMovies = watchedMovies.filter((movie) => now.diff(movie.userDetails.watchingDate, 'year') === 0);
        break;

      default:
        watchedMovies = this.#getAllWatchedMovies();
        break;
    }

    this.#updateStatsData(watchedMovies, filter);
    this.#statsPageComponent.updateData(this.#statsData);
  }
}
