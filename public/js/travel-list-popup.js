<<<<<<< HEAD
const $newScheduleBtn = document.querySelector('.new-schedule-btn');
const $newSchedulePopUp = document.querySelector('.new-schedule-popup');
const $popupBg = document.querySelector('.popup-bg');
const $addScheduleBtn = document.querySelector('.add-schedule-btn');
const $popupRemoveBtn = document.querySelector('.popup-remove-btn');

const $monthSelect = document.querySelector('#month-select');
const $dateSelect = document.querySelector('#date-select');
const $startHourSelect = document.querySelector('#start-hour-select');
const $startMinSelect = document.querySelector('#start-min-select');
const $endHourSelect = document.querySelector('#end-hour-select');
const $endMinSelect = document.querySelector('#end-min-select');
=======
// DOMs
const $addScheduleBtn = document.querySelector('.add-schedule-btn');
const $newScheduleBtn = document.querySelector('.new-schedule-btn');
const $newSchedulePopUp = document.querySelector('.new-schedule-popup');
const $popupBg = document.querySelector('.popup-bg');
const $popupRemoveBtn = document.querySelector('.popup-remove-btn');

const $monthSelect = document.querySelector("#month-select");
const $dateSelect = document.querySelector("#date-select");
const $startHourSelect = document.querySelector("#start-hour-select");
const $startMinSelect = document.querySelector("#start-min-select");
const $endHourSelect = document.querySelector("#end-hour-select");
const $endMinSelect = document.querySelector("#end-min-select");
>>>>>>> 81a03bfbe08de647c5785ac627c1e2aef899ae30

const $inputPlace = document.querySelector('#schedule-input-place');
const $inputDetail = document.querySelector('#schedule-input-detail');
const $selectDateWarning = document.querySelector('#date-warning-label');
const $selectStartWarning = document.querySelector('#start-warning-label');
const $selectEndWarning = document.querySelector('#end-warning-label');
const $inputDetailWarning = document.querySelector('#detail-warning-label');
const $inputPlaceWarning = document.querySelector('#place-warning-label');

const closePopup = () => {
  $newSchedulePopUp.style.display = 'none';
  $popupBg.style.display = 'none';
};

//+버튼 누르면 팝업창 오픈
<<<<<<< HEAD
function openPopup() {
=======
$newScheduleBtn.onclick = () => {
>>>>>>> 81a03bfbe08de647c5785ac627c1e2aef899ae30
  $newSchedulePopUp.style.display = 'block';
  $popupBg.style.display = 'block';
};

$newScheduleBtn.addEventListener('click', openPopup);

//x버튼을 누르면 팝업창 종료
$popupRemoveBtn.addEventListener('click', closePopup);

window.onclick = ({ target }) => {
  if (target !== $popupBg || target === $newScheduleBtn) return;
  closePopup();
};

//경고문구
//FIXME: &&나 ||로 세트인 아이들을 묶어줄 수 없는지?

function showWarning(element, defaultValue, warningElement) {
  if (element.value === defaultValue) {
    warningElement.classList.remove('text-hidden');
    return 1;
  } else {
    warningElement.classList.add('text-hidden');
    return 0;
  }
}

$addScheduleBtn.onclick = () => {
  let errorCount = 0;
  errorCount += showWarning($inputPlace, '', $inputPlaceWarning);
  errorCount += showWarning($inputDetail, '', $inputDetailWarning);
  errorCount += showWarning($monthSelect, 'default', $selectDateWarning);
  errorCount += showWarning($dateSelect, 'default', $selectDateWarning);
  errorCount += showWarning(
    $startHourSelect,
    'start-default',
    $selectStartWarning
  );
  errorCount += showWarning(
    $startMinSelect,
    'start-default',
    $selectStartWarning
  );
  errorCount += showWarning($endHourSelect, 'end-default', $selectEndWarning);
  errorCount += showWarning($endMinSelect, 'end-default', $selectEndWarning);

  // 서버로 전송하는 로직

  if (errorCount === 0) {
    console.log('successful');
  } else {
    console.log('validation error');
  }
};

