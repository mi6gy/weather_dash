
//JS
//event listner, click, formbutton, call a function or evntlisten triggered by search history
// check to see if city already is stored if not then store city name into localstorage
// - AJAX for current weather 
//   with data, grab necessary info and display it onto html
/// - AJAX for 5 day forcast 
// with data, grab info, and display it in 5 day forcast div
//http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",



$(document).ready(function () {

    $('#searchBtn').on("click", function (event) {
        event.preventDefault();
        var searchValue = $("#inputVal").val();
        weatherSearch(searchValue)
    })


    //UV INdex
    function getUv(lon, lat) {
        //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
        $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/uvi?appid=d0122da0328e6ddb9233584d21755ef6&&lat=${lat}&lon=${lon}`,
            dataType: 'json'
        }).then(function (res) {
                     var uv = $("<p>").text("UV Index: " + res.value)
            $(".currentCardL").append(uv);
            // use color text from planner if statment
        })

    }


    //forecast
    function getForecast(city){
        console.log('hello')
        $.ajax({
            type: 'GET',
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d0122da0328e6ddb9233584d21755ef6&units=imperial`,
            dataType: 'json'
        }).then(function(data){
               
                var list = data.list;
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                  

                    if(list[i].dt_txt.indexOf("15:00:00")!==-1){
                        console.log("WEATHER", list[i].main.temp, new Date(list[i].dt_txt).toLocaleDateString())
                    }
                    
                }
        })

    }






    function weatherSearch(value) {
        if (history.indexOf(value) === -1) {
            localStorage.setItem("history", value)
        };

        $.ajax({
            type: 'GET',
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=d0122da0328e6ddb9233584d21755ef6&units=imperial",
            dataType: 'json'
        }).then(function (res) {
            console.log('dta', res)
            console.log('name', res.name)
            //  city name, 
            //the date, an 


            //icon representation of weather conditions, 
            console.log('icon', res.weather[0].icon)
            //the temperature, 
            console.log('temp', res.main.temp);
            //the humidity, 
            console.log('hum', res.main.humidity);

            //the wind speed, 
            console.log('wind', res.wind.speed);

            //and the UV index


            var city = $("<h3>").text(res.name + " , " + new Date().toLocaleDateString())
            var cardP = $("<div>");
            var cardL = $("<div>").addClass("currentCardL");
            var wind = $("<p>").text("Wind Speed: " + res.wind.speed);
            var humid = $("<p>").text("Humidity: " + res.main.humidity);
            var temp = $("<p>").text("Temperature: " + res.main.temp);
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png")
            cardL.append(wind, humid, temp,);
            cardP.append(city, img, cardL);
            $("#current").append(cardP);

            getUv(res.coord.lon, res.coord.lat);
            getForecast(res.name);
        })

    };


    var history = window.localStorage.getItem("history") || [];

});