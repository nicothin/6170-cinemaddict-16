import SmartComponent from '../../abstract/smart-component';
import { createUserRank } from './user-rank.tpl';

export default class UserRank extends SmartComponent {

  /**
   * Статус пользователя в зависимости от кол-ва просмотренных фильмов
   * @param {{ counter: number }} props
   */

  constructor(props) {
    super();

    this._data = props;
  }

  get template() {
    return createUserRank(this._data);
  }

  restoreHandlers = () => {}
}
