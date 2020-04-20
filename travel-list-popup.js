//DOM
const $newScheduleBtn = document.querySelector(".new-schedule-btn");
const $newSchedulePopUp = document.querySelector(".new-schedule-popup");
const $popupBg = document.querySelector(".popup-bg");
const $addScheduleBtn = document.querySelector(".add-schedule-btn");
const $popupRemoveBtn = document.querySelector(".popup-remove-btn");
const $selectDate = document.querySelector(".select-date");
const $monthSelect = document.querySelector("#month-select");
const $dateSelect = document.querySelector("#date-select");
const $startHourSelect = document.querySelector("#start-hour-select");
const $startMinSelect = document.querySelector("#start-min-select");
const $endHourSelect = document.querySelector("#end-hour-select");
const $endMinSelect = document.querySelector("#end-min-select");
const $inputPlace = document.querySelector(".input-place");
const $inputDetail = document.querySelector(".input-detail");

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
//$popupRemoveBtn.onclick = (e) => {};
