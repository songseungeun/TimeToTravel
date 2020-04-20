const dateList = document.querySelector(".date-list");
const beforeBtn = document.querySelector(".date-before-btn");
const afterBtn = document.querySelector(".date-after-btn");

let dateItemMove = 0;

function moveDatetoPrev({ target }) {
  if (!target.matches(".date-before-btn")) return;
  dateItemMove -= 120;
  if (dateItemMove < 0) dateItemMove = 0;
  dateList.style.transform = `translate3D(-${dateItemMove}px, 0, 0)`;
  dateList.style.transition = "all 0.3s ease-out";
}

function moveDatetoNext({ target }) {
  if (!target.matches(".date-after-btn")) return;
  dateItemMove += 120;
  if (dateItemMove > 840) dateItemMove = 840;
  dateList.style.transform = `translate3D(-${dateItemMove}px, 0, 0)`;
  dateList.style.transition = "all 0.3s ease-out";
}

beforeBtn.addEventListener('click', moveDatetoPrev);
afterBtn.addEventListener('click', moveDatetoNext);
