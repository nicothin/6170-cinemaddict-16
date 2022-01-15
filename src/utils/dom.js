const getScrollSize = () => {
  const outer = document.createElement('div');
  const inner = document.createElement('div');
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  outer.appendChild(inner);
  const scrollbarSize = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return scrollbarSize;
};

/**
 * Переключить скролл страницы
 * @param {boolean} disableScroll Флаг: включить или выключить
 */
export const setPageScrollDisable = (disableScroll = true) => {
  const body = document.body;
  const scrollSize = getScrollSize();
  const hasScroll = body.scrollHeight > window.innerHeight;

  if (disableScroll) {
    if (hasScroll) {
      document.documentElement.style.paddingRight = `${scrollSize}px`;
    }
    body.classList.add('hide-overflow');
  }
  else {
    document.documentElement.style.paddingRight = '';
    body.classList.remove('hide-overflow');
  }
};
