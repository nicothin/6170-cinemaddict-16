export const createMovieList = ({ title, hideTitle = false, modifiers = '' }) => `
    <section class="films-list ${modifiers}">
      <h2 class="films-list__title${hideTitle ? ' visually-hidden' : ''}">${title}</h2>
      <div class="films-list__container"></div>
    </section>
`.trim();
