// DOMs
const $dateList = document.querySelector('.date-list');

// functions
const toggleActiveDate = target => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

// event handlers
$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));
