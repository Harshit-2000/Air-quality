let state_name = "";
let city_name = "";
const API_KEY = "31ed1ab2-d1b8-4aee-8cc0-55abdd4ea8ec";
const proxy = "https://cors-anywhere.herokuapp.com/";
const state_URL = proxy+'https://api.airvisual.com/v2/states?country=India&key='+API_KEY;
const city_URL =proxy+"https://api.airvisual.com/v2/cities?state="+state_name+"&country=India&key="+API_KEY;
const detail_url = proxy+"https://api.airvisual.com/v2/city?city="+city_name+"&state="+state_name+"&country=India&key="+API_KEY;
const location_heading = document.getElementById("location");
const state_select = document.getElementById('state');
const city_select = document.getElementById('city');
const button = document.getElementById('submit');
const info_div = document.getElementById('info');
const aqi = document.getElementById('aqi');
const pollutant = document.getElementById('pollutant');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind_speed');
const pressure = document.getElementById('pressure');
const air_quality = document.getElementById("quality")

console.log(state_URL);

async function state_api(){
    const response = await fetch(state_URL);
    const data = await response.json();
    
    for (let i = 0; i < data.data.length; i++)
    {
        const option = document.createElement("option");
        option.value = data.data[i].state;
        option.text = data.data[i].state;
        state_select.appendChild(option);
    }
    // console.log(state_select.value);
}
state_api();

async function info_api(city, state){
    const response = await fetch("https://api.airvisual.com/v2/city?city="+city+"&state="+state+"&country=India&key="+API_KEY);
    const data = await response.json();
    console.log(data); 
    
    const pollution = data.data.current.pollution;
    const weather = data.data.current.weather; 
    console.log(pollution)
    aqi.innerHTML = pollution.aqius;
    pollutant.innerHTML = pollution.maincn;
    temp.innerHTML = weather.tp;
    pressure.innerHTML = weather.pr;
    humidity.innerHTML = weather.hu;
    wind_speed.innerHTML = weather.ws;

    if (pollution.aqius < 50){
        air_quality.innerHTML = "Good"
        info_div.style.background =  "linear-gradient(to right, #a8e063, #56ab2f)"; 
        // info_div.style.background = url("https://cdn.dribbble.com/users/1217824/screenshots/3509460/attachments/776740/village.png");
    }
    else if (pollution.aqius>= 50 && pollution.aqius < 100){
        air_quality.innerHTML = "Satisfactory"
        info_div.style.background = "linear-gradient(to right top, #d5cd2c, #dbd73b, #e2e149, #e8ec56, #eff663)";
        // info_div.style.backgroundImage = 'url("Images/village.png")';
        
    }
    else if (pollution.aqius >= 100 && pollution.aqius < 150){
        air_quality.innerHTML = "Moderately Polluted"
        info_div.style.background = "linear-gradient(to right top, #f88243, #fa9844, #faad4a, #f8c254, #f6d663)";    
    }
    else if (pollution.aqius >= 150 && pollution.aqius < 250){
        air_quality.innerHTML = "Poor"
        info_div.style.background = "linear-gradient(to right top, #e96c35, #ec7740, #f0824c, #f38c57, #f69663)";
    }
    else if (pollution.aqius >= 250 && pollution.aqius < 300){
        air_quality.innerHTML = "Very Poor"
        info_div.style.background = "linear-gradient(to right top, #e95435, #d5502f, #c14c2a, #ae4726, #9b4222)";
    }
    else if(pollution.aqius >= 300 && pollution.aqius < 500){
        air_quality.innerHTML = "Severe"
        info_div.style.background = "linear-gradient(to right top, #4b160a, #5e2012, #722b17, #86361d, #9b4222)";
    }   
}
info_api("Amaravati","Andhra Pradesh");


async function city_api(state){
    const response = await fetch("https://api.airvisual.com/v2/cities?state="+state+"&country=India&key="+API_KEY);
    const data = await response.json();
    for (let i = 0; i < data.data.length; i++)
    {
        const option = document.createElement("option");
        option.value = data.data[i].city;
        option.text = data.data[i].city;
        city_select.appendChild(option);
    }
    
}


city_api("Andhra Pradesh");
state_select.addEventListener("click" , function() {
    state_name = state_select.value ;
    city_select.innerHTML = "";
    // console.log(state_name);
    // console.log(city_URL);
    city_api(state_name);
})


button.addEventListener("click", function(){
        state_name = state_select.value;
        city_name = city_select.value;
        console.log(city_name, state_name);
        location_heading.innerHTML = city_name +", "+state_name;
        info_api(city_name, state_name);
        // console.log(info_api(city_name, state_name))
        
})



// "ts": "2017-02-01T03:00:00.000Z",  //timestamp
//         "aqius": 21, //AQI value based on US EPA standard
//         "aqicn": 7, //AQI value based on China MEP standard
//         "tp": 8, //temperature in Celsius
//         "tp_min": 6, //minimum temperature in Celsius
//         "pr": 976,  //atmospheric pressure in hPa
//         "hu": 100, //humidity %
//         "ws": 3, //wind speed (m/s)
//         "wd": 313, //wind direction, as an angle of 360° (N=0, E=90, S=180, W=270)
//         "ic": "10n" //weather icon code, see below for icon index


