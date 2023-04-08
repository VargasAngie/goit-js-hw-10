import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const markupInput = document.querySelector('#search-box');
const markupList = document.querySelector('.countries-list');

const DEBOUNCE_DELAY = 300;

markupInput.addEventListener(
  'input',
  debounce(() => {
    const name = markupInput.value.trim();
    if (name) {
      fetchCountries(name)
        .then(countries => {
          if (countries.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (countries.length > 2 && countries.length < 10) {
            return makeCountriesList(countries);
          } else {
            return renderCountry(countries);
          }
        })
        .catch(error =>
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
    }
    return (markupList.innerHTML = []);
  }),
  DEBOUNCE_DELAY
);

function makeCountriesList(arr) {
  const countriesArr = arr
    .map(country => {
      return `<li>
      <div class= countries-list__container>
        <img class="countries-list__flag" src= ${country.flags.svg} ></>
            <p class="countries-list__names">${country.name.official}</p>
      </div>
      </li>`;
    })
    .join('');
  markupList.innerHTML = countriesArr;
}

function renderCountry(countries) {
  const countryDetails = countries
    .map(country => {
      const languagesObj = country.languages;
      return `<li>
      <div class= countries-list__container>
        <img class="countries-list__flag" src= ${country.flags.svg} ></>
            <p class="countries-list__name"><b>${country.name.official}</b></p>
      </div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(languagesObj)}</p>
        </li>`;
    })
    .join('');
  markupList.innerHTML = countryDetails;
}
