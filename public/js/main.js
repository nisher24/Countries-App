/* Search country form */
// Get the input element and submit button
const searchCountryInput = document.querySelector('#search-country-input');
const searchCountryButton = document.querySelector('#search-country-button');

// Add a click event listener to the submit button
searchCountryButton.addEventListener('click', function() {
  // Get the value of the input element
  const searchCountryValue = searchCountryInput.value;

  // Send a GET request
  axios.get(`https://restcountries.com/v3.1/name/${searchCountryValue}?fullText=true`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
