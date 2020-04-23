import { $startHour, $startMin, $endHour, $endMin, $startDate, $endDate } from './main.js'

const $travelPopupInput = document.querySelectorAll('.new-travel-popup input');
const $travelPopupSelect = document.querySelectorAll('.new-travel-popup select');
const $travelHiddenBtn = document.querySelector('.add-travel-btn-hidden');

const $schedulePopupInput = document.querySelectorAll('.new-schedule-popup input');
const $schedulePopupSelect = document.querySelectorAll('.new-schedule-popup select');
const $scheduleHiddenBtn = document.querySelector('.add-schedule-btn-hidden');

const $timeWarningText = document.querySelector('#end-warning-label');
const $dateWarningText = document.querySelector('#newend-warning-label');

const warnTime = () => {
  const start = ($startHour.value * 60) + $startMin.value;
  const end = ($endHour.value * 60) + $endMin.value;
  const isValid = end - start >= 0;

  $timeWarningText.style.display = isValid ? 'none' : 'block';
  return isValid;
};

const warnDate = () => {
  const start = new Date(`${$startYear.value}/${$startMonth.value}/${$startDate.value}`);
  const end = new Date(`${$endYear.value}/${$endMonth.value}/${$endDate.value}`);
  const isValid = end.getTime() - start.getTime() > 0;

  $dateWarningText.style.display = isValid ? 'none' : 'block';
  return isValid;
};

function actBtn() {
  const arr = [];
  const arr2 = [];
  const isValid = warnDate();
  $travelPopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $travelPopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  $travelHiddenBtn.style.display = 'block';
  if (![...arr, ...arr2].every(arr => arr) && !isValid) return;
  $travelHiddenBtn.style.display = 'none';
}

$travelPopupInput.forEach(input => {
  input.addEventListener('blur', actBtn);
  input.addEventListener('keyup', actBtn);
});

$travelPopupSelect.forEach(select => {
  select.addEventListener('change', actBtn);
});


function actScheduleBtn() {
  $scheduleHiddenBtn.style.display = 'block';
  const arr = [];
  const arr2 = [];
  const isValid = warnTime();

  $schedulePopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $schedulePopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  if (![...arr, ...arr2].every(arr => arr)) return;
  if (!isValid) return;

  $scheduleHiddenBtn.style.display = 'none';
}

$schedulePopupInput.forEach(input => {
  input.addEventListener('blur', actScheduleBtn);
  input.addEventListener('keyup', actScheduleBtn);
});

$schedulePopupSelect.forEach(select => {
  select.addEventListener('change', actScheduleBtn);
});
