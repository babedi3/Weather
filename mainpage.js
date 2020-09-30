//moment().format('dddd');
//var currentday=$('#currentday')[0];; 
//console.log(currentday);
document.getElementById('currentday').innerHTML = moment().format('dddd');
document.getElementById('currentdate').innerHTML = moment().format('L');

document.getElementById('day0name').innerHTML = moment().format('ddd');
document.getElementById('day1name').innerHTML = moment().add(1, 'days').format('ddd');
document.getElementById('day2name').innerHTML = moment().add(2, 'days').format('ddd');
document.getElementById('day3name').innerHTML = moment().add(3, 'days').format('ddd');
document.getElementById('day4name').innerHTML = moment().add(4, 'days').format('ddd');
document.getElementById('day5name').innerHTML = moment().add(5, 'days').format('ddd');
document.getElementById('day6name').innerHTML = moment().add(6, 'days').format('ddd');

//Pulling data from current weather api
//var city = document.getElementById('').innerHTML;

$('#searchcity').keydown(function (event) {
    if (event.keyCode == 13) {
        console.log('keydown')
        event.preventDefault();
        $('#btnSearchCity').click();
        return false;
    }
});

var citiesArray = [];

function refreshCities() {
    $("#list-cities").empty();
    $.each(citiesArray, function (index, value) {
        var elem = $('<li class="list-group-item list-group-item-action list-group-item-secondary">' + value + '</li>');
        $("#list-cities").append(elem);
        elem.click(function () {
            $('#searchcity').val(value);
            $('#btnSearchCity').click();
        });
    });
}

var lat;
var long;


