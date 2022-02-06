// add city, country code; api key; unit of temp (imperial)

// My API key: 8f9a11f5149a0f8020ecd4c8516f848a
var myKey = "8f9a11f5149a0f8020ecd4c8516f848a";

// define and display current date
// var moment = require('moment');



var currentDate = $(".current-date");

function displayDate() {
    var current = moment().format('ll');
    currentDate.text(current);
}

displayDate();