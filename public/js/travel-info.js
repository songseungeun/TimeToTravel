let airlines = [];
let lodgings = [];

const $airlineTicket = document.querySelector('.airline-ticket');
const $airlineSchedule = document.querySelector('.airline-schedule');
const $airlineScheduleDetail = document.querySelector('.airline-schedule-detail');
const $airlineScheduleList = document.querySelector('.airline-schedule');
const $lodgingScheduleList = document.querySelector('.lodging-schedule');
const $airlineBtn = document.querySelector('.airline');
const $airlineBg = document.querySelector('.airlineBg');
const $airlinePopup = document.querySelector('.new-info-popup');
const $airlineAddBtn = document.querySelector('.airlineAddBtn');
const $airlinePopupRemove = document.querySelector('.airlineRemoveBtn');
const $airlineMonthSelect = document.querySelector('#airline-month-select');

const renderAirlineInfo = () => {
  let html = '';

  airlines = airlines.forEach(({ id, type, date, airplaneName, depatureTime, departureAirport, arrivalTime, arrivalAirport }) => {
    html += `<li id=${id} class="airline-schedule-detail clearfix">
    <div class="airline-info1 airline-departure">
      <em>${type ? '출발' : '도착'}</em>
    </div>
    <div class="airline-info2 departure-info-date">
      <span class="date">${date}</span>
      <span class="airlines">${airplaneName}</span>
    </div>
    <div class="airline-departure departure-airline-time">
      <span class="time">${depatureTime}</span>
      <span class="airport">${departureAirport}</span>
    </div>
    <div class="airline-arrival departure-arrival-time">
      <span class="time">${arrivalTime}</span>
      <span class="airport">${arrivalAirport}</span>
    </div>
  </li>`;
  });

  $airlineScheduleList.innerHTML = html;
};

export const getAirlineData = async () => {
  const { data } = await axios.get('/airlines');
  airlines = data;

  renderAirlineInfo();
};

const renderLodgingInfo = () => {
  let html = '';

  lodgings = lodgings.forEach(({ lodgingNumber, hotelName, hotelPlace, hotelsite }) => {
    html += `<div class="hotel-reservation1 lodging-name">
            <h3>${lodgingNumber}</h3>
            <span class="hotel-name">${hotelName}</span>
            <span class="hotel-place">${hotelPlace}</span>
            <span class="hotel-site">${hotelsite}</span>
          </div>`;
  });
  $lodgingScheduleList.innerHTML = html;
};

export const getLodgingData = async () => {
  const { data } = await axios.get('/lodgings');
  lodgings = data;

  renderLodgingInfo();
};

$airlineBtn.onclick = () => {
  $airlineBg.style.display = 'block';
  $airlinePopup.style.display = 'block';
};

$airlinePopupRemove.onclick = () => {
  $airlineBg.style.display = 'none';
  $airlinePopup.style.display = 'none';
};

//TODO: 등록 버튼 팅김 처리
$airlineAddBtn.onclick = e => {
  console.log(e.target);
  if ($airlineMonthSelect === 'MONTH') return;
  $airlineBg.style.display = 'none';
  $airlinePopup.style.display = 'none';
};

//FIXME: 호텔이랑 비행기 순서 정리

/**
 * NOTE:
 * HTML에 OL태그 추가 필요
 */
