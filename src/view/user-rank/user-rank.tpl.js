import { getUserRank } from '../../utils/common';

export const createUserRank = (data) => {
  const { counter } = data;

  const rank = getUserRank(counter);

  const content = (!!counter && counter > 0) ?
    `<p class="profile__rating">${rank}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">` :
    '';

  return `<section class="header__profile profile">${content}</section>`;

};
