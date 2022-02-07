// My personal API key: 8f9a11f5149a0f8020ecd4c8516f848a
var myKey = "8f9a11f5149a0f8020ecd4c8516f848a";

// GRABBING THE CITY SEARCH FORM ELEMENT
var cityEl = document.getElementById('searchCity');
// console.log(cityEl);

// GRABBING THE CURRENT DATE ELEMENT
var currentDateEL = $(".current-date");

// FUNCTION TO GET THE CURRENT DATE IN MMM DD, YYYY FORMAT ('ll')
function displayDate() {
    var current = moment().format('ll');
    currentDateEL.text(current);
}

// CALL FUNCITON TO DISPLAY DATE
displayDate();


// FUNCTION TO GET THE CITY DATA IN THE API
function getCity(event) {

    // CREATE VARIABLES FOR LATITUDE AND LONGITUDE
    var lat;
    var lon;

    // CREATING VARIABLE FOR (ALL) CITY VALUE
    var cityName = cityEl.value;
    console.log(cityName);

    // DISPLAY THE SEARCHED CITY'S NAME IN THE CURRENT WEATHER CONTAINER
    $('#city-name').text(cityName.toUpperCase());

    // CREATING URL VARIABLE
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + myKey;

    // PREVENT PAGE FROM REFRESHING EVERY TIME THE SEARCH-SUBMIT BUTTON IS CLICKED
    event.preventDefault();

    // FETCH THE OPEN WEATHER MAP API
    fetch(url)

        // GIVE US (RETURN) A JSON RESPONSE
        .then(response => {
            return response.json();
        })
        
        // RETURN THE DATA FROM THE API
        .then(data => {
            console.log(data);
            return data;
        })
        .then(function (data) {

            // GET THE DATA COORDINATES FOR LATITUDE AND LONGITUDE OF THAT CITY
            lon = data.coord.lon;
            lat = data.coord.lat;
            // CREATE OUR NEW FETCH URL INCLUDING THE LAT AND LON DATA
            var newFetchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`

            // RETURN DATA FROM THE NEW FETCH URL API AND RESPOND WITH JSON
            return fetch(newFetchUrl).then(function(response) {
                return response.json();

            })
            // CONSOLE LOG THE DATA of the newFetchUrl (for the specific city)
            .then(function(data) {
                console.log(data);

                // GRAB AND DISPLAY THE MATCHING CURRENT-WEATHER ICON


                // GRAB AND DISPLAY THE TEMPERATURE
                $('#temp').text('Temperature: ' + Math.floor(data.current.temp) + " °F");

                // GRAB AND DISPLAY THE HUMIDITY
                $('#humidity').text('Humidity: ' + data.current.humidity + " %");
                
                // GRAB AND DISPLAY THE WIND SPEED
                $('#wind-speed').text('Wind Speed: ' + data.current.humidity + ' mph');

                // GRAB AND DISPLAY THE UV INDEX (CREATE COLOR LOOP BETWEEN SEVERE, MODERATE, FAVORABLE)
                var uvInfo = data.current.uvi;
                $('#uv-index').text('UV Index: ' + uvInfo);
                if (uvInfo <= 3) {
                    $('#uviColor').css({"background-color":"rgba(49,188,34, 0.4)", "border-left":"4px solid #196619"});
                }
                if (uvInfo > 3 && uvInfo < 6) {
                    $('#uviColor').css({"background-color":"rgba(255, 204, 0, 0.4)", "border-left":"5px solid #ffcc00"});
                }
                if (uvInfo >= 6) {
                    $('#uviColor').css({"background-color":"rgba(225,57,116, 0.4)", "border-left":"5px solid #b30000"});
                    
                }
            })
        })
}

// GRAB THE SEARCH-SUBMIT BUTTON
var button = $('#submit-btn');
// CREATE CLICK EVENT THAT GRABS THE DATA FROM THE GETCITY FUNCTION EVERY TIME THE BUTTON IS CLICKED
button.click(getCity);


