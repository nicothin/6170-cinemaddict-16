import { Hashes, RenderPosition, ModelState } from '../constants';
import { ActionCreator } from '../reducers/reducer';
import { render } from '../utils/render';

import Menu from '../view/menu/menu';

export default class MainMenuPresenter {
  #menuData = {
    filters: [
      {
        id: Hashes.ALL,
        text: 'All movies',
        counter: 0,
        isActive: false,
        isShowCounter: false,
      },
      {
        id: Hashes.WATCHLIST,
        text: 'Watchlist',
        counter: 0,
        isActive: false,
        isShowCounter: true,
      },
      {
        id: Hashes.HISTORY,
        text: 'History',
        counter: 0,
        isActive: false,
        isShowCounter: true,
      },
      {
        id: Hashes.FAVORITES,
        text: 'Favorites',
        counter: 0,
        isActive: false,
        isShowCounter: true,
      },
    ],
    isStats: false,
  };

  #model = null;
  #wrapperElement = null;
  #menuComponent = new Menu(this.#menuData);

  constructor(model, wrapperElement)  {
    this.#model = model;
    this.#wrapperElement = wrapperElement;

    this.init();
  }

  init = () => {
    render(this.#wrapperElement, this.#menuComponent, RenderPosition.AFTERBEGIN);

    this.#updateMenuData(
      this.#model.getState(ModelState.HASH)
    );

    this.#menuComponent.setLinkClickHandler(this.#linkClickHandler);

    this.#model.subscribe(ModelState.ALL_MOVIES, this.#modelAllMoviesListChangeHandler);
    this.#model.subscribe(ModelState.HASH, this.#modelHashChangeHandler);
  }

  #modelAllMoviesListChangeHandler = (movies) => {
    let hasChange = false;
    this.#menuData.filters.forEach((item) => {
      switch (item.id) {
        case Hashes.ALL: {
          const newCounter = movies.length;
          if (newCounter !== item.counter) {
            hasChange = true;
            item.counter = newCounter;
          }
          break;
        }
        case Hashes.WATCHLIST: {
          const newCounter = movies.filter((movie) => movie.userDetails.watchlist).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            item.counter = newCounter;
          }
          break;
        }
        case Hashes.HISTORY: {
          const newCounter = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            item.counter = newCounter;
          }
          break;
        }
        case Hashes.FAVORITES: {
          const newCounter = movies.filter((movie) => movie.userDetails.favorite).length;
          if (newCounter !== item.counter) {
            hasChange = true;
            item.counter = newCounter;
          }
          break;
        }
        default:
          break;
      }
    });

    if (hasChange) {
      this.#menuComponent.updateData(this.#menuData);
    }
  }

  #linkClickHandler = (hash) => {
    const oldHash = this.#model.getState(ModelState.HASH);
    const newHash = hash.replace('#', '');

    if (oldHash === newHash) {
      return;
    }

    this.#model.dispatch(ActionCreator.setHash(newHash));
  }

  #modelHashChangeHandler = (hash) => {
    this.#updateMenuData(hash);
    this.#menuComponent.updateData(this.#menuData);
  }

  #updateMenuData = (hash) => {
    if (hash === Hashes.STATS) {
      this.#menuData.isStats = true;
      this.#menuData.filters.forEach((filter) => {
        filter.isActive = false;
      });
    }
    else {
      this.#menuData.isStats = false;
      this.#menuData.filters.forEach((filter) => {
        filter.isActive = filter.id === hash;
      });
    }
  }
}
