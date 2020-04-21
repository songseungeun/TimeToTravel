const $monthSelect = document.querySelector('.month-select');
const $option = document.createElement('option');


$monthSelect.onclick = () => {
  console.log('month');
  $monthSelect.appendChild($option);
  $monthSelect.setAttribute('value', 'a');
};
