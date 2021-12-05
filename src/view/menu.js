export const createMenu = (movies = []) => {
  const menuData = [
    {
      id: 'all',
      text: 'All movies',
      counter: movies.length,
      isActive: true,
      isShowCounter: false,
    },
    {
      id: 'watchlist',
      text: 'Watchlist',
      counter: movies.filter((movie) => movie.userDetails.watchlist).length,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'history',
      text: 'History',
      counter: movies.filter((movie) => movie.userDetails.alreadyWatched).length,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: 'favorites',
      text: 'Favorites',
      counter: movies.filter((movie) => movie.userDetails.favorite).length,
      isActive: false,
      isShowCounter: true,
    },
  ];

  const menu = menuData.map((item) => {
    const counter = item.isShowCounter ? ` <span class="main-navigation__item-count">${item.counter}</span>` : '';
    const activeClassName = item.isActive ? 'main-navigation__item--active' : '';

    return `<a href="#${item.id}" class="main-navigation__item ${activeClassName}">${item.text}${counter}</a>`;
  }).join(' ');

  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      ${menu}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
`;
};
