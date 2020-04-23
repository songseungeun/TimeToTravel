// import { getAirlineData, getLodgingData } from './travel-info.js';
import { $menuList, $mainList, $timelineTitle, changeNav } from './main.js';



// $menuList.onclick = ({ target }) => {

  // if (navState === 'airplane') {
  //   getAirlineData();
  //   getLodgingData();
  // }
// };

$menuList.addEventListener('click', ({ target }) => changeNav(target));
