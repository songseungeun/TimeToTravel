let travels = [];

const $dateList = document.querySelector('.date-list');
const $scheduleList = document.querySelector('.schedule-list');

const toggleActiveDate = target => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));

$scheduleList.onclick = ({ target }) => {
  if (!target.matches('.schedule-list > .remove-btn')) return;
  const id = target.parentNode.id;
};

const getSchedules = async () => {
  const { data } = await axios.get('/travels');
  travels = data;
  console.log(travels[0].schedule);
  render();
};

const render = () => {
  let html = '';
  let travel = travels[0].schedule;
  console.log(travel);

  travel.forEach(({ id, timeFrom, place, detail }) => {
    html = `<li class="schedule" id="s${id}">
            <div class="time">${timeFrom}</div>
            <div class="place">${place}</div>
            <div class="detail">${detail}</div>
            <div class="remove-btn">X</div>
          </li>`;
  });

  $scheduleList.innerHTML = html;
};

getSchedules();
