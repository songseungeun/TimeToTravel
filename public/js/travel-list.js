// DOMs
const $newTravelBtn = document.querySelector('.new-travel-btn');
const $addTravelBtn = document.querySelector('.add-travel-btn');
const $popupBg = document.querySelector('.new-travel-popup-bg');
const $popupRemove = document.querySelector('.new-travel-popup-remove-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $inputTitle = document.querySelector('.input-title');
const $inputPlace = document.querySelector('.input-place');
const $startYear = $newTravelPopup.querySelector('#start-year-select');
const $startMonth = $newTravelPopup.querySelector('#start-month-select');
const $startDate = $newTravelPopup.querySelector('#start-day-select');
const $endYear = $newTravelPopup.querySelector('#end-year-select');
const $endMonth = $newTravelPopup.querySelector('#end-month-select');
const $endDate = $newTravelPopup.querySelector('#end-day-select');

// functions
const closeHomePopup = () => {
  $newTravelPopup.style.display = 'none';
  $popupBg.style.display = 'none';
};

const openHomePopup = () => {
  $popupBg.style.display = 'block';
  $newTravelPopup.style.display = 'block';
};

const renderTravelList = () => {


};

// event handlers
$newTravelBtn.addEventListener('click', openHomePopup);
$popupBg.addEventListener('click', closeHomePopup);
$popupRemove.addEventListener('click', closeHomePopup);

$addTravelBtn.onclick = async () => {
  const title = $inputTitle.value.trim();
  const place = $inputPlace.value.trim();
  const startDate = `${$startYear.value}/${$startMonth.value}/${$startDate.value}`;
  const endDate = `${$endYear.value}/${$endMonth.value}/${$endDate.value}`;

  const { data } = await axios.post('/travels', { id: 2, title, place, startDate, endDate });
  travels = data;

  renderTravelList();
};
