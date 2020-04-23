import { warnDate } from './main.js'

const $travelPopupInput = document.querySelectorAll('.new-travel-popup input');
const $travelPopupSelect = document.querySelectorAll('.new-travel-popup select');
const $travelHiddenBtn = document.querySelector('.add-travel-btn-hidden');

const $schedulePopupInput = document.querySelectorAll('.new-schedule-popup input');
const $schedulePopupSelect = document.querySelectorAll('.new-schedule-popup select');
const $scheduleHiddenBtn = document.querySelector('.add-schedule-btn-hidden');

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
  console.log(isValid);
  if (![...arr, ...arr2].every(arr => arr) && isValid) return;
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
  const arr = [];
  const arr2 = [];
  $schedulePopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $schedulePopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  $scheduleHiddenBtn.style.display = 'block';
  if (![...arr, ...arr2].every(arr => arr)) return;
  $scheduleHiddenBtn.style.display = 'none';
}

$schedulePopupInput.forEach(input => {
  input.addEventListener('blur', actScheduleBtn);
  input.addEventListener('keyup', actScheduleBtn);
});

$schedulePopupSelect.forEach(select => {
  select.addEventListener('change', actScheduleBtn);
});
