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
const $dateList = document.querySelector('.date-list');
const $alertDeleteBtn = document.querySelector('.alert-delete-btn')
const $alertCancleBtn = document.querySelector('.alert-cancel-btn')
const $alertPopup = document.querySelector('.alert-popup')
const $alertPopupBg = document.querySelector('.alert-popup-bg')
const $newTravelBtn = document.querySelector('.new-travel-btn');
const $newScheduleBtn = document.querySelector('.new-schedule-btn');
const $timelineDeleteBtn = document.querySelector('.timeline-delete-btn')
const $timelineCancleBtn = document.querySelector('.timeline-cancle-btn')
const $timelineAlertPopup = document.querySelector('.timeline-popup')
const $timeAlertPopupBg = document.querySelector('.timeline-popup-bg')

// functions
// popups
const resetSchedulePopup = () => {
  $inputSchedulePlace.value = '';
  $inputScheduleDetail.value = '';

  // [...div].forEach(child => {
  //   if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  //   console.log(child.nodeName);
  // });
};

const resetTravelPopup = () => {
  $inputTravelTitle.value = '';
  $inputTravelPlace.value = '';

  [...$newTravelPopup.children].forEach(child => {
    if (child.nodeName === 'SELECT') child.firstElementChild.selected = 'selected';
  });
};

const closeSchedulePopup = () => {
  $newSchedulePopUp.style.display = 'none';
  $schedulePopupBg.style.display = 'none';
  resetSchedulePopup();
};

const closeTravelPopup = () => {
  $travelPopupBg.style.display = 'none';
  $newTravelPopup.style.display = 'none';
  resetTravelPopup();
};
// travel list
const generateDday = startDate => {
  let dDay = 0;
  let today = new Date();

  today = today.getTime();
  dDay = new Date(startDate).getTime();
  dDay = Math.ceil((dDay - today) / 86400000) + 1;

  return dDay > 0 ? `D-${dDay}` : (dDay === 0 ? 'D-Day' : '');
};

const generateId = () => travels.length ? Math.max(...travels.map(({ id }) => id)) + 1 : 1;


