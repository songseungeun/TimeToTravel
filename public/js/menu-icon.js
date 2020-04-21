let navState = 'home';

const $menuList = document.querySelector('.menu-list');
const $mainList = document.querySelector('.main-wrapper');


$menuList.onclick = ({ target }) => {
  if (!target.matches('.menu-list i')) return;

  navState = target.parentNode.id;
  [...$menuList.children].forEach(menuItem => menuItem.classList.toggle('active', menuItem.id === target.parentNode.id));
  [...$mainList.children].forEach(main => main.classList.toggle('main-view', main.id === 'main-' + target.parentNode.id));
};
