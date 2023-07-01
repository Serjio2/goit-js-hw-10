const selectItemEl = document.querySelector('.breed-select');
const showItemEl = document.querySelector('.cat-info');
const loaderTxt = document.querySelector('.loader');
const errorTxt = document.querySelector('.error');

const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_Ltm2GBWPpfVNBkV01FC69DA1X4Xk5kGZBGw4eapAO9DTZDepX49nl7yBbmf24740';

  
function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

selectItemEl.hidden = true;
loaderTxt.hidden = false;

fetchBreeds()
  .then(data => {
    selectItemEl.hidden = true;
    loaderTxt.hidden = false;

    for (const item of data) {
      const itemList = document.createElement('option');
      selectItemEl.append(itemList);
      itemList.value = item.id;
      itemList.textContent = item.name;
    }

    selectItemEl.hidden = false;
    loaderTxt.hidden = true;
  })
  .catch(() => {
    loaderTxt.hidden = true;
    errorTxt.hidden = false;
    // console.log("erhgfhgror")
  });


selectItemEl.addEventListener('change', fetchCatByBreed);


function fetchCatByBreed(breedId) {
  loaderTxt.hidden = false;
  showItemEl.innerHTML = '';

  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId.target.value}&api_key=${API_KEY}`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // console.log(name)

      for (const item of data) {
        item.breeds.map(({ name, description, temperament }) => {
          showItemEl.innerHTML = `<ul style=list-style:none>
                <li>
                    <img src="${item.url}" height=400px></img>
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}</p>
                </li>
            </ul>`;
        });
      }
      loaderTxt.hidden = true;
    })

    .catch(() => {
      loaderTxt.hidden = true;
      errorTxt.hidden = false;
    });
}
