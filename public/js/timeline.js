// import 
import { timelineOf } from './travel-list.js';

// state
let schedules = [];

// DOMs
const $dateList = document.querySelector('.date-list');
const $scheduleList = document.querySelector('.schedule-list');

// functions
const toggleActiveDate = target => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

// const sortTimeline = travel => {
//   const schedules = $scheduleList.querySelectorAll('.schedule');

//   schedules.forEach(schedule => {
//     const id = schedule.id[1] - 1;

//     schedule.style.top = `${75 * (travel[id].timeFrom - 7)}px`;
//     schedule.style.height = `${75 * (travel[id].timeTo - travel[id].timeFrom)}px`;
//   });
// };

const renderTimeline = () => {
  let html = '';
  const dailySchedule = '';

  // dailySchedule.forEach(({ id, timeFrom, place, detail }) => {
  //   html += `<li class="schedule" id="s${id}">
  //           <div class="time">${timeFrom}</div>
  //           <div class="place">${place}</div>
  //           <div class="detail">${detail}</div>
  //           <div class="remove-btn">X</div>
  //         </li>`;
  // });

  $scheduleList.innerHTML = html;
  // sortTimeline(travel);
};

const getSchedules = async () => {
  const { data } = await axios.get(`/schedules/${timelineOf}`);
  schedules = data;
  renderTimeline();
  console.log(data);
};

const removeSchedule = async target => {
  if (!target.matches('.schedule-list > li > .remove-btn')) return;
  const id = target.parentNode.id;

  const { data } = await axios.delete(`/schedules/${id}`);
  schedules = data;
  renderTimeline();
};

// events
window.onload = getSchedules;

$dateList.addEventListener('click', ({ target }) => toggleActiveDate(target));

// $scheduleList.addEventListener('click', ({ target }) => removeSchedule(target));

// export
export { getSchedules };