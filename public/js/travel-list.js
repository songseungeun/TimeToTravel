// import
import { getSchedules } from "./timeline.js";

// state
let travels = [];
let timelineOf = "";

// DOMs
const $travelList = document.querySelector(".travel-list");
const $newTravelBtn = document.querySelector(".new-travel-btn");
const $addTravelBtn = document.querySelector(".add-travel-btn");
const $popupBg = document.querySelector(".new-travel-popup-bg");
const $popupRemove = document.querySelector(".new-travel-popup-remove-btn");
const $newTravelPopup = document.querySelector(".new-travel-popup");


const $inputTitle = document.querySelector(".input-title");
const $inputPlace = document.querySelector(".input-place");
const $inputSpotWarning = document.querySelector('#spot-warning-label')
const $inputlocationWarning = document.querySelector('#location-warning-label')
const $selectNewWarning = document.querySelector('#newstart-warning-label')
const $selectEndWarning = document.querySelector('#newend-warning-label')


const $startYear = $newTravelPopup.querySelector("#start-year-select");
const $startMonth = $newTravelPopup.querySelector("#start-month-select");
const $startDate = $newTravelPopup.querySelector("#start-day-select");
const $endYear = $newTravelPopup.querySelector("#end-year-select");
const $endMonth = $newTravelPopup.querySelector("#end-month-select");
const $endDate = $newTravelPopup.querySelector("#end-day-select");



// functions
const closeTravelPopup = () => {
  $popupBg.style.display = "none";
  $newTravelPopup.style.display = "none";
};

const openTravelPopup = () => {
  $popupBg.style.display = "block";
  $newTravelPopup.style.display = "block";
};


//경고문구
function showWarning(element, defaultValue, warningElement) {
  if (element.value === defaultValue) {
    warningElement.classList.remove('text-hidden');
    return 1;
  } else {
    warningElement.classList.add('text-hidden');
    return 0;
  }
}

//TODO: 여행이름/여행날짜/시작날짜/종료날짜

$addTravelBtn.onclick = () => {
  let errorCount = 0;
  errorCount += showWarning($inputTitle, '', $inputSpotWarning);
  errorCount += showWarning($inputPlace, '', $inputlocationWarning);
  errorCount += showWarning($startYear, 'default', $selectNewWarning);
  errorCount += showWarning($startMonth, 'default', $selectNewWarning);
  errorCount += showWarning($startDate, 'default', $selectNewWarning);
  errorCount += showWarning($endYear, 'default', $selectEndWarning);
  errorCount += showWarning($endMonth, 'default', $selectEndWarning);
  errorCount += showWarning($endDate, 'default', $selectEndWarning);

  // 서버로 전송하는 로직

  if (errorCount === 0) {
    console.log('successful');
  } else {
    console.log('validation error');
  }
};


const generateId = () =>
  travels.length ? Math.max(...travels.map(({ id }) => id)) + 1 : 1;

const renderTravelList = () => {
  let html = "";

  travels.forEach(({ id, title, place, startDate, endDate }) => {
    html += ` <li id=${id}>
          <h2>${title}</h2>
          <em>D-${startDate}</em>
          <div class="travel-info">
            <span class="travel-place">${place}</span>
            <span class="travel-date">${startDate} ~ ${endDate}</span>
          </div>
          <div class="travel-remove-btn">X</div>
        </li>`;
  });

  $travelList.innerHTML = html;
};

const getTravels = async () => {
  const { data } = await axios.get("/travels");
  travels = data;
  renderTravelList();
};

const checkValues = (target) => {
  if (target.nodeName === "INPUT")
    target.nextElementSibling.style.display =
      target.value === "" ? "block" : "none";
  // if (target.nodeName === 'SELECT') {}
};
// console.log($startDate.nodeName)

const removeTravel = async (target) => {
  if (!target.matches(".travel-list > li > .travel-remove-btn")) return;
  const id = target.parentNode.id;

  await axios.delete(`/travels/${id}`);
  travels = travels.filter((travel) => travel.id !== +id);
  renderTravelList();
};

const goToTimeline = (target) => {
  if (!target.matches(".travel-list > li")) return;

  timelineOf = target.id;
  getSchedules(timelineOf);
};

// event handlers
window.onload = getTravels;

$newTravelBtn.addEventListener("click", openTravelPopup);
$popupBg.addEventListener("click", closeTravelPopup);
$popupRemove.addEventListener("click", closeTravelPopup);

[...$newTravelPopup.children].forEach((child) =>
  child.addEventListener("change", ({ target }) => checkValues(target))
);

// $addTravelBtn.onclick = async () => {
//   const isBlank =
//     [...$newTravelPopup.children].filter((child) => child.value === "")
//       .length !== 0;
//   const title = $inputTitle.value.trim();
//   const place = $inputPlace.value.trim();
//   const startDate = `${$startYear.value}/${$startMonth.value}/${$startDate.value}`;
//   const endDate = `${$endYear.value}/${$endMonth.value}/${$endDate.value}`;

//   console.log($startYear.firstElementChild.selected);
//   if (isBlank) return;

//   const { data } = await axios.post("/travels", {
//     id: generateId(),
//     title,
//     place,
//     startDate,
//     endDate,
//   });
//   travels = [data, ...travels];

//   closeTravelPopup();
//   renderTravelList();
  

//   $inputTitle.value = "";
//   $inputPlace.value = "";
// };

// $travelList.addEventListener("click", ({ target }) => removeTravel(target));
// $travelList.addEventListener("click", ({ target }) => goToTimeline(target));

// // export
// export { timelineOf };
