/* Search country form */
// Get the input element and submit button
const searchCountryInput = document.querySelector('#search-country-input');
const searchCountryButton = document.querySelector('#search-country-button');

function displayCountryInfo() {
  // Get the value of the input element
  const searchCountryValue = searchCountryInput.value;

  // Send a GET request
  axios.get(`https://restcountries.com/v3.1/name/${searchCountryValue}?fullText=true`)
    .then(function (response) {
      // Get the response JSON data
      let countryData = response.data;
      //console.log(countryData);

      // Update the modal content with JSON data
      let countryInfoList = document.querySelector('#country-info-list');

      // Add country name
      let countryName = document.querySelector('#country-basic-info-modal-title');
      countryName.innerHTML = countryData[0].name.official;

      // Add capital city
      let capitalCity = document.createElement('li');
      capitalCity.classList.add('list-group-item');
      capitalCity.innerHTML = "<b>Capital city: </b> " + countryData[0].capital[0];
      countryInfoList.appendChild(capitalCity);

      // Add region
      let region = document.createElement('li');
      region.classList.add('list-group-item');
      region.innerHTML = "<b>Region: </b> " + countryData[0].region;
      countryInfoList.appendChild(region);

      // Add currency
      let currency = document.createElement('li');
      currency.classList.add('list-group-item');
      let currencyCode = Object.keys(countryData[0].currencies)[0];
      currency.innerHTML = "<b>Currency: </b> " + countryData[0].currencies[currencyCode].name + " (" + currencyCode + ")";
      countryInfoList.appendChild(currency);

      // Add languages
      let language = document.createElement('li');
      language.classList.add('list-group-item');
      let lanCodes = Object.keys(countryData[0].languages);
      let lans = "";

      for (let i = 0; i < lanCodes.length - 1; i++) {
        let lanCode = lanCodes[i];
        let lan = countryData[0].languages[lanCode];
        lans += lan;
        lans += ", ";
      }
      lans += countryData[0].languages[lanCodes[lanCodes.length - 1]];

      language.innerHTML = "<b>Languages: </b> " + lans;
      countryInfoList.appendChild(language);

      // Add population
      let population = document.createElement('li');
      population.classList.add('list-group-item');
      population.innerHTML = "<b>Population: </b> " + countryData[0].population;
      countryInfoList.appendChild(population);

      // Show modal
      $('#country-basic-info-modal').modal('show');
    })
    .catch(function (error) {
      //console.error(error);
      let errorMessage = error.response.data.message || 'An error occurred';
    $('#search-country-error-msg').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error:</strong> ' + errorMessage 
      + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    });
}

// Add a click event listener to the search country button
searchCountryButton.addEventListener('click', displayCountryInfo);

// Clear country basic info modal content when close it
$("#country-basic-info-modal").on("hidden.bs.modal", function () {
  $("#country-info-list").empty();
});

/* List countries form */
// Get the input element and submit button
const listCountriesInput = document.querySelector('#list-countries-input');
const listCountriesButton = document.querySelector('#list-countries-button');

function listCountries() {
  // Get the value of the input element
  const listCountriesValue = listCountriesInput.value;
  //console.log("VALUE: " + listCountriesValue);

  if (listCountriesValue != "" && listCountriesValue.toLowerCase() != "all") {
    axios.get(`https://restcountries.com/v3.1/region/${listCountriesValue}`)
      .then(function (response) {
        // Get the response JSON data
        let countryListData = response.data;
        //console.log(countryListData);

        // Update the modal content with JSON data
        let countryList = document.querySelector('#country-list');

        // Add region name
        let regionName = document.querySelector('#country-list-modal-title');
        regionName.innerHTML = listCountriesValue.toUpperCase();

        for (let i = 0; i < countryListData.length; i++) {
          let country = document.createElement('li');
          country.classList.add('list-group-item');
          country.innerHTML = countryListData[i].name.common;
          countryList.appendChild(country);
        }

        // Show modal
        $('#country-list-modal').modal('show');
      })
      .catch(function (error) {
        //console.error(error);
        let errorMessage = error.response.data.message || 'An error occurred';
        $('#list-countries-error-msg').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error:</strong> ' + errorMessage 
          + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
      });   
  }
}

// Add a click event listener to the list countries button
listCountriesButton.addEventListener('click', listCountries);

// Clear country list modal content when close it
$("#country-list-modal").on("hidden.bs.modal", function () {
  $("#country-list").empty();
});

/* Initialize popovers */
$(document).ready(function() {
  $('[data-toggle="popover"]').popover();
});

$('.popover-dismiss').popover({
  trigger: 'focus'
})