export const createMenu = (props) => {
  const { filters, isStats } = props;

  const menuItems = filters.map((item) => {
    const counter = item.isShowCounter ? ` <span class="main-navigation__item-count">${item.counter}</span>` : '';
    const activeClassName = item.isActive ? 'main-navigation__item--active' : '';

    return `<a href="#${item.id}" class="main-navigation__item ${activeClassName}">${item.text}${counter}</a>`;
  }).join(' ');

  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      ${menuItems}
    </div>
    <a href="#stats" class="main-navigation__additional ${isStats ? 'main-navigation__additional--active' : ''}">Stats</a>
  </nav>
`.trim();
};
