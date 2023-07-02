
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_Ltm2GBWPpfVNBkV01FC69DA1X4Xk5kGZBGw4eapAO9DTZDepX49nl7yBbmf24740';


function fetchBreeds() {
    return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
        
      if (!response.ok) {
        throw new Error(response.statusText);
      }
       return response.json();
    });
  }

  



  export { fetchBreeds, BASE_URL, API_KEY };