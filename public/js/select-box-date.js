const $newScheduleBtn = document.querySelector('.new-schedule-btn');
const $newTravelBtn = document.querySelector('.new-travel-btn');
const $newInfoBtn = document.querySelector('.new-info-btn');
const $newTravelPopup = document.querySelector('.new-travel-popup');
const $newSchedulePopup = document.querySelector('.new-schedule-popup');
const $newInfoPopup = document.querySelector('.new-travel-popup');

const $dateSelects = document.querySelectorAll('.date-select');
const $yearSelects = document.querySelectorAll('.year-select');
const $monthSelects = document.querySelectorAll('.month-select');
const $hourSelects = document.querySelectorAll('.hour-select');
const $minuteSelects = document.querySelectorAll('.min-select');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

function printYearMonth() {

  let yearArr = Array.from({ length: 5 }, function (v, i) { return year + i });
  $yearSelects.forEach(yearSelect => {
    yearArr.forEach((element, key) => {
      yearSelect[key] = new Option(`${element} 년`, element);
    });
  });

  let monthArr = Array.from({ length: 13 }, function (v, i) { return i; });
  monthArr.splice(0, 1);

  let i = 0;

  $monthSelects.forEach(monthSelect => {
    monthArr.forEach((element, key) => {
      monthSelect[key] = new Option(`${element} 월`, element);
      if (monthSelect.id === 'start-month-select') {
        if (+monthSelect.options[i].value === month) monthSelect.options[month - 1].setAttribute('selected','selected');
      }
      i++;
    });
  });

  let date = 0;
  const monthDate = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  date = monthDate[month - 1];

  let dateArr = Array.from({ length: date + 1 }, function (v, i) { return i; });
  dateArr.splice(0, 1);

  $dateSelects.forEach(dateSelect => {
    dateArr.forEach((element, key) => {
      dateSelect[key] = new Option(`${element} 일`, element);

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

$newTravelBtn.addEventListener('click', printYearMonth);
$newTravelPopup.addEventListener('change', printDate);

$newInfoBtn.addEventListener('click', printYearMonth);
$newInfoPopup.addEventListener('change', printDate);