function currentWeather() {
    var city = document.getElementById('searchcity').value;
    // console.log(city);

    if (city === '')
        city = 'Atlanta';

    if (citiesArray.indexOf(city) === -1) {
        citiesArray.push(city);
        refreshCities();
    }

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=07c552f8f1e1246a5f81897348610f86";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        // console.log(response.main.temp);
        document.getElementById('temp').innerHTML = (Math.round((response.main.temp - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day0').innerHTML = (Math.round((response.main.temp - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('selectedcity').innerHTML = response.name;
        document.getElementById('windspeed').innerHTML = response.wind.speed + " km/h";
        document.getElementById('humidity').innerHTML = response.main.humidity + " %";

        lat = response.coord.lat;
        long = response.coord.lon;

        window.localStorage.setItem('latitude', lat);
        window.localStorage.setItem('longitude', long);

    });
};



function forecastWeather() {
    var latit = window.localStorage.getItem('latitude');
    var longit = window.localStorage.getItem('longitude');
    var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latit + "&lon=" + longit + "&appid=07c552f8f1e1246a5f81897348610f86";
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        document.getElementById('day1').innerHTML = (Math.round((response.daily[1].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day2').innerHTML = (Math.round((response.daily[2].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day3').innerHTML = (Math.round((response.daily[3].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day4').innerHTML = (Math.round((response.daily[4].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day5').innerHTML = (Math.round((response.daily[5].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";
        document.getElementById('day6').innerHTML = (Math.round((response.daily[6].feels_like.day - 273.15) * (9 / 5) + 32)) + " °F";

        document.getElementById('uvindex').innerHTML = response.current.uvi;

        console.log(response);
        console.log(response.current.uvi);

        $('#uvindex').removeClass('extreme');
        $('#uvindex').removeClass('very-high');
        $('#uvindex').removeClass('high');
        $('#uvindex').removeClass('moderate');
        $('#uvindex').removeClass('low');

        if (response.current.uvi >= 11) {
            $('#uvindex').addClass('extreme');
        } else if (response.current.uvi >= 8) {
            $('#uvindex').addClass('very-high');
        } else if (response.current.uvi >= 6) {
            $('#uvindex').addClass('high');
        } else if (response.current.uvi >= 3) {
            $('#uvindex').addClass('moderate');
        } else if (response.current.uvi >= 1) {
            $('#uvindex').addClass('low');
        }

    });
};


function uvIndex() {
    var latit = window.localStorage.getItem('latitude');
    var longit = window.localStorage.getItem('longitude');
    var UVURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latit + "&lon=" + longit + "&appid=07c552f8f1e1246a5f81897348610f86";
    $.ajax({
        url: UVURl,
        method: "GET"
    }).then(function (answer) {
        console.log(answer);



    });
}



currentWeather();

forecastWeather();

//var temp =( (K − 273.15) × 9/5 + 32  )


//document.getElementById("selectedcity").innerHTML = JSON.parse(data.name);

/*
fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    // Create and append the li's to the ul
    })
  })

currentWeather().then(data => console.log(data)); */



//function currentWeather() {}


//5 day forecast info
/* async function forecastWeather() {
    let response = await fetch('api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=07c552f8f1e1246a5f81897348610f86');
    let data5 = await response.json()
    return data5;
}

forecastWeather().then(data5 => console.log(data5)); */




//function create currentWeatherDisplay() {}


//function create forecastDisplay() {}

// var weather = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "http://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=152759aba7299be7a97ed5ab5c2cdd56",
// 	"method": "GET",
// };


/*

var city= document.getElementById("search");
//fiveday(city);

oneday(city);
function oneday(city){
    var onedayurl="https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}";
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    console.log(onedayurl)
    //call ajax

    $.ajax({
        url: onedayurl,
        method: "GET"
      }).then(function(response) {
        console.log()
         //city
    //humidity
    //windspeed
    //lon
    //lat
    //call another ajax passing lon and lat to get uv vis data

    var lat=response.coord.lat;
    var lon=response.coord.lon;
    var uvurl="http://api.openweathermap.org/data/2.5/uvi?appid=152759aba7299be7a97ed5ab5c2cdd56&lat="+lat+"&lon="+lon;
        console.log(uvurl)
        $.ajax({
            url: uvurl,
            method: "GET"
          }).then(function(uvobj) {
              console.log(uvobj.value)
          });
      });
/*
      <tr>
                    <td>Temperature:</td>
                </tr>
                <tr>
                    <td>Humidity:</td>
                </tr>
                <tr>
                    <td>Wind Speed:</td>
                </tr>
                <tr>
                    <td>UV Index:</td>
                </tr>
                */


            //3. append to .oneday


/*
function fiveday(city){



var weatherurl="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=152759aba7299be7a97ed5ab5c2cdd56";
console.log(weatherurl)

$.ajax({
    url: weatherurl,
    method: "GET"
  }).then(function(data) {
    //console.log(data)
    //date
    for(var i=0;i<5;i++){


    console.log(moment(data.list[i*8].dt_txt).format("MMM Do YYYY"));
    //cityname
    console.log(city)
    //temp
    console.log(data.list[i*8].main.temp)
    //baseurl+ icon +.png
    console.log(data.list[i*8].weather[0].icon+".png")
    //stackoverflow baseurl
    //humidity
    console.log(data.list[i*8].main.humidity)
/*
    <div class="card bg-primary">
        <div class="card-body text-center">
            <p class="card-text">Some text inside the first card</p>
        </div>
    </div>
*/
//1. create var
//2. style it
//3. stick to html page
/*
var d1= document.createElement("div");
//<div></div>
d1.setAttribute("class","card bg-primary");
//<div class="card bg-primary"></div>
var d2=document.createElement("div");
d2.setAttribute("class", "card-body text-center")
var p= document.createElement("p");
p.setAttribute("class","card-text");
p.innerHTML="some text";
var p1= document.createElement("p");
//date
p1.innerHTML=moment(data.list[i*8].dt_txt).format("MMM Do YYYY");
var p2= document.createElement("p");

var p3= document.createElement("p");
var p4= document.createElement("p");


d2.appendChild(p);/*
<div class="card-body text-center">
    <p class="card-text">Some text inside the first card</p>
</div>*/
/*
d2.appendChild(p1)
d1.appendChild(d2);

    //.card-deck
document.querySelector(".card-deck").appendChild(d1);
    }
  });
}


//var cityy = $(weather.city);
//var cityy = weather.city;

// $.ajax({
//     dataType: 'json',
//     success: function(data){
//         alert(weather.city)
//     }
// })





//    // document.getElementById('selectedCity').innerHtml= cityy;




// $.ajax(weather).done(function(response) {
// 	console.log(response);
// });

*/

/*
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} */