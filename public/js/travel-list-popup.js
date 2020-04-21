const $newScheduleBtn = document.querySelector(".new-schedule-btn");
const $newSchedulePopUp = document.querySelector(".new-schedule-popup");
const $popupBg = document.querySelector(".popup-bg");
const $addScheduleBtn = document.querySelector(".add-schedule-btn");
const $popupRemoveBtn = document.querySelector(".popup-remove-btn");
const $selectDate = document.querySelector(".select-date");
const $selectStartHour = document.querySelector(".select-start-hour");

const $monthSelect = document.querySelector("#month-select");
const $dateSelect = document.querySelector("#date-select");
const $startHourSelect = document.querySelector("#start-hour-select");
const $startMinSelect = document.querySelector("#start-min-select");
const $endHourSelect = document.querySelector("#end-hour-select");
const $endMinSelect = document.querySelector("#end-min-select");
const $inputPlace = document.querySelector(".input-place");
const $inputDetail = document.querySelector(".input-detail");

const $mainSchedule = document.querySelector(".main-schedule");
const $warningText = document.querySelector(".warnning-text");

const closePopup = () => {
  $newSchedulePopUp.style.display = "none";
  $popupBg.style.display = "none";
};

//+버튼 누르면 팝업창 오픈
$newScheduleBtn.onclick = () => {
  $newSchedulePopUp.style.display = "block";
  $popupBg.style.display = "block";
};

//x버튼을 누르면 팝업창 종료
$popupRemoveBtn.addEventListener("click", closePopup);

function insertDate() {
  const $monthSelect = document.querySelector("#month-select");

  const selectValue = $monthSelect.options[$monthSelect.selectedIndex];
}

//경고 메세지
$addScheduleBtn.onclick = (e) => {
  if ($selectDate.value === "none") {
    $warningText.style.display = "block";
  }
};

//test