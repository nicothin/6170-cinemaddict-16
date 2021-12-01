import { RENDERPOSITION } from './constants';

export const renderTemplate = (container, template, place = RENDERPOSITION.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};
