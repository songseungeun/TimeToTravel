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
const $newSchedulePopup = document.querySelector('.new-schedule-popup');
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
const $travelPopupBg = document.querySelector('.new-travel-popup-bg');
const $newSchedulePopUp = document.querySelector('.new-schedule-popup');
const $schedulePopupBg = document.querySelector('.popup-bg');
const $scheduleList = document.querySelector('.schedule-list');

// functions
// popups
const closeSchedulePopup = () => {
  $newSchedulePopUp.style.display = 'none';
  $schedulePopupBg.style.display = 'none';
};

const closeTravelPopup = () => {
  $travelPopupBg.style.display = 'none';
  $newTravelPopup.style.display = 'none';
};

// travel list
const generateDday = startDate => {
  let dDay = 0;
  let today = new Date();

  today = today.getTime();
  dDay = new Date(startDate).getTime();
  dDay = Math.ceil((dDay - today) / 86400000) + 1;

  return dDay > 0 ? `D-${dDay}` : (dDay === 0 ? `D-Day` : '');
};

const generateId = () => travels.length ? Math.max(...travels.map(({ id }) => id)) + 1 : 1;

const renderTravelList = () => {
  let html = '';

  travels.forEach(({ id, title, place, startDate, endDate }) => {
    html += ` <li id=${id}>
          <h2>${title}</h2>
          <em>${generateDday(startDate)}</em>
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

// time line
const sortTimeline = schedules => {
  const timelineBlocks = $scheduleList.querySelectorAll('.schedule');

  timelineBlocks.forEach(block => {
    block.style.top = `${75 * (schedules.timeFrom - 7)}px`;
    block.style.height = `${75 * (schedules.timeTo - schedules.timeFrom)}px`;
  });
};

const renderTimeline = schedules => {
  let html = '';

  schedules.forEach(({ travelId, timeFrom, place, detail, id }) => {
    html += `<li class="schedule" id="${travelId}-${id}">
            <div class="time">${timeFrom}</div>
            <div class="place">${place}</div>
            <div class="detail">${detail}</div>
            <div class="remove-btn">X</div>
          </li>`;
  });

  $scheduleList.innerHTML = html;
  sortTimeline(schedules);
};

const getSchedules = async (travelId, date) => {
  const { data } = await axios.get(`/schedules?travelId=${travelId}&date=${date}`);
  schedules = data;

  renderTimeline(schedules);
};

const addSchedule = async () => {
  const date = `${$month.value}/${$date.value}`;
  const timeFrom = `${$startHour.value}:${$startMin.value}`;
  const timeTo = `${$endHour.value}:${$endMin.value}`;
  const place = $inputSchedulePlace.value;
  const detail = $inputScheduleDetail.value;
  // const travelId = 1;

  const { data } = await axios.post('/schedules', { travelId, date, timeFrom, timeTo, place, detail });
  schedules = [data, ...schedules];

  closeSchedulePopup();
  renderTimeline();

  $inputSchedulePlace.value = '';
  $inputScheduleDetail.value = '';
  [...$newSchedulePopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

const goToTimeline = (target) => {
  if (!target.matches('.travel-list > li')) return;
  const timeline = document.getElementById('main-calendar');
  const home = document.getElementById('main-home');

  timeline.classList.add('main-view');
  home.classList.remove('main-view');

  travelId = target.id;
  getSchedules(travelId);
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

  $inputTravelTitle.value = '';
  $inputTravelPlace.value = '';

  [...$newTravelPopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

$travelList.addEventListener('click', ({ target }) => removeTravel(target));
$travelList.addEventListener('click', ({ target }) => goToTimeline(target));
