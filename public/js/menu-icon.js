const $menuList = document.querySelector('.menu-list');
const $mainTravels = document.querySelector('.main-travels');
const $mainInfo = document.querySelector('.main-info');
const $newInfoBtn = document.querySelector('.new-info-btn')
const $mainSchedule = document.querySelector('.main-schedule');
const $menuItem = document.querySelector('.menu-item > i');

function viewChangeMain({ target }) {
  if (!target.matches('i')) return;

  if (target.matches('.fa-home')) {
    $mainSchedule.style.display = 'none';
    $mainTravels.style.display = 'block';
    $mainInfo.style.display = 'none';
    $newInfoBtn.style.display = 'none';
  } else if (target.matches('.fa-calendar-alt')) {
    $mainSchedule.style.display = 'block';
    $mainTravels.style.display = 'none';
    $mainInfo.style.display = 'none';
  } else if (target.matches('.fa-plane-departure')) {
    $mainSchedule.style.display = 'none';
    $mainTravels.style.display = 'none';
    $mainInfo.style.display = 'block';
  }
  // else if (target.matches('.fa-dollar-sign')) {
  //   $mainSchedule.style.display = 'block';
  //   $mainTravels.style.display = 'none';
  //   $mainInfo.style.display = 'none';
  // }
}

// .main-travels {
//   /* display: block; */
//   display: none;
// }
// .main-schedule {
//   display: block;
//   /* display: none; */
// }
// .main-info {
//   /* display: block; */
//   display: none;
// }

$menuList.addEventListener('click', viewChangeMain);