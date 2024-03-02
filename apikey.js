const apikey = "f747c494e929fdae38e0c6c95663734b";

export function weatherapi() {
  //let url = `https://api.openweathermap.org/data/2.5/weather?q&units=metric=${searchBtnValue}&appid=f747c494e929fdae38e0c6c95663734b`;
  // console.log(url);

  fetch(`${url}&appid=${apikey}`)
    .then((res) => res.json())
    .then((data) => callback(data));
}

export const url = {
  currentWeather(lat,ln){
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric&appid`
  },
  daysFor(lat,lan){
    return`https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric&appid`
  }
  air
}
