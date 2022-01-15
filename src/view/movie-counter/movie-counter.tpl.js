export const createMovieCounter = (data) => {
  const { counter } = data;

  return `<p>${counter ? counter : 'No'} movies inside</p>`;
};
