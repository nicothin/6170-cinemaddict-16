import Component from '../abstract/component';

const createSorter = () => `
<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>
`.trim();

export default class Sorter extends Component {
  get template() {
    return createSorter();
  }
}
