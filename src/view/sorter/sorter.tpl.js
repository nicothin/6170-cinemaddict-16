import { Sorting } from '../../constants';

export const createSorter = () => `
<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sort-type="${Sorting.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${Sorting.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sort-type="${Sorting.RATING}">Sort by rating</a></li>
</ul>
`.trim();
