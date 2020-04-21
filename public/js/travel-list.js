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


// event handlers

$newTravelBtn.addEventListener('click', openTravelPopup);
$popupBg.addEventListener('click', closeTravelPopup);
$popupRemove.addEventListener('click', closeTravelPopup);