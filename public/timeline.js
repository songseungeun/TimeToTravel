const $dateList = document.querySelector('.date-list');

$dateList.onclick = ({ target }) => {
  if (!target.matches('.date-list > li') && !target.matches('.date-list > li > div')) return;
  [...$dateList.children].forEach(date => date.classList.toggle('active', (target === date || target.parentNode === date)));
};

let promise = '';

const dataBase = axios.get('/travels')
    .then(({ data }) => promise = data)
    .then((promise) => console.log(promise))
    .catch(err => console.error(err));

