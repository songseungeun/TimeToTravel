// import
// import { getSchedules, schedules } from './timeline.js';

// DOMs

const $newTravelBtn = document.querySelector('.new-travel-btn');
const $popupBg = document.querySelector('.new-travel-popup-bg');
const $popupRemove = document.querySelector('.new-travel-popup-remove-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');


// functions
const closeTravelPopup = () => {
  $popupBg.style.display = 'none';
  $newTravelPopup.style.display = 'none';
};

const openTravelPopup = () => {
  $popupBg.style.display = 'block';
  $newTravelPopup.style.display = 'block';
};

// event handlers

$newTravelBtn.addEventListener('click', openTravelPopup);
$popupBg.addEventListener('click', closeTravelPopup);
$popupRemove.addEventListener('click', closeTravelPopup);

// export
// export { timelineOf };
