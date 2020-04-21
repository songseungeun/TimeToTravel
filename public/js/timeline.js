// state
let travels = [];

// DOMs
const $dateList = document.querySelector('.date-list');
const $scheduleList = document.querySelector('.schedule-list');

// functions
const toggleActiveDate = target => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

const sortTimeline = travel => {
  const schedules = $scheduleList.querySelectorAll('.schedule');

  schedules.forEach(schedule => {
    const id = schedule.id[1] - 1;

    schedule.style.top = `${75 * (travel[id].timeFrom - 7)}px`;
    schedule.style.height = `${75 * (travel[id].timeTo - travel[id].timeFrom)}px`;
  });
};

const render = () => {
  let html = '';
  const travel = travels[0].schedule;

  travel.forEach(({ id, timeFrom, place, detail }) => {
    html += `<li class="schedule" id="s${id}">
            <div class="time">${timeFrom}</div>
            <div class="place">${place}</div>
            <div class="detail">${detail}</div>
            <div class="remove-btn">X</div>
          </li>`;
  });

  $scheduleList.innerHTML = html;
  sortTimeline(travel);
};

const getSchedules = async () => {
  const { data } = await axios.get('/travels');
  travels = data;
  render();
};

// events
window.onload = getSchedules;

$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));

// export
export { getSchedules };