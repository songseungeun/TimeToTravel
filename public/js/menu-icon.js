// import { getAirlineData, getLodgingData } from './travel-info.js';
import { $menuList, $mainList, $timelineTitle } from './main.js';

let navState = 'home';

$menuList.onclick = ({ target }) => {
  if (!target.matches('.menu-list i')) return;
  const menus = [...$menuList.children]
  navState = target.parentNode.id;

  menus.forEach(menuItem => menuItem.classList.toggle('active', menuItem.id === target.parentNode.id));
  [...$mainList.children].forEach(main => main.classList.toggle('main-view', main.id === 'main-' + target.parentNode.id));

  if (navState === 'home') {
    const [homeMenu, ...removeMenus] = menus;
    removeMenus.forEach(menuIcon => menuIcon.style.display = 'none');
    $timelineTitle.classList = 'timeline-travel-title';
  }

  // if (navState === 'airplane') {
  //   getAirlineData();
  //   getLodgingData();
  // }
};
