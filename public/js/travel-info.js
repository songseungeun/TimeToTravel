let airlines = [];
let lodgings = [];
let travelId = '';

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
const $hotelAddBtn = document.querySelector('.hotelAddBtn');
const $hotelPopupBg = document.querySelector('.hotelBg');
const $departureSec = document.querySelector('.departure-section');
const $arrivalSec = document.querySelector('.arrival-section');

const $depMonthSelect = document.querySelector('#airline-month-select');
const $depDaySelect = document.querySelector('#airline-day-select');
const $inputAirline = document.querySelector('.input-airlines');
const $depHourSelect = document.querySelector('#airline-hour-select');
const $depMinSelect = document.querySelector('#airline-min-select');
const $inputDepAirport = document.querySelector('.dep-airlines');
const $depArrMinSelect = document.querySelector('#dep-airline-min-select');
const $depArrHourSelect = document.querySelector('#dep-airline-hour-select');
const $inputDepArrAirport = document.querySelector('.arr-airlines');
const $selectWrappers = document.querySelectorAll('.select-wrapper');
const $inputHotelName = document.querySelector('.input-title');
const $inputHotelPlace = document.querySelector('.input-place');
const $inputHotelSite = document.querySelector('.input-site');

const $newInfoBtn = document.querySelector('.new-info-btn');
const $allMoreBtn = document.querySelector('.detail-btn-wrapper');

//RENDER
const renderAirlineInfo = () => {
  console.log(airlines);
  let html = '';

  airlines.forEach(({ travelId, type, id, date, airplaneName, departureTime, departureAirport, arrivalTime, arrivalAirport }) => {
    html += `<li id=${travelId}-${id} class="airline-schedule-detail clearfix">
    <div class="airline-info1 airline-departure">
      <em>${type === 'departure' ? '출발' : '도착'}</em>
    </div>
    <div class="airline-info2 departure-info-date">
      <span class="date">${date}</span>
      <span class="airlines">${airplaneName}</span>
    </div>
    <div class="airline-departure departure-airline-time">
      <span class="time">${departureTime}</span>
      <span class="airport">${departureAirport}</span>
    </div>
    <div class="airline-arrival departure-arrival-time">
      <span class="time">${arrivalTime}</span>
      <span class="airport">${arrivalAirport}</span>
    </div>
  </li>`;
  });

  $airlineSchedule.innerHTML = html;
};

export const getAirlineData = async () => {
  const { data } = await axios.get('/airlines');
  airlines = data;

  renderAirlineInfo();
};

const resetAirlinePopup = () => {
  const selects = [...$selectWrappers].map(select => select.firstElementChild);
  selects.forEach(child => (child.firstElementChild.selected = 'selected'));

  $inputAirline.value = '';
  $inputDepAirport.value = '';
  $inputDepArrAirport.value = '';
};

const closeAirlinePopup = () => {
  $airlinePopup.style.display = 'none';
  $airlinePopupBg.style.display = 'none';
  resetAirlinePopup();
};

//post
const addAirlineInfo = async () => {
  const startMonth = `${$depMonthSelect.value}/${$depDaySelect.value}`;
  const inputAirName = $inputAirline.value.trim();
  const departureTime = `${$depHourSelect.value}:${$depMinSelect.value}`;
  const departureAirport = $inputDepAirport.value.trim();
  const arrivalTime = `${$depArrHourSelect.value}:${$depArrMinSelect.value}`;
  const arrivalAirport = $inputDepArrAirport.value.trim();

  const { data } = await axios.post('/airlines', { travelId, type: 'departure', date: startMonth, airplaneName: inputAirName, departureTime, departureAirport, arrivalTime, arrivalAirport });
  airlines = [data, ...airlines];

  closeAirlinePopup();
  renderAirlineInfo(airlines);
  resetAirlinePopup();
};

const renderLodgingInfo = () => {
  let html = '';

  lodgings.forEach(({ id, hotelName, hotelPlace, hotelsite }) => {
    html += `<li class="hotel-reservation lodging-name">
            <h3>${id}</h3>
            <span class="hotel-name">${hotelName}</span>
            <span class="hotel-place">${hotelPlace}</span>
            <span class="hotel-site">${hotelsite}</span>
          </li>`;
  });
  $lodgingScheduleList.innerHTML = html;
};

export const getLodgingData = async () => {
  const { data } = await axios.get('/lodgings');
  lodgings = data;
  console.log(lodgings);

  renderLodgingInfo();
};

const resetLodgingPopup = () => {
  $inputHotelName.value = '';
  $inputHotelPlace.value = '';
  $inputHotelSite.value = '';
};

const closeLodgingPopup = () => {
  $hotelPopup.style.display = 'none';
  $hotelPopupBg.style.display = 'none';
  resetLodgingPopup();
};

const generateId = () => {
  return lodgings.length ? Math.max(...lodgings.map(({ id }) => id)) + 1 : 1;
};

//post
const addHotelInfo = async () => {
  console.log(lodgings);
  const lodgingNumber = generateId();
  const hotelName = $inputHotelName.value.trim();
  const hotelPlace = $inputHotelPlace.value.trim();
  const hotelsite = $inputHotelSite.value.trim();

  const { data } = await axios.post('/lodgings', { id: lodgingNumber, hotelName, hotelPlace, hotelsite });
  lodgings = [...lodgings, data];

  closeLodgingPopup();
  renderLodgingInfo(lodgings);
  resetLodgingPopup();
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

//TODO: 등록 버튼튕김 처리
$airlineAddBtn.onclick = () => {
  addAirlineInfo();
  // $airlineBg.style.display = 'none';
  // $airlinePopup.style.display = 'none';
};

$hotelAddBtn.onclick = () => {
  console.log(lodgings);
  addHotelInfo();
};

$airlineAddBtn.onclick = () => {
  addAirlineInfo();
};
