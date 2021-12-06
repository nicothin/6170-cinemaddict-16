import { MOVIE_COUNT_PER_STEP } from '../constants';
import { createMovieList } from './movie-list';

export const createMovies = (movieList = []) => {
  let content;
  if (!movieList.main.length ) {
    content = '<h2 class="films-list__title">There are no movies in our database</h2>';
  }
  else {
    content = createMovieList({
      id: 'movie-main',
      movieList: movieList.main,
      title: 'All movies. Upcoming',
      hideTitle: true,
      movieCountPerStep: MOVIE_COUNT_PER_STEP,
    });
    if (movieList.topRated.length) {
      content += createMovieList({
        id: 'movie-top-rated',
        movieList: movieList.topRated,
        title: 'Top rated',
        modifiers: 'films-list--extra',
      });
    }
    if (movieList.mostCommented.length) {
      content += createMovieList({
        id: 'movie-most-commented',
        movieList: movieList.mostCommented,
        title: 'Most commented',
        modifiers: 'films-list--extra',
      });
    }
  }

  return `<section class="films">${content}</section>`;
};
