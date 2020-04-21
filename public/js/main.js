// import
// import { rejectAddTravel } from './travel-list.js';

// state
let schedules = [];
let travels = [];
let travelId = '';

// DOMs
const $month = document.querySelector('#month-select');
const $date = document.querySelector('#date-select');
const $startHour = document.querySelector('#start-hour-select');
const $startMin = document.querySelector('#start-min-select');
const $endHour = document.querySelector('#end-hour-select');
const $endMin = document.querySelector('#end-min-select');
const $addScheduleBtn = document.querySelector('.add-schedule-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $inputTravelTitle = document.querySelector('.input-title');
const $inputTravelPlace = document.querySelector('.input-place');
const $inputSchedulePlace = document.querySelector('#schedule-input-place');
const $inputScheduleDetail = document.querySelector('#schedule-input-detail');
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
  const { data } = await axios.get(`/schedules/${travelId}`);
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
    const generateDday = () => {
      let dDay = 0;
      let today = new Date();
      today = today.getTime();
      dDay = new Date(startDate).getTime();
      dDay = Math.ceil((dDay - today) / 86400000) + 1;
      return dDay;
    };

    html += ` <li id=${id}>
          <h2>${title}</h2>
          <em>D-${generateDday()}</em>
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

  travelId = target.id;
  getSchedules(travelId);
};

const makeScheduleData = newId => {
  axios.post('/schedules', { id: newId });
};

const addSchedule = () => {
  const date = `${$month.value}/${$date.value}`;
  const timeFrom = `${$startHour.value}:${$startMin.value}`;
  const timeTo = `${$endHour.value}:${$endMin.value}`;
  const place = $inputSchedulePlace.value;
  const detail = $inputScheduleDetail.value;

  console.log(date)
  console.log(timeFrom)
  console.log(place)

  // console.log(axios.post('/schedules', { date, timeFrom, timeTo, place, detail }));
  const { data } = axios.post('/schedules', { date, timeFrom, timeTo, place, detail });
  console.log(data);
};

// event handlers
window.onload = getTravels;

$addScheduleBtn.addEventListener('click', addSchedule);

$addTravelBtn.onclick = async () => {
  const title = $inputTravelTitle.value.trim();
  const place = $inputTravelPlace.value.trim();
  const startDate = `${$startYear.value}/${$startMonth.value}/${$startDate.value}`;
  const endDate = `${$endYear.value}/${$endMonth.value}/${$endDate.value}`;
  const newId = generateId();

  // if (rejectAddTravel !== 0) return;

  const { data } = await axios.post('/travels', { id: newId, title, place, startDate, endDate });
  travels = [data, ...travels];

  closeTravelPopup();
  renderTravelList();
  makeScheduleData(newId);

  $inputTravelTitle.value = '';
  $inputTravelPlace.value = '';

  [...$newTravelPopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

$travelList.addEventListener('click', ({ target }) => removeTravel(target));
$travelList.addEventListener('click', ({ target }) => goToTimeline(target));
