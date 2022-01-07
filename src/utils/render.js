import { RenderPosition } from '../constants';
import Component from '../abstract/component';

/**
 * Вставить элемент в элемент.
 * @param {Element} container Родительский элемент
 * @param {Element} element Вставляемый элемент
 * @param {string} place Позиция вставляемого элемента относительно родительского
 */
export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  const parent = container instanceof Component ? container.element : container;
  const child = element instanceof Component ? element.element : element;

  if (!child) {
    return;
  }

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

/**
 * Создать DOM-элемент из строки
 * @param {string} template Строка с разметкой
 * @returns {Element} DOM-узел
 */
export const createElement = (template = '') => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Убить компонент
 * @param {object} component Компонент, который больше не нужен
 */
export const remove = (component) => {
  if (component === null) {
    return;
  }

  component.element.remove();
  component.removeElement();
};
