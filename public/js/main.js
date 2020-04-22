// import
// import { rejectAddTravel } from './travel-list.js';

// state
let schedules = [];
let travels = [];
let travelId = '';
let alertCheck;

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
const $dateList = document.querySelector('.date-list');

const $alertDeleteBtn = document.querySelector('.delete-y')
const $alertcancleBtn = document.querySelector('.delete-n')
const $alertPopup = document.querySelector('.delete-confirm')
const $alertPopupBg = document.querySelector('.delete-popup-bg')
const $newTravelBtn = document.querySelector('.new-travel-btn');


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
  //console.log(travels)
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

const removeTravel = async (id) => {
  
  //if (!target.matches('.travel-list > li > .travel-remove-btn')) return;
  
  await axios.delete(`/travels/${id}`);
  travels = travels.filter((travel) => travel.id !== +id);
  renderTravelList();

  $alertPopupBg.style.display = 'none';
  $alertPopup.style.display = 'none';
};


// time line
const sortTimeline = schedules => {
  const timelineBlocks = $scheduleList.querySelectorAll('.schedule');

  timelineBlocks.forEach(block => {
    block.style.top = `${75 * (schedules.timeFrom - 7)}px`;
    block.style.height = `${75 * (schedules.timeTo - schedules.timeFrom)}px`;
  });
};

const renderDateBox = (startDate, endDate) => {
  let html = '';

  let travelPeriod = 0;
  const oneDay = 86400000;
  travelPeriod = new Date(endDate).getTime() - new Date(startDate).getTime();
  travelPeriod = Math.ceil(travelPeriod / oneDay) + 1;

  const newDate = startDate.split('/');

  const travelArr = Array.from({ length: travelPeriod }, function (v, i) {
    let newDay = new Date(startDate);
    newDay = newDay.getDate() + i;
    newDate[2] = `${newDay}`;
    const newDate2 = newDate.join('/');
    return newDate2;
  });

  travelArr.forEach(travel => {
    const today = new Date(travel);
    const date = today.getDate();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const day = dayNames[today.getDay()];

    html += `
      <li class="date-item">
        <div class="day">${date}</div>
        <div class="week">${day}</div>
      </li>
    `;
  });

  $dateList.innerHTML = html;

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
  console.log(data);
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
  // const travelId = 1;

  const { data } = await axios.post('/schedules', { travelId, date, timeFrom, timeTo, place, detail });
  schedules = [data, ...schedules];

  closeSchedulePopup();
  renderTimeline(schedules);

  $inputSchedulePlace.value = '';
  $inputScheduleDetail.value = '';
  [...$newSchedulePopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

const goToTimeline = async (target) => {
  if (!target.matches('.travel-list > li')) return;
  const timeline = document.getElementById('main-calendar');
  const home = document.getElementById('main-home');

  timeline.classList.add('main-view');
  home.classList.remove('main-view');

  travelId = target.id;
  const { data: {startDate, endDate }} = await axios.get(`/travels/${travelId}`);
  getSchedules(travelId);
  renderDateBox(startDate, endDate);
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

$travelList.addEventListener('click', ({ target }) => goToTimeline(target));

//REMIND: 희진작업-삭제경고창 페이지 1


$travelList.onclick = ({target}) => {
  const id = target.parentNode.id;

  $alertPopupBg.style.display = 'block';
  $alertPopup.style.display = 'block';

  $alertDeleteBtn.addEventListener('click', e => removeTravel(id));
  alertCheck = null;
};

const alertClosePopup = ()=>{
  //$alertcancleBtn.onclick = () =>{
  $alertPopupBg.style.display = 'none';
  $alertPopup.style.display = 'none';
}

window.onclick = ({ target }) => {
  if (target !== $alertPopupBg || target === $newTravelBtn) return;
  alertClosePopup();
};



