import Store from '../services/store';
import { Filters, RenderPosition, StoreState } from '../constants';
import { remove, render } from '../utils/render';

import Menu from '../view/menu/menu';

export default class MainMenuPresenter {
  #store = new Store()

  #menuFilters = [
    {
      id: Filters.ALL,
      text: 'All movies',
      counter: 0,
      isActive: true,
      isShowCounter: false,
    },
    {
      id: Filters.WATCHLIST,
      text: 'Watchlist',
      counter: 0,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: Filters.HISTORY,
      text: 'History',
      counter: 0,
      isActive: false,
      isShowCounter: true,
    },
    {
      id: Filters.FAVORITES,
      text: 'Favorites',
      counter: 0,
      isActive: false,
      isShowCounter: true,
    },
  ];

  #siteMainElement = null

  #menuComponent = null

  constructor(siteMainElement)  {
    this.#siteMainElement = siteMainElement;

    this.init();
  }

  init = () => {
    this.#renderMenu();
    this.#store.subscribe(StoreState.ALL_MOVIES, this.#changeAllMoviesListHandler);
  }

  #renderMenu = () => {
    if (this.#menuComponent) {
      remove(this.#menuComponent);
    }
    this.#menuComponent = new Menu(this.#menuFilters);
    render(this.#siteMainElement, this.#menuComponent, RenderPosition.AFTERBEGIN);
  }

  #changeAllMoviesListHandler = (movies) => {
    let hasChange = false;
    const newMenu = this.#menuFilters.map((item) => {
      switch (item.id) {
        case Filters.ALL: {
          const newCounter = movies.length;
          if (newCounter !== item.counter) {
            hasChange = true;
            return {...item, counter: newCounter};
          }
          return item;
        }
        case Filters.WATCHLIST: {
          const newCounter = movies.filter((movie) => movie.userDetails.watchlist).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            return { ...item, counter: newCounter };
          }
          return item;
        }
        case Filters.HISTORY: {
          const newCounter = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            return { ...item, counter: newCounter };
          }
          return item;
        }
        case Filters.FAVORITES: {
          const newCounter = movies.filter((movie) => movie.userDetails.favorite).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            return { ...item, counter: newCounter };
          }
          return item;
        }
        default: {
          return item;
        }
      }
    });
    if (hasChange) {
      this.#menuFilters = newMenu;
      this.#renderMenu();
    }
  }
}
