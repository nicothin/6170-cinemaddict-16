import { createMovieList } from './movie-list';
import { createShowMore } from './show-more-button';
import { generateMoviesList } from '../mock/generate-movies-list';

export const createMovies = () => `
  <section class="films">
    ${createMovieList({ movieList: generateMoviesList(20), title: 'All movies. Upcoming', hideTitle: true, slotAfterContent: createShowMore(), })}
    ${createMovieList({ movieList: generateMoviesList(2), title: 'Top rated', modifiers: 'films-list--extra',})}
    ${createMovieList({ movieList: generateMoviesList(2), title: 'Most commented', modifiers: 'films-list--extra',})}
  </section>
`;
