/* View map form */
// Get the input element and submit button
const viewMapInput = document.querySelector('#view-map-input');
const viewMapButton = document.querySelector('#view-map-button');

function viewMap() {
  // Get the value of the input element
  const viewMapValue = viewMapInput.value;

  // Send a GET request
  axios.get(`https://restcountries.com/v3.1/name/${viewMapValue}?fullText=true`)
    .then(function (response) {
      let mapLink = response.data[0].maps.googleMaps;
      window.open(mapLink, '_blank');
    })
    .catch(function (error) {
      //console.error(error);
      let errorMessage = error.response.data.message || 'An error occurred';
    $('#view-map-error-msg').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error:</strong> ' + errorMessage 
      + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    });
}

// Add a click event listener to the view map button
viewMapButton.addEventListener('click', viewMap);