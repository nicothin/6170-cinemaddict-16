import { createMovieCard } from './movieCard';
import { createMovieList } from './movieList';
import { createShowMore } from './showMoreButton';

const MAIN_MOVIE_COUNT = 5;
const TOP_RATED_MOVIE_COUNT = 2;
const MOST_COMMENTED_MOVIE_COUNT = 2;

const mainMoviesList = [];
for (let i = 0; i < MAIN_MOVIE_COUNT; i++) {
  mainMoviesList.push(createMovieCard());
}

const topRatedMoviesList = [];
for (let i = 0; i < TOP_RATED_MOVIE_COUNT; i++) {
  topRatedMoviesList.push(createMovieCard());
}

const mostCommentedMoviesList = [];
for (let i = 0; i < MOST_COMMENTED_MOVIE_COUNT; i++) {
  mostCommentedMoviesList.push(createMovieCard());
}

export const createMovies = () => `
  <section class="films">
    ${createMovieList({ movieList: mainMoviesList, title: 'All movies. Upcoming', hideTitle: true, slotAfterContent: createShowMore(), })}
    ${createMovieList({ movieList: topRatedMoviesList, title: 'Top rated', modifiers: 'films-list--extra',})}
    ${createMovieList({ movieList: mostCommentedMoviesList, title: 'Most commented', modifiers: 'films-list--extra',})}
  </section>
`;
