const $travelPopupInput = document.querySelectorAll('.new-travel-popup input');
const $travelPopupSelect = document.querySelectorAll('.new-travel-popup select');
const $travelHiddenBtn = document.querySelector('.add-travel-btn-hidden');

const $schedulePopupInput = document.querySelectorAll('.new-schedule-popup input');
const $schedulePopupSelect = document.querySelectorAll('.new-schedule-popup select');
const $scheduleHiddenBtn = document.querySelector('.add-schedule-btn-hidden');

const $infoPopupInput = document.querySelectorAll('.new-info-popup input');
const $infoPopupSelect = document.querySelectorAll('.new-info-popup select');
const $infoHiddenBtn = document.querySelector('.add-info-btn-hidden');

const $info2PopupInput = document.querySelectorAll('.new-info-popup2 input');
const $info2PopupSelect = document.querySelectorAll('.new-info-popup2 select');
const $info2HiddenBtn = document.querySelector('.add-info2-btn-hidden');

function actBtn() {
  const arr = [];
  const arr2 = [];
  $travelPopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $travelPopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  $travelHiddenBtn.style.display = 'block';
  if (![...arr, ...arr2].every(arr => arr)) return;
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

function actInfoBtn() {
  const arr = [];
  const arr2 = [];
  $infoPopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $infoPopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  $infoHiddenBtn.style.display = 'block';
  if (![...arr, ...arr2].every(arr => arr)) return;
  $infoHiddenBtn.style.display = 'none';
}

$infoPopupInput.forEach(input => {
  input.addEventListener('blur', actInfoBtn);
  input.addEventListener('keyup', actInfoBtn);
});

$infoPopupSelect.forEach(select => {
  select.addEventListener('change', actInfoBtn);
});


function actInfo2Btn() {
  const arr = [];
  const arr2 = [];
  $info2PopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $info2PopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  $info2HiddenBtn.style.display = 'block';
  if (![...arr, ...arr2].every(arr => arr)) return;
  $info2HiddenBtn.style.display = 'none';
}

$info2PopupInput.forEach(input => {
  input.addEventListener('blur', actInfo2Btn);
  input.addEventListener('keyup', actInfo2Btn);
});

$info2PopupSelect.forEach(select => {
  select.addEventListener('change', actInfo2Btn);
});
