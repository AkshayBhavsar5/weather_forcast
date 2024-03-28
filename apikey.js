const apikey = "f747c494e929fdae38e0c6c95663734b";

export const fetchData = function (URL,callback) {
  
  // let url = `https://api.openweathermap.org/data/2.5/weather?q&units=metric=${searchBtnValue}&appid=f747c494e929fdae38e0c6c95663734b`;
  // console.log(url);
  fetch(`${URL}&appid=${apikey}`)
    .then(res => res.json())
    .then(data => callback(data));
}

export const url = {
  currentWeather(lat,lon){
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
  },
  daysFor(lat,lon){
    return`https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
  },
  airPol(lat,lon){
    return`http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
  },
  geoReverse(lat,lon){
    return`http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}5&limit=5`
  },
  geoCoding(query){
    return`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
  }
}
