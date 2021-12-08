import Component from '../abstract/component';

// TODO[@nicothin]: убрать экспорт
export const createShowMore = () => `
  <button class="films-list__show-more">Show more</button>
`.trim();

export default class ShowMore extends Component {
  get template() {
    return createShowMore();
  }
}
