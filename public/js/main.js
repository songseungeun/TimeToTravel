// state
let schedules = [];
let travels = [];
let timelineOf = '';

// DOMs
const $month = document.querySelector('#month-select');
const $date = document.querySelector('#date-select');
const $startHour = document.querySelector('#start-hour-select');
const $startMin = document.querySelector('#start-min-select');
const $endHour = document.querySelector('#end-hour-select');
const $endMin = document.querySelector('#end-min-select');
const $addScheduleBtn = document.querySelector('.add-schedule-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $inputTitle = document.querySelector('.input-title');
const $inputPlace = document.querySelector('.input-place');
const $startYear = $newTravelPopup.querySelector('#start-year-select');
const $startMonth = $newTravelPopup.querySelector('#start-month-select');
const $startDate = $newTravelPopup.querySelector('#start-day-select');
const $endYear = $newTravelPopup.querySelector('#end-year-select');
const $endMonth = $newTravelPopup.querySelector('#end-month-select');
const $endDate = $newTravelPopup.querySelector('#end-day-select');
const $travelList = document.querySelector('.travel-list');
const $addTravelBtn = document.querySelector('.add-travel-btn');
const $popupBg = document.querySelector('.new-travel-popup-bg');

// functions
const getSchedules = async () => {
  const { data } = await axios.get(`/schedules/${timelineOf}`);
  schedules = data;
  // renderTimeline();
};

const closeTravelPopup = () => {
  $popupBg.style.display = 'none';
  $newTravelPopup.style.display = 'none';
};

const generateId = () => travels.length ? Math.max(...travels.map(({ id }) => id)) + 1 : 1;

const renderTravelList = () => {
  let html = '';

  travels.forEach(({ id, title, place, startDate, endDate }) => {
    html += ` <li id=${id}>
          <h2>${title}</h2>
          <em>D-${startDate}</em>
          <div class="travel-info">
            <span class="travel-place">${place}</span>
            <span class="travel-date">${startDate} ~ ${endDate}</span>
          </div>
          <div class="travel-remove-btn">X</div>
        </li>`;
  });

  $travelList.innerHTML = html;
};

const getTravels = async () => {
  const { data } = await axios.get('/travels');
  travels = data;
  renderTravelList();
};

const removeTravel = async (target) => {
  if (!target.matches('.travel-list > li > .travel-remove-btn')) return;
  const id = target.parentNode.id;

  await axios.delete(`/travels/${id}`);
  travels = travels.filter((travel) => travel.id !== +id);
  renderTravelList();
};

const goToTimeline = (target) => {
  if (!target.matches('.travel-list > li')) return;

  timelineOf = target.id;
  getSchedules(timelineOf);
};

const makeScheduleData = newId => {
  axios.post('/schedules', { id: newId });
};

// event handlers
window.onload = getTravels;

$addScheduleBtn.onclick = () => {
  const date = `${$month.value}/${$month.value}`;
  const timeFrom = `${$startHour.value}:${$startMin.value}`;
  const timeTo = `${$endHour.value}:${$endMin.value}`;
  const place = $inputPlace;
  const detail = $inputDetail;

  const { data } = axios.post(`/schedules/${timelineOf}`, { date, timeFrom, timeTo, place, detail });
};

$addTravelBtn.onclick = async () => {
  const title = $inputTitle.value.trim();
  const place = $inputPlace.value.trim();
  const startDate = `${$startYear.value}/${$startMonth.value}/${$startDate.value}`;
  const endDate = `${$endYear.value}/${$endMonth.value}/${$endDate.value}`;
  const newId = generateId();

  const { data } = await axios.post('/travels', { id: newId, title, place, startDate, endDate });
  travels = [data, ...travels];

  closeTravelPopup();
  renderTravelList();
  makeScheduleData(newId);

  $inputTitle.value = '';
  $inputPlace.value = '';

  [...$newTravelPopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

$travelList.addEventListener('click', ({ target }) => removeTravel(target));
$travelList.addEventListener('click', ({ target }) => goToTimeline(target));
