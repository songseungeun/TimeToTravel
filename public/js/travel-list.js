const newTravelBtn = document.querySelector(".new-travel-btn");
const popupBg = document.querySelector(".new-travel-popup-bg");
const popupRemove = document.querySelector(".new-travel-popup-remove-btn");
const newTravelPopup = document.querySelector(".new-travel-popup");

function openPopup() {
  popupBg.style.display = "block";
  newTravelPopup.style.display = "block";
}

function closePopup() {
  popupBg.style.display = "none";
  newTravelPopup.style.display = "none";
}

newTravelBtn.addEventListener("click", openPopup);
popupBg.addEventListener("click", closePopup);
popupRemove.addEventListener("click", closePopup);
