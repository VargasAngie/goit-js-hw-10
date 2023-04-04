import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}`
    // 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages'
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
   
}

module.exports = fetchCountries;
