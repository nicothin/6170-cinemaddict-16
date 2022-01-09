/**
 * Получить строку, подрезанную по длине.
 * @param {string} text Подрезаемая строка
 * @param {number} length Длина строки
 * @returns {string} Строка
 */
export const getSliceText = (text, length) => {
  let sliced = text.slice(0, length);
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
 * Получить длительность в часах изи длительности в минутах
 * @param {number} minutes Количество минут
 * @returns {string} Длительность в формате ЧЧh ММm
 */
export const getFormattedRuntime = (minutes) => {
  const runtimeHours = Math.trunc(minutes / 60);
  return `${runtimeHours ? `${runtimeHours}h` : ''} ${minutes % 60}m`;
};

export const isEscPressed = (event) => event.key === 'Escape' || event.key === 'Esc';

/**
 * Получить статус юзера
 * @param {number} moviesCounter Количество просмотренных фильмов
 * @returns {string} Соответствующий статус
 */
export const getUserRank = (moviesCounter) => {
  let rank = '';

  if (moviesCounter >= 1 && moviesCounter <= 10) {
    rank = 'novice';
  }
  if (moviesCounter >= 11 && moviesCounter <= 20) {
    rank = 'fan';
  }
  if (moviesCounter >= 21) {
    rank = 'movie buff';
  }

  return rank;
};
