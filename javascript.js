
// HTML
// form
//input -> city name
// div for current weather
// div for 5 day forcast
// li for list of cities 

//JS
//event listner, click, formbutton, call a function or evntlisten triggered by search history
// check to see if city already is stored if not then store city name into localstorage
// - AJAX for current weather 
//   with data, grab necessary info and display it onto html
/// - AJAX for 5 day forcast 
// with data, grab info, and display it in 5 day forcast div
//http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",

$(document).ready(function(){

    $('#searchBtn').on("click", function(event){
        event.preventDefault();
        var searchValue = $("#inputVal").val();
        weatherSearch(searchValue)
    })

    function weatherSearch(value){
        if(history.indexOf(value) === -1){
            localStorage.setItem("history",value)
        };

        $.ajax({
            type:'GET',
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=d0122da0328e6ddb9233584d21755ef6&units=imperial",
            dataType: 'json'
        }).then(function(res){
                    console.log('data', res)
        })

    };


    var history = window.localStorage.getItem("history") || [];

});