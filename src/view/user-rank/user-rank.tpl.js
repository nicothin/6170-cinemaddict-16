export const createUserRank = (data) => {
  const { counter } = data;

  let rank = 'novice';

  if (counter >= 11 && counter <= 20) {
    rank = 'fan';
  }
  if (counter >= 21) {
    rank = 'movie buff';
  }

  const content = (!!counter && counter > 0) ?
    `<p class="profile__rating">${rank}</p><img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">` :
    '';

  return `<section class="header__profile profile">${content}</section>`;

};
