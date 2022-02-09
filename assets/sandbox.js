// My personal API key: 8f9a11f5149a0f8020ecd4c8516f848a
var myKey = "8f9a11f5149a0f8020ecd4c8516f848a";

// GRABBING THE CITY SEARCH FORM ELEMENT
var cityEl = document.getElementById('searchCity');
// console.log(cityEl);

var cardContainer = document.querySelector('.forecast');

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
    localStorage.setItem("newItem", JSON.stringify(cityName));
    

    var cityHistory = document.getElementById('city-history');
    var cityNameLi = document.createElement('li');
    cityNameLi.addEventListener('click', function(e){
        console.log(e.target.innerText);
        document.getElementById('city-name').innerText = e.target.innerText;
        var cityBtnName = e.target.innerText;
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityBtnName + "&appid=" + myKey;
        fetch(url).then(response => {
            return response.json();
        })
        
        // RETURN THE DATA FROM THE API
        .then(data => {
            console.log(data);
            return data;
        })
        .then(function (data) {
            document.getElementById('forecastCtn').innerHTML = "";
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
                var iconImg = data.current.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + iconImg +"@2x.png";

                $('#weather-icon').attr('src', iconUrl);

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

                
                $('#forcastCtn').append(cards);
                var cards = [];
                
                for(var i = 0; i < 5; i++) {
                    var currentDay = moment().add(i+1, 'days').format('ll');
                    var foreIcon = data.daily[i].weather[0].icon;
                    var foreUrl = "http://openweathermap.org/img/wn/" + foreIcon +"@2x.png";

                    // var foreInfo = data.daily[i];
                    var card = $( `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text">
                                <span class="date">${currentDay}</span> 
                                <br>
                                <img src="${foreUrl}" class="weather-icon">
                                <br>
                                <span class="temp">${Math.round(data.daily[i].temp.day)}</span> 
                                <br>
                                <span class="wind-speed">${data.daily[i].wind_speed}</span> 
                                <br>
                                <span class="humidity">${data.daily[i].humidity}</span>
                            </p>
                        </div>
                    </div> 
                    `);
                    cards.push(card);
                }
               console.log(cards.forEach(element => {
                   console.log(element[0]);
                   document.getElementById('forecastCtn').append(element[0]);
               }));

               cityEl.value = "";
               // hide last forecast and only show future forecast
               // save into local storage per city so when clicked it shows that city's current and forecast again
               

            })
            
        })
    })

    // Capitalize and insert the city name into an li
    cityNameLi.innerText = cityName.toUpperCase();
    // add each li to the city history ul
    cityHistory.append(cityNameLi);



    var items = cityHistory.children.length;
    console.log(items);
    if(items > 5){
        cityHistory.innerHTML = "";
        cityHistory.append(cityNameLi);
    }
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
            document.getElementById('forecastCtn').innerHTML = "";
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
                var iconImg = data.current.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/wn/" + iconImg +"@2x.png";

                $('#weather-icon').attr('src', iconUrl);

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

                
                $('#forcastCtn').append(cards);
                var cards = [];
                
                for(var i = 0; i < 5; i++) {
                    var currentDay = moment().add(i+1, 'days').format('ll');
                    var foreIcon = data.daily[i].weather[0].icon;
                    var foreUrl = "http://openweathermap.org/img/wn/" + foreIcon +"@2x.png";

                    // var foreInfo = data.daily[i];
                    var card = $( `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"></h5>
                            <p class="card-text">
                                <span class="date">${currentDay}</span> 
                                <br>
                                <img src="${foreUrl}" class="weather-icon">
                                <br>
                                <span class="temp">${Math.round(data.daily[i].temp.day)}</span> 
                                <br>
                                <span class="wind-speed">${data.daily[i].wind_speed}</span> 
                                <br>
                                <span class="humidity">${data.daily[i].humidity}</span>
                            </p>
                        </div>
                    </div> 
                    `);
                    cards.push(card);
                }
               console.log(cards.forEach(element => {
                   console.log(element[0]);
                   document.getElementById('forecastCtn').append(element[0]);
               }));

               cityEl.value = "";
               // hide last forecast and only show future forecast
               // save into local storage per city so when clicked it shows that city's current and forecast again
               

            })
            
        })
        
        
}


// GRAB THE SEARCH-SUBMIT BUTTON
var button = $('#submit-btn');
// CREATE CLICK EVENT THAT GRABS THE DATA FROM THE GETCITY FUNCTION EVERY TIME THE BUTTON IS CLICKED
button.click(getCity);



// function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i=0; i<searchHistory.length-1; i++) {
//         const historyItem = document.createElement("input");
//         // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
//         historyItem.setAttribute("readonly",true);
//         historyItem.setAttribute("class", "form-control d-block bg-white");
//         historyItem.setAttribute("value", searchHistory[i]);
//         historyItem.addEventListener("click",function() {
//         getWeather(historyItem.value);
//         })
//         historyEl.append(historyItem);
//     }
// }
//     clearEl.addEventListener("click",function() {
//         searchHistory = [];
//         renderSearchHistory();
//     })
