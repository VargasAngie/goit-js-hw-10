import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const fetchCountries = require('./fetchCountries');

const markupInput = document.querySelector('#search-box');
const markupList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

markupInput.addEventListener(
  'input',
  debounce(() => {
    const name = markupInput.value.trim();
    if (name) {
      fetchCountries(name)
        .then(countries => {
          if (countries.length > 9) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else { return makeCountriesList(countries) };
        })
        .catch(error =>
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
    }
    return (markupList.innerHTML = []);
  }),
  DEBOUNCE_DELAY
);

function makeCountriesList(countries) {
  const countriesList = countries
    .map(country => {
      return `<li>
      <div class= countriesList__container>
        <img class="countriesList__flag" src= ${country.flags.svg} ></>
            <p class="countriesList__name"><b>${country.name.official}</p>
      </div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${JSON.stringify(country.languages)}</p>
        </li>`;
    })
    .join('');
  markupList.innerHTML = countriesList;
}