const renderTravelList = () => {
  let html = '';

  travels.forEach(({ id, title, place, startDate, endDate }) => {
    const generateDday = startDate => {
      let dDay = 0;
      let today = new Date();
      today = today.getTime();
      dDay = new Date(startDate).getTime();
      dDay = Math.ceil((dDay - today) / 86400000) + 1;
      return dDay > 0 ? `D-${dDay}` : (dDay === 0 ? 'D-Day' : '');
    };

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
  await axios.delete(`/travels/${id}`);
  travels = travels.filter((travel) => travel.id !== +id);
  renderTravelList();

  $alertPopupBg.style.display = 'none';
  $alertPopup.style.display = 'none';
};

// time line
const sortTimeline = schedules => {
  const timelineBlocks = $scheduleList.querySelectorAll('.schedule');
  let i = 0;

  console.log(schedules);
  timelineBlocks.forEach(block => {
    const hhFrom = +schedules[i].timeFrom.split(':')[0];
    const mmFrom = +schedules[i].timeFrom.split(':')[1];
    const hhTo = +schedules[i].timeTo.split(':')[0];
    const mmTo = +schedules[i].timeTo.split(':')[1];
    const mmDiff = mmFrom > mmTo ? 60 - (mmFrom - mmTo) : mmTo - mmFrom;
    const hhDiff = mmFrom > mmTo ? hhTo - hhFrom - 1 : hhTo - hhFrom;

    block.style.top = `${(75 * (hhFrom - 7)) + ((75 / 6) * (mmFrom / 10))}px`;
    block.style.height = `${(75 * (hhDiff)) + ((75 / 6) * (mmDiff / 10))}px`;

    i++;
  });
};

const renderMonthYear = (month, year) => {
  const $monthYearBox = document.querySelector('#main-calendar > h2');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  $monthYearBox.textContent = `${months[month - 1]}, ${year}`;
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
    const year = travel.split('/')[0];
    const month = travel.split('/')[1];
    const date = today.getDate();
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const day = dayNames[today.getDay()];

    html += `<li class="date-item">
        <div class="day ${year} ${month}">${date}</div>
        <div class="week ${year} ${month}">${day}</div>
      </li>`;
  });

  $dateList.innerHTML = html;
  $dateList.firstElementChild.classList.add('active');
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

const getSchedules = async travelId => {
  const month = $dateList.querySelector('.active').firstElementChild.classList[2];
  const date = $dateList.querySelector('.active').firstElementChild.textContent;
  const { data } = await axios.get(`/schedules?travelId=${travelId}&date=${month}/${date}`);
  schedules = data;

  renderTimeline(schedules);
};

const addSchedule = async () => {
  const date = `${$month.value}/${$date.value}`;
  const timeFrom = `${$startHour.value}:${$startMin.value}`;
  const timeTo = `${$endHour.value}:${$endMin.value}`;
  const place = $inputSchedulePlace.value;
  const detail = $inputScheduleDetail.value;

  const { data } = await axios.post('/schedules', { travelId, date, timeFrom, timeTo, place, detail });
  schedules = [data, ...schedules];

  closeSchedulePopup();
  renderTimeline(schedules);
  resetSchedulePopup();
};

const tabDate = target => {
  if (target.nodeName === 'LI') {
    const year = target.firstElementChild.classList[1];
    const month = target.firstElementChild.classList[2];
    renderMonthYear(month, year);
  }

  if (target.nodeName === 'DIV') {
    const year = target.classList[1];
    const month = target.classList[2];
    renderMonthYear(month, year);
  }

  getSchedules(travelId);
};

const toggleActiveDate = target => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

const removeSchedule = async (id) => {
  await axios.delete(`/schedules/${id}`);
  schedules = schedules.filter((schedule) => schedule.id !== parseInt(id));
  renderTimeline(schedules);
  
  $timeAlertPopupBg.style.display = 'none';
  $timelineAlertPopup.style.display = 'none';
};

const goToTimeline = async target => {
  if (!target.matches('travel-list > em') && !target.matches('travel-list > h2') && !target.matches('.travel-list > li') && !target.matches('travel-list > span') ) return;

  travelId = target.id;
  const timeline = document.getElementById('main-calendar');
  const home = document.getElementById('main-home');
  const { data: { startDate, endDate }} = await axios.get(`/travels/${travelId}`);
  // const month = startDate.split('/')[1];
  // const year = startDate.split('/')[0];

  timeline.classList.add('main-view');
  home.classList.remove('main-view');

  renderDateBox(startDate, endDate);
  getSchedules(travelId);
  renderMonthYear(startDate.split('/')[1], startDate.split('/')[0]);
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

  const { data } = await axios.post('/travels', { id: newId, title, place, startDate, endDate });
  travels = [data, ...travels];

  closeTravelPopup();
  renderTravelList();
  resetTravelPopup();
};

$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));
$dateList.addEventListener('click', ({ target }) => tabDate(target));

$travelList.addEventListener('click', ({ target }) => goToTimeline(target));

$travelList.onclick = ({ target }) => {
  if (!target.matches('.travel-list > li > .travel-remove-btn')) return
  const id = target.parentNode.id;

  $alertPopupBg.style.display = 'block';
  $alertPopup.style.display = 'block';

  $alertDeleteBtn.addEventListener('click', () => removeTravel(id));
};

$alertCancleBtn.onclick = () => {
  $alertPopupBg.style.display = 'none';
  $alertPopup.style.display = 'none';
};

$scheduleList.onclick = ({ target }) => {
  if (!target.matches('.schedule-list > li > .remove-btn')) return
  const scheduleId = target.parentNode.id.split('-')[1]

  $timeAlertPopupBg.style.display = 'block';
  $timelineAlertPopup.style.display = 'block';

  $timelineDeleteBtn.addEventListener('click', () => removeSchedule(scheduleId));
};

$timelineCancleBtn.onclick = () => {
  $timeAlertPopupBg.style.display = 'none';
  $timelineAlertPopup.style.display = 'none';
};