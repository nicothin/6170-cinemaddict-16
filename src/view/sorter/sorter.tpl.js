import { Sorting } from '../../constants';

export const createSorter = (data) => {
  const { type } = data;
  const ACTIVE_CLASSNAME = 'sort__button--active';

  return `
    <ul class="sort">
      <li><a href="#" class="sort__button ${type === Sorting.DEFAULT ? ACTIVE_CLASSNAME : ''}" data-sort-type="${Sorting.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${type === Sorting.DATE ? ACTIVE_CLASSNAME : ''}" data-sort-type="${Sorting.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${type === Sorting.RATING ? ACTIVE_CLASSNAME : ''}" data-sort-type="${Sorting.RATING}">Sort by rating</a></li>
    </ul>
  `.trim();
};
