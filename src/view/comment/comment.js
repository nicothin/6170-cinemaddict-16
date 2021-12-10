import Component from '../../abstract/component';
import { createComment } from './comment.tpl';

export default class Comment extends Component {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createComment(this.#data);
  }
}
