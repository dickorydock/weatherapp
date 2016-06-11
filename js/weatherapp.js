//WEATHER-GETTING APP

var tempType ="C";
var mylat, mylon, tempstring;

//once we have the lat and lon, this getWeather(lat,lon) function will call the weather JSON data from Open Weather Map
    
var getWeather = function(thislat, thislon) {
    gettingData = true;

var requestString = "http://api.openweathermap.org/data/2.5/weather?lat="+thislat+"&lon="+thislon+ "&APPID="+openWeatherMapKey;
  request = new XMLHttpRequest();
    request.onreadystatechange=function(){
      if (request.readyState==4&&request.status==200){
        //parse the JSON
        parsedWeather=JSON.parse(request.responseText);
        
        //individual weather components for HTML
        humidity = parsedWeather.main.humidity;
        tempK = parsedWeather.main.temp;
        locationname = parsedWeather.name;
        weatherDesc =parsedWeather['weather'][0].description;
        weatherImg =parsedWeather['weather'][0].icon;
        tempC = (tempK-273).toFixed(1);
        tempF = ((tempK-273)*1.8+32).toFixed(1);
        
        //actually replace the HTML
        $("#locationdata").html("Your location: "+parsedWeather.name);
        $("#temperature").html("Temperature: "+tempC+" "+"<a href='#' id='tempLine'>C°</a>");
        $("#humidity").html("Humidity: "+humidity+"%");
        $("#weatherDesc").html(weatherDesc);
        //weather icon
        $("#weatherIcon").html("<img src='http://openweathermap.org/img/w/"+weatherImg+".png'></img></div><br>");
        }
    }
    request.open("get", requestString, true);
    request.send();
};


//toggle between Fahrenheit and Celsius when the degree type is clicked
 function switchFC(){
   switch (tempType){
     case "F":
       tempType = "C";
       tempstring =  'Temperature: '+tempC+' '+'<a href="#" id="tempLine">'+tempType+'°</a> ';
       break;
     case "C":
       tempType = "F";
       tempstring =  'Temperature: '+tempF+' '+'<a href="#" id="tempLine">'+tempType+'°</a> ';
       break;
   } 
   $("#temperature").html(tempstring);    
};

//get lat and lon. Note that this WILL NOT WORK with certain ad-blocking addons
var latlongUrl = "http://ip-api.com/json/?fields=lat,lon";
    requestLatLon = new XMLHttpRequest();
    requestLatLon.onreadystatechange=function(){
       if (requestLatLon.readyState==4&&requestLatLon.status==200){
        parsedLatLon=JSON.parse(requestLatLon.responseText);
       //actually call for the weather
       getWeather(parsedLatLon.lat, parsedLatLon.lon);
       }
    };
    requestLatLon.open("get", latlongUrl, true);
    requestLatLon.send();
        
var openWeatherMapKey = '3da93211bae1ede6af6a70a1ab2e1fee';
  
  $(document).on("click", "#tempLine", function(){
      switchFC();
      });
