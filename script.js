var key = "1b139641fa4f719925c81e35f0ec50aa";
var geoKey = "AIzaSyDQ2WJYFFWQmUXgzmo7Gc2p4DlzoYeEtg8";
var imgKey = "6670947-2580c2811b3383c1d2c76c35e";
//https://pixabay.com/api/
//http://openweathermap.org/img/w/10d.png


getData("https://www.googleapis.com/geolocation/v1/geolocate?key=" +geoKey,parseGeoData,"POST")

function getWeather() {
  var text = document.getElementsByTagName("input");
  console.log(text[0].value) 
  if(text[0].value === "" ) {
      alert("You must provide city name!");
 }else{
   getData("https://api.openweathermap.org/data/2.5/weather?q=" + text[0].value +"&units=metric&appid="+ key, parseData,"GET")
     
 }

}
function parseGeoData(data) {
    var lat = data.location.lat;
    var lon = data.location.lng;
    getData("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon + "&units=metric&appid="+key,parseData,"GET" )
    console.log(data)   
}
function getData(theUrl, callback,req){  
    
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() { 
              if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                  callback(JSON.parse(xmlHttp.responseText));
          }
          
        }
        xmlHttp.open(req, theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
 function parseData(data){
    getData("https://pixabay.com/api/?key=" +imgKey+ "&q="+data.name,parseImges,"GET" )
     console.log(data)
     var icon = data.weather[0].icon;
     var iconData = "<img src='https://openweathermap.org/img/w/"+icon+".png'>";
     var iconDiv = document.getElementsByClassName("icon")[0];
     iconDiv.innerHTML=iconData;
     var weatherDesc = data.weather[0].description;
     console.log(weatherDesc)
     var temp = "Current temperature: "+data.main.temp + "°C";
     var tempDiv = document.getElementsByClassName("temp")[0]
     tempDiv.innerHTML = temp;
     console.log(tempDiv)
     var wind = "Wind speed: "+data.wind.speed + "kmh";
     var windDiv = document.getElementsByClassName("wind")[0]
    windDiv.innerHTML = wind;
     var humid ="Humidty: "+ data.main.humidity;
     var humidDiv = document.getElementsByClassName("humid")[0]
     humidDiv.innerHTML =humid;
     console.log(temp)
     var city = data.name;
     var state = data.sys.country;
     var weatherDataFor = city + ", " + state;
     var weatherInfo = document.getElementsByClassName("info")[0];
     weatherInfo.innerHTML = weatherDataFor;
     var description = document.getElementsByClassName("description")[0];
     description.innerHTML="Description: " + data.weather[0].description;
    
    switch(weatherDesc) {
        case "broken clouds":
            document.body.style.backgroundImage="url(./img/broken_clouds.jpg)"
            break;
        case "few clouds":
            document.body.style.backgroundImage="url(./img/few_clouds.jpg)"
            break;
        case "overcast clouds":
            document.body.style.backgroundImage="url(./img/overcast_clouds.jpg)"
            break;
        case "light intensity drizzle":
            document.body.style.backgroundImage="url(./img/light_drizzle.jpg)"       
            break; 
        case "moderate rain":
            document.body.style.backgroundImage="url(./img/moderate_rain.jpg)"       
            break;    
        
        }


 }
 function parseImges(data) {
    
     var img;
     var imageContainer = document.getElementsByClassName("img-container")[0];
     if(imageContainer.innerHTML !== "") {
         imageContainer.innerHTML= "";
        
    }
     console.log(imageContainer)
     console.log( imageContainer.innerHTML)
     
     for(var i = 0; i < data.hits.length; i++) {
        img = "<img src='"+data.hits[0].previewURL+"'>";
        imageContainer.innerHTML+="<img src='"+data.hits[i].previewURL+"'>";
     }
     console.log(data)
 }
  
 function onKeyPres(evt) {
     if(evt.charCode === 13) {
        getWeather()
        
         
     }
     console.log(key)
 }

 

 










