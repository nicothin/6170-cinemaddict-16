export const createMovieList = ({movieList = [], title, hideTitle, modifiers = '', slotAfterContent = ''}) => {
  const movies = movieList.join(' ');

  return `
    <section class="films-list ${modifiers}">
      <h2 class="films-list__title${hideTitle ? ' visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container">
        ${movies}
      </div>
      ${slotAfterContent}
    </section>
`;
};
