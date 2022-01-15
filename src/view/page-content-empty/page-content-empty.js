import Component from '../../abstract/component';

export default class PageContentEmpty extends Component {
  #text = '';

  constructor(text = 'Something is wrong...') {
    super();

    this.#text = text;
  }

  get template() {
    return `
      <section class="films-list">
        <h2 class="films-list__title">${this.#text}</h2>
      </section>
    `.trim();
  }
}
