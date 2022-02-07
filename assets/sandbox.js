// add city, country code; api key; unit of temp (imperial)

// My API key: 8f9a11f5149a0f8020ecd4c8516f848a
var myKey = "8f9a11f5149a0f8020ecd4c8516f848a";

// define and display current date
// var moment = require('moment');

var city = document.getElementById('searchCity');
var cityHolder = "";
console.log(city);

var currentDate = $(".current-date");

function displayDate() {
    var current = moment().format('ll');
    currentDate.text(current);
}

displayDate();

var citySearch = "";



function getCity(event) {
    var lon;
    var lat;
    var cityName = city.value;
    console.log(cityName);
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + myKey;
    event.preventDefault();
    console.log(city);
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .then(function (data) {
            console.log(data);
            lon = data.coord.lon;
            lat = data.coord.lat;
            var newFetchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`
            return fetch(newFetchUrl).then(function(response) {
                return response.json();

            }).then(function(data) {
                console.log(data);
            })
        })
}

var button = $('#submit-btn');
button.click(getCity);
// button.addEventListener("click", getCity);

// `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myApiKey}`