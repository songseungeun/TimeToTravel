const $newScheduleBtn = document.querySelector('.new-schedule-btn');
// const $newSchedulePopUp = document.querySelector('.new-schedule-popup');

const $monthSelect = document.querySelector('.month-select');
const $option = document.createElement('option');


function printMonth() {
  const month = Array.from({ length: 13 }, function (v, i) { return i; });
  month.splice(0, 1);
  console.log(month);
  month.forEach(monthItem => {
    $monthSelect.appendChild($option);
    $option.setAttribute('value', monthItem);
    $option.textContent = monthItem;
  });
}


$newScheduleBtn.addEventListener('click', printMonth);
