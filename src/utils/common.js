// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUnique = (array) => [...new Set(array)];

export const getSliceText = (text, length) => {
  let sliced = text.slice(0, length);
  if (sliced.length < text.length) {
    sliced += '…';
  }
  return sliced;
};

export const getFormattedList = (data) => typeof data === 'string' ? data : data.join(', ');

export const getFormattedRuntime = (minutes) => {
  const runtimeHours = Math.trunc(minutes / 60);
  return `${runtimeHours ? `${runtimeHours}h` : ''} ${minutes % 60}m`;
};
