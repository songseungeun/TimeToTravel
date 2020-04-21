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

// schedule time line
const sortTimeline = schedule => {
  const schedules = $scheduleList.querySelectorAll('.schedule');

  schedules.forEach(schedule => {
    const id = schedule.id[1] - 1;

    schedule.style.top = `${75 * (travel[id].timeFrom - 7)}px`;
    schedule.style.height = `${75 * (travel[id].timeTo - travel[id].timeFrom)}px`;
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
  // sortTimeline();
};

const getSchedules = async () => {
  const { data } = await axios.get(`/schedules?travelId=${travelId}`);
  const timeline = document.getElementById('main-calendar');
  const home = document.getElementById('main-home');
  schedules = data;

  timeline.classList.add('main-view');
  home.classList.remove('main-view');
  renderTimeline(schedules);
};

const addSchedule = async () => {
  const date = `${$month.value}/${$date.value}`;
  const timeFrom = `${$startHour.value}:${$startMin.value}`;
  const timeTo = `${$endHour.value}:${$endMin.value}`;
  const place = $inputSchedulePlace.value;
  const detail = $inputScheduleDetail.value;
  const travelId = 1;

  const { data } = await axios.post('/schedules', { travelId, date, timeFrom, timeTo, place, detail });
  schedules = [data, ...schedules];

  closeSchedulePopup();
  renderTimeline();
  console.log('addSchedule', schedules)

  $inputSchedulePlace.value = '';
  $inputScheduleDetail.value = '';
  [...$newSchedulePopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

const goToTimeline = (target) => {
  if (!target.matches('.travel-list > li')) return;

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