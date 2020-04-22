const $inputTitle = document.querySelector('.input-title');

const $spotWarningLabel = document.querySelector('#spot-warning-label');

const $hiddenBtn = document.querySelector('.add-travel-btn-hidden');
const $addTravelBtn = document.querySelector('.add-travel-btn');

// function viewWarningText() {
//   // console.log($inputTitle.value === '');
//   if ($inputTitle.value === '') $spotWarningLabel.classList.add('warnning-act');
// }


// $addTravelBtn.addEventListener('click', viewWarningText);

// function viewWarnText() {
//   if ($inputTitle.value === '') $spotWarningLabel.classList.add('warnning-act');
// }

// function hiddenWarnText() {
//   if ($inputTitle.value !== '') $spotWarningLabel.classList.remove('warnning-act');

// }

// $inputTitle.addEventListener('blur', viewWarnText);
// $inputTitle.addEventListener('keydown', hiddenWarnText);

const $travelPopupInput = document.querySelectorAll('.new-travel-popup input');
const $travelPopupSelect = document.querySelectorAll('.new-travel-popup select');

function actBtn({ target }) {
  const arr = [];
  const arr2 = [];
  $travelPopupInput.forEach(input => {
    arr.push(input.value !== '');
  });
  $travelPopupSelect.forEach(select => {
    arr2.push(select.value !== '0');
  });

  if (![...arr, ...arr2].every(arr => arr)) return;
  $hiddenBtn.style.display = 'none';
}

$travelPopupInput.forEach(input => {
  input.addEventListener('blur', actBtn);
  // input.addEventListener('keyup', actBtn);
});
$travelPopupSelect.forEach(select => {
  select.addEventListener('change', actBtn);
  // input.addEventListener('keyup', actBtn);
});

// console.log($travelPopupInput);
