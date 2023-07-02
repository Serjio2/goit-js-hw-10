import { fetchBreeds, BASE_URL, API_KEY } from './js/cat-api';

import SlimSelect from 'slim-select';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const selectItemEl = document.querySelector('.breed-select');
const showItemEl = document.querySelector('.cat-info');
// const loaderTxt = document.querySelector('.loader');
// const errorTxt = document.querySelector('.error');

Loading.standard('Loading data, please wait...')

selectItemEl.hidden = true;
// loaderTxt.hidden = false;

fetchBreeds()
  .then(data => {
    
    Loading.remove();

    selectItemEl.hidden = false;
    // loaderTxt.hidden = false;

    data.map(({ id, name }) => {

      const itemList = document.createElement('option');
      selectItemEl.append(itemList);

      itemList.value = id;
      itemList.textContent = name;
    });

    // selectItemEl.hidden = false;
    // loaderTxt.hidden = true;

    return data;
  })
  .catch(() => {
    Loading.remove();
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    // loaderTxt.hidden = true;
    // errorTxt.hidden = false;
  });


selectItemEl.addEventListener('change', fetchCatByBreed);


function fetchCatByBreed(breedId) {

  Loading.standard('Loading data, please wait...')
  // loaderTxt.hidden = false;
  showItemEl.innerHTML = '';

  breedId = breedId.target.value;

  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // console.log(response)
      return response.json();
    })

    .then(data => {
      console.log(data);
      for (const item of data) {
        item.breeds.map(({ name, description, temperament }) => {
          showItemEl.innerHTML = `<ul style=list-style:none>
                <li>
                    <img src="${item.url}" height=400px></img>
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}</p>
                </li>
            </ul>`;
        });
      }
      Loading.remove();
      // loaderTxt.hidden = true;
    })

    .catch(() => {
      Loading.remove();
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      // loaderTxt.hidden = true;
      // errorTxt.hidden = false;
    });
}
