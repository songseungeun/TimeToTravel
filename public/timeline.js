let travels = [];

const $dateList = document.querySelector('.date-list');
const $scheduleList = document.querySelector('.schedule-list');

const toggleActiveDate = (target) => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));

$scheduleList.onclick = ({ target }) => {
  if (!target.matches('.schedule-list > .remove-btn')) return;
  const id = target.parentNode.id;
};

const render = () => {
  let html = '';

  travels.forEach(({id, time, place, detail}) => {
    html = `<li class="schedule" id="s${id}">
            <div class="time">${time}</div>
            <div class="place">${place}}</div>
            <div class="detail">${detail}</div>
            <div class="remove-btn">X</div>
          </li>`;
  });

  $scheduleList.innerHTML = html;
};


const dataBase = axios.get('/travels')
    .then(({ data }) => travels = data)
    .then((travels) => console.log(travels))
    .catch(err => console.error(err));

