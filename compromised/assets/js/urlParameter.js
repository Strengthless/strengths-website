/*
 * This script is made by Strengthless.
 *
 */
const queryString = window.location.search;
// Get the URL parameter string.
var parameterKey = new URLSearchParams(queryString).get('key');
var parameterIGN = new URLSearchParams(queryString).get('name');
// Gather the values of 'key' and 'name'.

window.onload = function() {
  document.getElementById("apiKey").value = parameterKey;
  document.getElementById("userID").value = parameterIGN;
  // Append the api key and username.
  document.getElementsByTagName("form")[0].submit();
  // Submit the form.
}
