import Component from '../../abstract/component';
import { createComment } from './comment.tpl';

export default class Comment extends Component {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createComment(this.#comment);
  }
}
