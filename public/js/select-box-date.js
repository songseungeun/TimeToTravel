const $newScheduleBtn = document.querySelector('.new-schedule-btn');
const $newTravelBtn = document.querySelector('.new-travel-btn');
const $newInfoBtn = document.querySelector('.new-info-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $newSchedulePopup = document.querySelector('.new-schedule-popup');
const $newInfoPopup = document.querySelector('.new-travel-popup');
// const $dateSelect = document.querySelector('.date-select');
const $monthSelects = document.querySelectorAll('.month-select');
const $hourSelects = document.querySelectorAll('.hour-select');
const $minuteSelects = document.querySelectorAll('.min-select');

function printMonth() {
  let month = Array.from({ length: 13 }, function (v, i) { return i; });
  month.splice(0, 1);
  month = ['MONTH', ...month];
  $monthSelects.forEach(monthSelect => {
    month.forEach((element, key) => {
      monthSelect[key] = new Option(element, key, true);
    });
  });
}

function printDate({ target }) {
  if (!target.matches('.month-select')) return;
  let date = 0;
  const monthDate = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  date = monthDate[target.value - 1];
  let date2 = Array.from({ length: date + 1 }, function (v, i) { return i; });
  date2.splice(0, 1);
  date2 = ['DATE', ...date2];

  date2.forEach((element, key) => {
    target.parentNode.nextElementSibling.children[0][key] = new Option(element, key, true);
  });
}

$newTravelBtn.addEventListener('click', printMonth);
$newTravelPopup.addEventListener('change', printDate);

$newInfoBtn.addEventListener('click', printMonth);
$newInfoPopup.addEventListener('change', printDate);
