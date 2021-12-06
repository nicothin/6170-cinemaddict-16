import { RenderPosition } from '../constants';
import { renderTemplate } from '../render';
import { createMovieCard } from './movie-card';
import { createShowMore } from './show-more-button';

export const createMovieList = ({ id, movieList = [], title, hideTitle, modifiers = '', movieCountPerStep }) => {
  let movies = '';
  let showMoreButton = '';

  if (movieCountPerStep) {
    for (let i = 0; i < Math.min(movieList.length, movieCountPerStep); i++) {
      movies += createMovieCard(movieList[i]);
    }

    if (movieList.length > movieCountPerStep) {
      let showingMovieCount = movieCountPerStep;
      showMoreButton = createShowMore();
      // Овнокодец, который, надеюсь, пойдёт лесом ^(
      document.addEventListener('click', (event) => {
        const place = document.querySelector(`#${id} .films-list__container`);
        if (event.target.closest(`#${id}`) && event.target.classList.contains('films-list__show-more')) {
          movieList
            .slice(showingMovieCount, showingMovieCount + movieCountPerStep)
            .forEach((movie) => renderTemplate(place, createMovieCard(movie), RenderPosition.BEFOREEND));
          showingMovieCount += movieCountPerStep;
        }
        if (showingMovieCount >= movieList.length) {
          document.querySelector(`#${id} .films-list__show-more`).remove();
        }
      });
    }
  }
  else {
    movies = movieList.map((movie) => createMovieCard(movie)).join(' ');
  }

  return `
    <section id="${id}" class="films-list ${modifiers}">
      <h2 class="films-list__title${hideTitle ? ' visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container">
        ${movies}
      </div>
      ${showMoreButton}
    </section>
`;
};
