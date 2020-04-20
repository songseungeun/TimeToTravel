// DOMs
const $newTravelBtn = document.querySelector('.new-travel-btn');
const $addTravelBtn = document.querySelector('.add-travel-btn');
const $popupBg = document.querySelector('.new-travel-popup-bg');
const $popupRemove = document.querySelector('.new-travel-popup-remove-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $inputTitle = document.querySelector('.input-title');
const $inputPlace = document.querySelector('.input-place');
const $selectYear = $newTravelPopup.querySelector('#year-select');
const $selectMonth = $newTravelPopup.querySelector('#month-select');
const $selectDate = $newTravelPopup.querySelector('#day-select');

// functions
const closeHomePopup = () => {
  $newTravelPopup.style.display = 'none';
  $popupBg.style.display = 'none';
};

function openHomePopup() {
  $popupBg.style.display = 'block';
  $newTravelPopup.style.display = 'block';
};

// event handlers
$newTravelBtn.addEventListener('click', openHomePopup);
$popupBg.addEventListener('click', closeHomePopup);
$popupRemove.addEventListener('click', closeHomePopup);

$addTravelBtn.onclick = () => {
  const title = $inputTitle.value.trim();
  const place = $inputPlace.value.trim();

  console.log(title)
  console.log(place)

  // const year = selectYear.options[selectYear.selectedIndex].text;
  // console.log(year);
  // console.log(selectYear.value)

}