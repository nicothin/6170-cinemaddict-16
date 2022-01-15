/**
 * Получить строку, подрезанную по длине.
 * @param {string} text Подрезаемая строка
 * @param {number} length Длина строки
 * @returns {string} Строка
 */
export const getSliceText = (text, length) => {
  let sliced = text.slice(0, length - 1);
  if (sliced.length < text.length) {
    sliced += '…';
  }
  return sliced;
};

/**
 * Склеить массив через запутую. Если прищла строка, её же и вернуть.
 * @param {string|array} data Строка или массив
 * @returns {string} Строка с результатом
 */

export const getFormattedList = (data) => typeof data === 'string' ? data : data.join(', ');

/**
 * Получить длительность в часах или минутах
 * @param {number} minutes Количество минут
 * @param {string} letterWrapperClassName Класс обертки букв в форматированной длительности
 * @param {string} letterWrapperTag Тег обертки букв в форматированной длительности
 * @returns {string} Длительность в формате ЧЧh ММm
 */
export const getFormattedRuntime = (minutes, letterWrapperClassName, letterWrapperTag = 'span') => {
  const runtimeHours = Math.trunc(minutes / 60);
  const hoursMarkup = letterWrapperClassName ? `<${letterWrapperTag} class="${letterWrapperClassName}">h</${letterWrapperTag}>` : 'h';
  const minutesMarkup = letterWrapperClassName ? `<${letterWrapperTag} class="${letterWrapperClassName}">m</${letterWrapperTag}>` : 'm';
  return `${runtimeHours ? `${runtimeHours}${hoursMarkup}` : ''} ${minutes % 60}${minutesMarkup}`;
};

export const isEscPressed = (event) => event.key === 'Escape' || event.key === 'Esc';

/**
 * Получить данные юзера
 * @param {number} moviesCounter Количество просмотренных фильмов
 * @returns {{ rank: string, avatar: string }} Ранг и аватар
 */
export const getUserData = (moviesCounter) => {
  let rank = '';
  const avatar = 'images/bitmap@2x.png'; // NOTE[@nicothin]: предположительно, тоже будет меняться

  if (moviesCounter >= 1 && moviesCounter <= 10) {
    rank = 'novice';
  }
  if (moviesCounter >= 11 && moviesCounter <= 20) {
    rank = 'fan';
  }
  if (moviesCounter >= 21) {
    rank = 'movie buff';
  }

  return {
    rank,
    avatar
  };
};
