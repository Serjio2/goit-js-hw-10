import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

// import SlimSelect from 'slim-select';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectItemEl = document.querySelector('.breed-select');
const showItemEl = document.querySelector('.cat-info');
// const loaderTxt = document.querySelector('.loader');
// const errorTxt = document.querySelector('.error');

// new SlimSelect({
//   // select: '#select',
  
// })


Loading.standard('Loading data, please wait...');

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
  })
  .catch(() => {
    Loading.remove();
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    // loaderTxt.hidden = true;
    // errorTxt.hidden = false;
  });



selectItemEl.addEventListener('change', createMarkup = (data) => {
    //   // loaderTxt.hidden = false;
    Loading.standard('Loading data, please wait...');
    showItemEl.innerHTML = '';

    fetchCatByBreed(data)
    .then(data => {
      Loading.remove();
      for (const item of data) {
        item.breeds.map(({ name, description, temperament }) => {
          showItemEl.innerHTML = `<ul style=list-style:none>
                <li style=display:flex>
                    <img src="${item.url}" width=400px style=margin-right:20px></img>
                    <div>
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}</p>
                    </div>
                </li>
            </ul>`;
        });
      }
    })
    .catch(() => {
          Notify.failure('Oops! Something went wrong! Try reloading the page!');
      //       // loaderTxt.hidden = true;
      //       // errorTxt.hidden = false;
  })
})
