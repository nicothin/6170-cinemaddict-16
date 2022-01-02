export const createMovieCounter = (data) => {
  const { counter } = data;

  return `
<p>${counter} movies inside</p>
`.trim();

};
