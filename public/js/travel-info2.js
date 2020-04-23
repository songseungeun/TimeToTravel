let airlines = [];
let lodgings = [];

//DOM
const $airlineTicket = document.querySelector('.airline-ticket');
const $airlineSchedule = document.querySelector('.airline-schedule');
const $airlineScheduleDetail = document.querySelector('.airline-schedule-detail');
const $airlineScheduleList = document.querySelector('.airline-schedule');
const $lodgingScheduleList = document.querySelector('.lodging-schedule');

const $airlinePopupBg = document.querySelector('.airlineBg');
const $hotelPopup = document.querySelector('.new-info-popup2');
const $airlinePopup = document.querySelector('.new-info-popup');
const $airlineAddBtn = document.querySelector('.airlineAddBtn');
const $airlinePopupRemove = document.querySelector('.airlineRemoveBtn');
const $airlineMonthSelect = document.querySelector('#airline-month-select');

const $hotelBtn = document.querySelector('.hotel-btn');
const $airlineBtn = document.querySelector('.airline-btn');
const $hotelPopupRemove = document.querySelector('.hotelRemoveBtn');
const $hotelAddBtn = document.querySelector('.hotelAddBtn ');
const $hotelPopupBg = document.querySelector('.hotelBg');
const $departureSec = document.querySelector('.departure-section');
const $arrivalSec = document.querySelector('.arrival-section');

const $depMonthSelect = document.querySelector('#airline-month-select');
const $depDaySelcet = document.querySelector('#airline-day-select');
const $inputAirline = document.querySelector('.input-airlines');
const $depHourSelect = document.querySelector('#airline-hour-select');
const $depMinSelect = document.querySelector('#airline-min-select');
const $inputDepAirport = document.querySelector('.dep-airlines');
const $depArrMinSelect = document.querySelector('#dep-airline-min-select');
const $depArrHourSelect = document.querySelector('#dep-airline-hour-select');
const $inputDepArrAirport = document.querySelector('.arr-airlines');
const $travelInfoList = document.querySelector('.start-airline');
const $selectWrappers = document.querySelectorAll('.select-wrapper');

const $newInfoBtn = document.querySelector('.new-info-btn');
const $allMoreBtn = document.querySelector('.detail-btn-wrapper');

// RENDER
// const generateId = () => (travels.length ? Math.max(...travels.map(({ id }) => id)) + 1 : 1);

// const sortTravels = travels => {
//   travels.sort((trav1, trav2) => (trav2.startDate > trav1.startDate ? 1 : trav1.startDate > trav2.startDate ? -1 : 0));
// };

const renderTravelList = () => {
  let html = '';
  let bg = 0;

  $travelNoneText.style.display = travels.length === 0 ? 'block' : 'none';

  sortTravels(travels);

  travels.forEach(({ id, title, place, startDate, endDate }) => {
    bg++;
    html += ` <li id=t-${id} class="bg-${bg % 4}">
          <h2>${title}</h2>
          <em>${generateDday(startDate)}</em>
          <div class="travel-info">
            <span class="travel-place">${place}</span>
            <span class="travel-date">${startDate} ~ ${endDate}</span>
          </div>
          <button class="travel-remove-btn">X</button>
        </li>`;
  });

  $travelList.innerHTML = html;
};

const getTravels = async () => {
  const { data } = await axios.get('/travels');
  travels = data;

  renderTravelList();
};

const removeTravel = async removeTId => {
  await axios.delete(`/travels/${removeTId}`);
  travels = travels.filter(travel => travel.id !== +removeTId);
  renderTravelList();

  $alertPopupBg.style.display = 'none';
  $alertPopup.style.display = 'none';
};



//EVENT HANDLER

// MODAL OPEN

function openDetailBtn() {
  $airlineBtn.classList.toggle('btn-act');
  $hotelBtn.classList.toggle('btn-act2');
}

function closeDetailBtn() {
  $airlineBtn.classList.remove('btn-act');
  $hotelBtn.classList.remove('btn-act2');
}


$newInfoBtn.addEventListener('click', openDetailBtn);
// $allMoreBtn.addEventListener('mouseenter', openDetailBtn);
$allMoreBtn.addEventListener('mouseleave', closeDetailBtn);

//HOTEL정보 입력 MODAL
$hotelBtn.onclick = () => {
  $hotelPopup.style.display = 'block';
  $hotelPopupBg.style.display = 'block';
};

const hotelClosePopup = () => {
  $hotelPopup.style.display = 'none';
  $hotelPopupBg.style.display = 'none';
};

$hotelPopupBg.onclick = () => {
  hotelClosePopup();
};

$hotelPopupRemove.onclick = () => {
  $hotelPopup.style.display = 'none';
  $hotelPopupBg.style.display = 'none';
};

//비행기 정보 입력 MODAL
$airlineBtn.onclick = () => {
  $airlinePopup.style.display = 'block';
  $airlinePopupBg.style.display = 'block';
};

$airlinePopupRemove.onclick = () => {
  $airlinePopup.style.display = 'none';
  $airlinePopupBg.style.display = 'none';
};

const airClosePopup = () => {
  $airlinePopupBg.style.display = 'none';
  $airlinePopup.style.display = 'none';
};

$airlinePopupBg.onclick = () => {
  airClosePopup();
};
